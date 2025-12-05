
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';

const settingsFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  phone: z.string().regex(/^\d{3}-\d{3}-\d{4}$/, { message: 'Phone number must be in XXX-XXX-XXXX format.' }),
  emailNotifications: z.boolean(),
  pushNotifications: z.boolean(),
  theme: z.enum(['light', 'dark', 'system']),
});

type SettingsFormValues = z.infer<typeof settingsFormSchema>;

const defaultValues: Partial<SettingsFormValues> = {
  name: 'Admin User',
  email: 'admin@rojesale.com',
  phone: '123-456-7890',
  emailNotifications: true,
  pushNotifications: false,
  theme: 'light',
};

export function SettingsForm() {
  const { toast } = useToast();
  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues,
  });

  function onSubmit(data: SettingsFormValues) {
    toast({
      title: 'Settings Saved!',
      description: 'Your changes have been successfully saved.',
      variant: 'success',
    });
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card className="shadow-md">
            <CardContent className="p-0">
                <Accordion type="multiple" defaultValue={['profile', 'notifications']} className="w-full">
                    <AccordionItem value="profile">
                        <AccordionTrigger className="px-6 py-4 text-lg font-semibold text-primary">Profile</AccordionTrigger>
                        <AccordionContent className="px-6 space-y-4">
                            <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel className="text-primary">Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Your name" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                            <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel className="text-primary">Email</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="Your email" {...field} />
                               
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                             <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel className="text-primary">Phone Number</FormLabel>
                                <FormControl>
                                    <Input placeholder="XXX-XXX-XXXX" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="notifications">
                        <AccordionTrigger className="px-6 py-4 text-lg font-semibold text-primary">Notifications</AccordionTrigger>
                        <AccordionContent className="px-6 space-y-4">
                        <FormField
                            control={form.control}
                            name="emailNotifications"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                        <FormLabel className="text-primary">Email Notifications</FormLabel>
                                        <FormDescription className="text-primary">Receive notifications via email.</FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                                    </FormControl>
                                </FormItem>
                            )}
                            />
                            <FormField
                            control={form.control}
                            name="pushNotifications"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                        <FormLabel className="text-primary">Push Notifications</FormLabel>
                                        <FormDescription className="text-primary">Receive notifications on your device.</FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                                    </FormControl>
                                </FormItem>
                            )}
                            />
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
        <div className="flex justify-end">
            <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </Form>
  );
}
