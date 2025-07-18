import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth, signIn } from "../utils/auth";
import { SubmitButton } from "../components/submitButton";
import { redirect } from "next/navigation";

export default async function Login() {
  const session = await auth();
  if (session?.user) {
    redirect("/dashboard");
  }
  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
      </div>
      <div className="flex h-screen w-full justify-center items-center px-4">
        <Card className="min-w-sm">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Enter your email below to login in to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              className="flex flex-col gap-y-4"
              action={async (formData) => {
                "use server";
                await signIn("nodemailer", formData);
              }}
            >
              <div className="flex flex-col gap-y-2">
                <Label>Email</Label>
                <Input
                  name="email"
                  type="email"
                  required
                  placeholder="hello@hello.com"
                />
              </div>
              <SubmitButton></SubmitButton>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
