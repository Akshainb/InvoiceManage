import { redirect } from "next/navigation";
import { auth, signOut } from "../utils/auth";
import { requireUser } from "../utils/hooks";
import DashboardBlocks from "../components/DashboardBlocks";
import InvoiceGraph from "../components/InvoiceGraph";
import { RecetInvoices } from "../components/RecentInvoices";
import prisma from "../utils/db";
import { EmptyState } from "../components/EmptyState";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

async function getData(userId: string) {
  const data = await prisma.invoice.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
    },
  });
  return data;
}

export default async function DashboardRoute() {
  const session = await requireUser();
  const data = await getData(session.user?.id as string);
  return (
    <>
      {data.length < 1 ? (
        <EmptyState
          title="No invoices found"
          description="Create an invoice to see it right here"
          buttontext="Create Invoice"
          href="/dashboard/invoices/create"
        />
      ) : (
        <div>
          <DashboardBlocks></DashboardBlocks>
          <div className="grid gap-4 lg:grid-cols-3 md:gap-8 mt-5">
            <InvoiceGraph />
            <RecetInvoices></RecetInvoices>
          </div>
        </div>
      )}
    </>
  );
}
