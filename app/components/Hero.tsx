import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import Link from "next/link";
import { RainbowButton } from "@/components/magicui/rainbow-button";
import Heros from "@/public/Hero.png";
import Image from "next/image";
export function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center py-12 lg:py-20">
      <div className="text-center">
        <span className="text-sm text-primary font-medium tracking-tight bg-primary/10 px-4 py-2 rounded-full">
          Introducing InvoiceManage 1.0
        </span>
        <h1 className="mt-8 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight">
          Invoicing made{" "}
          <AnimatedGradientText
            speed={2}
            colorFrom="#4ade80"
            colorTo="#06b6d4"
            className=" font-semibold tracking-tight block -mt-2"
          >
            super easy!
          </AnimatedGradientText>
        </h1>
        <p className="max-w-xl mx-auto mt-4 lg:text-lg text-muted-foreground">
          Creating Invoices can be a pain! We at InvoiceManage make it super
          easy for you to get paid in time!{" "}
        </p>
        <div className="mt-7 mb-12">
          <Link href={"/login"}>
            <RainbowButton>Get Unlimited Access</RainbowButton>
          </Link>
        </div>
        <div className="relative items-center w-full py-12 mx-auto mt-12">
          <Image
            src={Heros}
            alt="Hero Image"
            className="border rounded-lg lg:rounded-2xl shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}
