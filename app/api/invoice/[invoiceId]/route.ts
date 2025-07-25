import prisma from "@/app/utils/db";
import { NextRequest, NextResponse } from "next/server";
import { jsPDF } from "jspdf";
import { formatCurrency } from "@/app/utils/formatCurrency";
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ invoiceId: string }> }
) {
  const { invoiceId } = await params;

  const data = await prisma.invoice.findUnique({
    where: {
      id: invoiceId,
    },
    select: {
      invoiceName: true,
      invoiceNumber: true,
      currency: true,
      fromName: true,
      fromEmail: true,
      fromAddress: true,
      clientAddress: true,
      clientEmail: true,
      clientName: true,
      date: true,
      dueDate: true,
      invoiceItemDescription: true,
      invoiceItemQuantity: true,
      invoiceItemRate: true,
      total: true,
      Note: true,
    },
  });

  if (!data) {
    return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
  }

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  pdf.setFont("helvetica");

  pdf.setFontSize(24);
  pdf.text(data.invoiceName, 20, 20);

  pdf.setFontSize(12);
  pdf.text("From", 20, 40);
  pdf.setFontSize(10);
  pdf.text([data.fromName, data.fromEmail, data.fromAddress], 20, 45);

  pdf.setFontSize(12);
  pdf.text("Bill to", 20, 70);
  pdf.setFontSize(10);
  pdf.text([data.clientName, data.clientEmail, data.clientAddress], 20, 75);

  pdf.setFontSize(10);
  pdf.text(`Invoice Number:#${data.invoiceNumber}`, 140, 40);
  pdf.text(
    `Date:${new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(
      data.date
    )}`,
    140,
    45
  );
  pdf.text(`Due Date:${data.dueDate}`, 140, 50);

  pdf.setFontSize(10);
  pdf.setFont("helvetica", "bold");
  pdf.text("Description", 20, 100);
  pdf.text("Quantity", 100, 100);
  pdf.text("Rate", 130, 100);
  pdf.text("Total", 160, 100);

  pdf.line(20, 105, 190, 105);

  pdf.setFont("helvetica", "normal");
  pdf.text(data.invoiceItemDescription, 20, 110);
  pdf.text(data.invoiceItemQuantity.toString(), 100, 110);
  pdf.text(
    formatCurrency({
      amount: data.invoiceItemRate,
      currency: data.currency as any,
    }),
    130,
    110
  );
  pdf.text(
    formatCurrency({ amount: data.total, currency: data.currency as any }),
    160,
    110
  );

  pdf.line(20, 115, 190, 115);
  pdf.setFont("helvetica", "bold");
  pdf.text(`Total (${data.currency})`, 130, 130);
  pdf.text(
    formatCurrency({ amount: data.total, currency: data.currency as any }),
    160,
    130
  );

  if (data.Note) {
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);
    pdf.text("Note:", 20, 150);
    pdf.text(data.Note, 25, 155);
  }

  const pdfBuffer = Buffer.from(pdf.output("arraybuffer"));

  return new NextResponse(pdfBuffer, {
    headers: {
      "Conten-Type": "application/pdf",
      "Content-Disposition": "inline",
    },
  });
}
