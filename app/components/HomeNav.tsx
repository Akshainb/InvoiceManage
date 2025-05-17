import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/logo (2).png";
import { buttonVariants } from "@/components/ui/button";
export function HomeNav() {
  return (
    <div className="flex items-center justify-between py-5  ">
      <Link href={"/"} className="flex gap-2 sm:mx-0 mx-auto">
        <Image src={Logo} alt="LOGO" className="size-10" />
        <h3 className="text-3xl font-semibold">
          Invoice<span className="text-blue-500">Manage</span>
        </h3>
      </Link>
      <div className="hidden sm:block">
        <Link href={"/login"} className={buttonVariants()}>
          Get started
        </Link>
      </div>
    </div>
  );
}
