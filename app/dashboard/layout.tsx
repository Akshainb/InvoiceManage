import Image from "next/image";
import { requireUser } from "../utils/hooks";
import Logo from "@/public/logo (2).png";
import Link from "next/link";
import DashboardLink from "../components/DashboardLinks";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, User2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { signOut } from "../utils/auth";
import prisma from "../utils/db";
import { redirect } from "next/navigation";

async function getUser(id: string) {
  const data = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      fistName: true,
      lastName: true,
      address: true,
    },
  });
  if (!data?.fistName || !data.lastName || !data.address) {
    redirect("/onboarding");
  }
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireUser();
  const data = await getUser(session.user?.id as string);
  return (
    <div>
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-muted/40 md:block">
          <div className="flex flex-col max-h-screen h-full gap-2">
            <div className="h-14 flex items-center border-b px-4 lg:h-[60px] lg:px-6">
              <Link href={"/"} className="flex items-center gap-2">
                <Image src={Logo} alt="Logo" className="size-8" />
                <p className="text-xl font-semibold">
                  Invoice{""}
                  <span className="text-blue-500">Manage</span>
                </p>
              </Link>
            </div>
            <div className="flex-1">
              <div className="grid items-start px-2 text-sm font-medium lg:px-4">
                <DashboardLink />
              </div>
            </div>
          </div>
        </div>
        <div>
          <header className="bg-muted/50 px-4 lg:h-[60px] lg:px-6 flex h-14 items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant={"outline"} size="icon" className="md:hidden">
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <nav className="flex flex-col gap-2 mt-10">
                  <DashboardLink />
                </nav>
              </SheetContent>
            </Sheet>

            <div className="w-full flex justify-end">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    className="rounded-full"
                    variant={"outline"}
                    size={"icon"}
                  >
                    <User2 />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={"/dashboard"}>Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={"/dashboard/invoices"}>Invoices</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <form
                      action={async () => {
                        "use server";
                        await signOut();
                      }}
                      className="w-full"
                    >
                      <button className="w-full text-left">Log out</button>
                    </form>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
