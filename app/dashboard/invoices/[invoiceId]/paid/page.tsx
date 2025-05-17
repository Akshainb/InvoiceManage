async function Authorize(invoiceId: string, userId: string) {
  const data = await prisma.invoice.findUnique({
    where: {
      id: invoiceId,
      userId: userId,
    },
  });

  if (!data) {
    redirect("/dashboard");
  }
  return data;
}

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import PaidGif from "@/public/paid-gif.gif";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { SubmitButton } from "@/app/components/submitButton";
import prisma from "@/app/utils/db";
import { redirect } from "next/navigation";
import { requireUser } from "@/app/utils/hooks";
import { InvoicePaid } from "@/app/actions";
export default async function InvoicePaidRoute({
  params,
}: {
  params: Promise<{ invoiceId: string }>;
}) {
  const session = await requireUser();
  const { invoiceId } = await params;
  const data = await Authorize(invoiceId, session.user?.id || "");
  return (
    <div className="flex justify-center flex-1">
      <Card className="min-w-sm max-w-[500px]">
        <CardHeader>
          <CardTitle>Mark as Paid</CardTitle>
          <CardDescription>
            Are you sure you want to mark this invoice as paid?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Image src={PaidGif} alt=""></Image>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link
            href={"/dashboard/invoices"}
            className={buttonVariants({ variant: "secondary" })}
          >
            Cancel
          </Link>
          <form
            action={async () => {
              "use server";
              await InvoicePaid(invoiceId);
            }}
          >
            <SubmitButton text="Mark as Paid"></SubmitButton>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
