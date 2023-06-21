'use client';

import type { Database } from '@/app/database.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from './ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';

const formSchema = z.object({
  email: z.string(),
  password: z.string().min(8).max(10)
});

const AuthForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      email: ''
    }
  });
  const supabase = createClientComponentClient<Database>();

  async function handleSignIn(values: z.infer<typeof formSchema>) {
    await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password
    });
    form.reset();
    router.push("/book/dashboard")
  }

  async function handleSignUp(values: z.infer<typeof formSchema>) {
    await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`
      }
    });
    form.reset();
    router.refresh();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSignIn)}
        className="space-y-8 max-w-md mx-auto mt-[10%]"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Log In</Button>
      </form>
    </Form>
  );
};

export default AuthForm;
