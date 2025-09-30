"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { subscribeToNewsletter, type SubscriptionResponse } from "@/lib/actions";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

export function SubscriptionForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const result: SubscriptionResponse = await subscribeToNewsletter(values.email);
      if (result.success) {
        router.push("/thank-you");
      } else {
        if (result.errors?.email) {
          form.setError("email", { type: "manual", message: result.errors.email[0] });
        }
      }
    });
  }

  return (
    <section id="subscribe" className="py-12 md:py-20 bg-card rounded-lg shadow-xl">
      <div className="container mx-auto text-center px-4">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Get Notified on Launch</h2>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
          Sign up to receive an email notification when Yinsh is available on mobile. No spam, we promise.
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 max-w-md mx-auto flex flex-col sm:flex-row gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input placeholder="your.email@example.com" {...field} className="text-base h-12" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending} className="h-12 text-base">
              {isPending ? <Loader2 className="animate-spin" /> : 'Subscribe'}
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
}
