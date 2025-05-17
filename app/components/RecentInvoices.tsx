import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import prisma from "../utils/db";
import { requireUser } from "../utils/hooks";
import { formatCurrency } from "../utils/formatCurrency";

async function getData(userId: string) {
  const data = await prisma.invoice.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      clientEmail: true,
      clientName: true,
      total: true,
      currency: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 7,
  });
  return data;
}

export async function RecetInvoices() {
  const session = await requireUser();
  const data = await getData(session.user?.id as string);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Invoices</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-8">
          {data.map((invoice) => (
            <div className="flex gap-4 items-center" key={invoice.id}>
              <Avatar className="hiddem sm:flex size-9">
                <AvatarFallback>
                  {invoice.clientName.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium leading-none">
                  {invoice.clientName}
                </p>
                <p className="text-sm text-muted-foreground">
                  {invoice.clientEmail}
                </p>
              </div>
              <div className="ml-auto">
                {formatCurrency({
                  amount: invoice.total,
                  currency: invoice.currency as any,
                })}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
