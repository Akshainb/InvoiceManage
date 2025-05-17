import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, CreditCard, IndianRupee, Users } from "lucide-react";
import prisma from "../utils/db";
import { requireUser } from "../utils/hooks";

async function getData(userId: string) {
  const [total, pending] = await Promise.all([
    prisma.invoice.findMany({
      where: {
        userId,
      },
      select: {
        total: true,
      },
    }),
    prisma.invoice.findMany({
      where: {
        userId,
        status: "PENDING",
      },
      select: {
        id: true,
      },
    }),
    // prisma.invoice.findMany({
    //   where: {
    //     userId,
    //     status: "PAID",
    //   },
    //   select: {
    //     id: true,
    //   },
    // }),
  ]);
  return {
    total,
    pending,
  };
}

const DashboardBlocks = async () => {
  const session = await requireUser();
  const { total, pending } = await getData(session.user?.id as string);
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 md:gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between space-y-0">
            Total Revenue
            <IndianRupee className="size-4 text-muted-foreground"></IndianRupee>
          </CardTitle>
        </CardHeader>
        <CardContent className="">
          <h2 className="text-2xl font-bold">
            {total.reduce((acc, invoice) => acc + invoice.total, 0)}
          </h2>
          <p className="text-muted-foreground text-xs">
            Based on the total volume
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between space-y-0">
            Total Invoices Issued
            <Users className="size-4 text-muted-foreground"></Users>
          </CardTitle>
        </CardHeader>
        <CardContent className="">
          <h2 className="text-2xl font-bold">{total.length}</h2>
          <p className="text-muted-foreground text-xs">
            Total Invoices issued!
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between space-y-0">
            Paid Invoices
            <CreditCard className="size-4 text-muted-foreground"></CreditCard>
          </CardTitle>
        </CardHeader>
        <CardContent className="">
          <h2 className="text-2xl font-bold">
            {total.length - pending.length}
          </h2>
          <p className="text-muted-foreground text-xs">
            Total Invoices which have been paid
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between space-y-0">
            Pending invoices
            <Activity className="size-4 text-muted-foreground"></Activity>
          </CardTitle>
        </CardHeader>
        <CardContent className="">
          <h2 className="text-2xl font-bold">{pending.length}</h2>
          <p className="text-muted-foreground text-xs">
            Invoices which are currently pending
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardBlocks;
