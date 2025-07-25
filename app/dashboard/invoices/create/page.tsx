import { CreateInvoice } from "@/app/components/CreateInvoice";
import prisma from "@/app/utils/db";
import { requireUser } from "@/app/utils/hooks";

async function getUserData(userId: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      fistName: true,
      lastName: true,
      email: true,
      address: true,
    },
  });
  return data;
}

export default async function CreateInvoiceRoute() {
  const session = await requireUser();
  const data = await getUserData(session.user?.id as string);

  return (
    <CreateInvoice
      address={data?.address as string}
      lastName={data?.lastName as string}
      firstName={data?.fistName as string}
      email={data?.email as string}
    />
  );
}
