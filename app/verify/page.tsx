import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, ArrowLeft, Mail } from "lucide-react";
import Link from "next/link";

export default function Verify() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
      </div>
      <Card className="w-[380px] px-5">
        <CardHeader className="text-center">
          <div className="flex size-20 items-center justify-center mx-auto rounded-full bg-blue-200">
            <Mail className="size-12 text-blue-500" />
          </div>
          <CardTitle className="text-2xl font-bold">Check your Email</CardTitle>
          <CardDescription>
            We have send a verification link to your email address
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-yellow-50 border-yellow-300 flex gap-2 mt-2 rounded-md p-2">
            <AlertCircle className="text-yellow-400 size-5" />
            <p className="text-sm font-medium text-yellow-700">
              Be sure to check your spam folder!
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Link
            href={"/"}
            className={buttonVariants({
              className: "w-full",
              variant: "outline",
            })}
          >
            <ArrowLeft className="size-4 mr-2" />
            Back to Homepage
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
