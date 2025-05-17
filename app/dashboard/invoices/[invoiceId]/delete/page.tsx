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

import prisma from "@/app/utils/db";
import { requireUser } from "@/app/utils/hooks";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { redirect } from "next/navigation";
import WarningGif from "@/public/warning-gif.gif";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { SubmitButton } from "@/app/components/submitButton";
import { DeleteInoive } from "@/app/actions";
export default async function DeleteInoiveRoute({
  params,
}: {
  params: Promise<{ invoiceId: string }>;
}) {
  const session = await requireUser();
  const { invoiceId } = await params;
  const data = await Authorize(invoiceId, session.user?.id || "");
  return (
    <div className="flex flex-1 justify-center items-center ">
      <Card className="min-w-sm max-w-[500px]">
        <CardHeader>
          <CardTitle>Delete Inovoice</CardTitle>
          <CardDescription>
            Are you sure that you want to delete this invoice
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Image src={WarningGif} alt="Warining" className="rounded-lg"></Image>
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
              await DeleteInoive(data.id);
            }}
          >
            <SubmitButton
              text="Delete Invoice"
              variant={"destructive"}
            ></SubmitButton>
          </form>
          {/* <Button
            onClick={async () => {
              "use server";
              await DeleteInoive(data.id);
            }}
            variant={"destructive"}
            className="cursor-pointer"
          >
            Delete Invoice
          </Button> */}
        </CardFooter>
      </Card>
    </div>
  );
}
