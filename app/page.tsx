import Image from "next/image";
import DashboardLink from "./components/DashboardLinks";
import { HomeNav } from "./components/HomeNav";
import { Hero } from "./components/Hero";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>
      <HomeNav />
      <Hero />
    </div>
  );
}
