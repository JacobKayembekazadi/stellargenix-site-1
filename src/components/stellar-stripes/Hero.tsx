'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { ShieldCheck, Timer, BadgeCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  lotSize: z.string().min(1, { message: 'Please enter your lot size.' }),
});

export function Hero() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', email: '', lotSize: '' },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: 'Audit Request Sent!',
      description: "We've received your request and will be in touch shortly.",
    });
    form.reset();
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-primary/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col justify-center space-y-6">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline text-primary">
              Houston & Dallas Lots Re-Striped in 72 Hours—Guaranteed 20-30% Lower 3-Year Cost.
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl">
              Tired of fading lines & surprise re-paint bills? Our TBL® traffic paint lasts 2–3× longer, slashing spend while boosting curb appeal and ADA compliance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-2 text-sm">
                <ShieldCheck className="h-5 w-5 text-green-600" />
                <span>BBB A+ Rated</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <ShieldCheck className="h-5 w-5 text-green-600" />
                <span>OSHA Compliant</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <ShieldCheck className="h-5 w-5 text-green-600" />
                <span>ADA Certified Experts</span>
              </div>
            </div>
          </div>

          <div id="lead-form" className="flex items-center justify-center">
            <Card className="w-full max-w-md shadow-lg">
              <CardContent className="p-6">
                <div className="space-y-2 text-center mb-6">
                  <h3 className="text-2xl font-bold font-headline">Get Your 10-Min Lot Health Audit</h3>
                  <p className="text-muted-foreground">Receive a free cost-saver plan.</p>
                </div>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
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
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder="you@company.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lotSize"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Lot Size (e.g., 2 acres, 150 spaces)</FormLabel>
                          <FormControl>
                            <Input placeholder="Approx. size or # of spaces" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" size="lg">
                      Get My Cost-Saver Plan
                    </Button>
                  </form>
                </Form>
                <div className="mt-4 flex items-center justify-center gap-2 rounded-md bg-destructive/10 p-2 text-sm font-medium text-destructive">
                  <Timer className="h-5 w-5" />
                  <span>Only 5 project slots left for this month!</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
