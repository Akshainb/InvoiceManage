"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
export function SubmitButton({
  text,
  variant,
}: {
  text?: string;
  variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
}) {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button className="w-full" disabled>
          <Loader2 className="size-4 mr-2 animate-spin" /> Please wait...
        </Button>
      ) : (
        <Button type="submit" className="w-full" variant={variant}>
          {text ? text : "Submit"}
        </Button>
      )}
    </>
  );
}
