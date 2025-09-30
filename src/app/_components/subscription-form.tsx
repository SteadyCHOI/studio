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
    message: "유효한 이메일 주소를 입력해주세요.",
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
        <h2 className="text-3xl font-bold tracking-tight text-foreground">출시 알림 받기</h2>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
          Yinsh가 모바일에서 출시될 때 이메일 알림을 받으려면 가입하세요. 스팸은 보내지 않을 것을 약속드립니다.
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
              {isPending ? <Loader2 className="animate-spin" /> : '구독하기'}
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
}
