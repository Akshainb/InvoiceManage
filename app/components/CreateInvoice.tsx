"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon } from "lucide-react";
import { useActionState, useMemo, useState } from "react";
import { SubmitButton } from "./submitButton";
import { createInvoice } from "../actions";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { invoiceSchema } from "../utils/zodSchema";
import { formatCurrency } from "../utils/formatCurrency";

interface Props {
  firstName: string;
  lastName: string;
  address: string;
  email: string;
}

export function CreateInvoice({ firstName, lastName, address, email }: Props) {
  const [lastResult, action] = useActionState(createInvoice, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: invoiceSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  const [date, setDate] = useState<Date | undefined>(new Date());
  const [rate, setRate] = useState("");
  const [quantity, setQuantity] = useState("");

  const calculateTotal = useMemo(() => {
    return (Number(quantity) || 0) * (Number(rate) || 0);
  }, [quantity, rate]);

  const [currency, setCurrency] = useState("INR");

  const formattedTotal = useMemo(() => {
    return formatCurrency({
      amount: calculateTotal,
      currency: currency as any,
    });
  }, [calculateTotal, currency]);
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardContent className="p-4 ">
        <form action={action} id={form.id} onSubmit={form.onSubmit} noValidate>
          <input
            type="hidden"
            name={fields.date.name}
            value={date?.toISOString()}
          />
          <input
            type="hidden"
            name={fields.total.name}
            value={calculateTotal}
          />
          <div className="flex flex-col gap-1 mb-6">
            <div className="flex items-center gap-4">
              <Badge variant={"secondary"}>Draft</Badge>
              <Input
                className="w-fit"
                name={fields.invoiceName.name}
                key={fields.invoiceName.key}
                defaultValue={fields.invoiceName.initialValue}
              />
            </div>
            <p className="text-red-500 font-light text-sm">
              {fields.invoiceName.errors}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-2">
              <Label>Invoice No</Label>
              <div className="flex">
                <span className="px-3 border border-r-0 rounded-l-md bg-muted flex items-center">
                  #
                </span>
                <Input
                  placeholder="5"
                  className="rounded-l-none"
                  name={fields.invoiceNumber.name}
                  key={fields.invoiceNumber.key}
                  defaultValue={fields.invoiceNumber.initialValue}
                />
              </div>
              <p className="text-red-500 font-light text-sm">
                {fields.invoiceName.errors}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Currency</Label>
              <Select
                defaultValue="INR"
                name={fields.currency.name}
                key={fields.currency.key}
                onValueChange={(value) => setCurrency(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">
                    United States Dollar --USD
                  </SelectItem>
                  <SelectItem value="INR">Indian Rupees --INR</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-red-500 font-light text-sm">
                {fields.currency.errors}
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mt-5">
            <div className="flex flex-col space-y-2">
              <Label>From</Label>
              <div className="flex flex-col space-y-2">
                <Input
                  placeholder="Your Name"
                  name={fields.fromName.name}
                  key={fields.fromName.key}
                  defaultValue={firstName + " " + lastName}
                />
                <p className="text-red-500 font-light text-sm">
                  {fields.fromName.errors}
                </p>
                <Input
                  placeholder="Your Email"
                  name={fields.fromEmail.name}
                  key={fields.fromEmail.key}
                  defaultValue={email}
                />
                <p className="text-red-500 font-light text-sm">
                  {fields.fromEmail.errors}
                </p>
                <Input
                  placeholder="Your Address"
                  name={fields.fromAddress.name}
                  key={fields.fromAddress.key}
                  defaultValue={address}
                />
                <p className="text-red-500 font-light text-sm">
                  {fields.fromAddress.errors}
                </p>
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <Label>To</Label>
              <div className="flex flex-col space-y-2">
                <Input
                  placeholder="To Name"
                  name={fields.clientName.name}
                  key={fields.clientName.key}
                  defaultValue={fields.clientName.initialValue}
                />
                <p className="text-red-500 font-light text-sm">
                  {fields.clientName.errors}
                </p>
                <Input
                  placeholder="To Email"
                  name={fields.clientEmail.name}
                  key={fields.clientEmail.key}
                  defaultValue={fields.clientEmail.initialValue}
                />
                <p className="text-red-500 font-light text-sm">
                  {fields.clientEmail.errors}
                </p>
                <Input
                  placeholder="To Address"
                  name={fields.clientAddress.name}
                  key={fields.clientAddress.key}
                  defaultValue={fields.clientAddress.initialValue}
                />
                <p className="text-red-500 font-light text-sm">
                  {fields.clientAddress.errors}
                </p>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mt-5">
            <div className="space-y-2">
              <Label>Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant={"outline"}>
                    <CalendarIcon />
                    {date ? (
                      new Intl.DateTimeFormat("en-US", {
                        dateStyle: "long",
                      }).format(date)
                    ) : (
                      <span>Pick a Date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    fromDate={new Date()}
                  ></Calendar>
                </PopoverContent>
              </Popover>
              <p className="text-red-500 font-light text-sm">
                {fields.date.errors}
              </p>
            </div>
            <div className="space-y-2">
              <Label>Invoice Due</Label>
              <Select
                name={fields.dueDate.name}
                key={fields.dueDate.key}
                defaultValue={fields.dueDate.initialValue}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select due date"></SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Due on Receipt</SelectItem>
                  <SelectItem value="15">Net 15</SelectItem>
                  <SelectItem value="30">Net 30</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-red-500 text-sm font-light">
                {fields.dueDate.errors}
              </p>
            </div>
          </div>
          <div className="mt-5">
            <div className="grid grid-cols-12 gap-4 mb-2 font-medium">
              <p className="col-span-6">Description</p>
              <p className="col-span-2">Quantity</p>
              <p className="col-span-2">Rate</p>
              <p className="col-span-2">Amount</p>
            </div>
            <div className="grid grid-cols-12 gap-4 mb-4">
              <div className="col-span-6">
                <Textarea
                  placeholder="Item name & description"
                  name={fields.invoiceItemDescription.name}
                  key={fields.invoiceItemDescription.key}
                  defaultValue={fields.invoiceItemDescription.initialValue}
                />
                <p className="text-red-500 text-sm font-light">
                  {fields.invoiceItemDescription.errors}
                </p>
              </div>
              <div className="col-span-2">
                <Input
                  type="number"
                  placeholder="0"
                  name={fields.invoiceItemQuantity.name}
                  key={fields.invoiceItemQuantity.key}
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
                <p className="text-red-500 text-sm font-light">
                  {fields.invoiceItemDescription.errors}
                </p>
              </div>
              <div className="col-span-2">
                <Input
                  type="number"
                  placeholder="0"
                  name={fields.invoiceItemRate.name}
                  key={fields.invoiceItemRate.key}
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                />
                <p className="text-red-500 text-sm font-light">
                  {fields.invoiceItemRate.errors}
                </p>
              </div>
              <div className="col-span-2">
                <Input disabled value={formattedTotal} />
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="w-1/3">
              <div className="flex justify-between p-2">
                <span>Subtotal</span>
                <span>{formattedTotal}</span>
              </div>
              <div className="flex justify-between p-2 border-t-2">
                <span>Total({currency})</span>
                <span className="font-medium underline underline-offset-2">
                  {formattedTotal}
                </span>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Notes</Label>
            <Textarea
              placeholder="Add your Notes right here.."
              name={fields.note.name}
              key={fields.note.key}
              defaultValue={fields.note.initialValue}
            />
          </div>
          <div className="flex justify-end mt-5">
            <div>
              <SubmitButton text="Send Invoice to Client"></SubmitButton>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
