"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CheckCircle,
  DownloadCloudIcon,
  Mail,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export const InvoicesActions = ({
  id,
  status,
}: {
  id: string;
  status: string;
}) => {
  const handleSendReminder = () => {
    toast.promise(
      fetch(`/api/email/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }),
      {
        loading: "Sending reminder email...",
        success: "Reminder email send successfully",
        error: "Failed to send reminder email",
      }
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"secondary"} size={"icon"}>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <Link href={`/dashboard/invoices/${id}`} className="flex gap-4">
            <Pencil className="size-4 mr-2" /> Edit
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            href={`/api/invoice/${id}`}
            target="_blank"
            className="flex gap-4"
          >
            <DownloadCloudIcon className="size-4 mr-2" /> Download Invoice
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleSendReminder}>
          <Mail className="size-4 mr-2" /> Remainder Email
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            href={`/dashboard/invoices/${id}/delete`}
            className="flex gap-4"
          >
            <Trash2 className="size-4 mr-2" /> Delete
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          {status !== "PAID" && (
            <Link
              href={`/dashboard/invoices/${id}/paid`}
              className="flex gap-4"
            >
              <CheckCircle className="size-4 mr-2" /> Mark as Paid
            </Link>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
