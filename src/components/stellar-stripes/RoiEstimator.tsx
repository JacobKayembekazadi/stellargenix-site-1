'use client';

import { useState, useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, BarChart2, Loader2 } from 'lucide-react';
import { submitRoiRequest } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import type { ParkingLotRoiEstimatorOutput } from '@/ai/flows/parking-lot-roi-estimator';

const formSchema = z.object({
  lotSizeAcres: z.coerce.number().min(0.1, { message: 'Lot size must be at least 0.1 acres.' }),
  currentPaintCondition: z.string().min(1, { message: 'Please select paint condition.' }),
  numberOfSpaces: z.coerce.number().min(1, { message: 'Must have at least 1 space.' }),
  repaintFrequencyYears: z.coerce.number().min(1, { message: 'Repaint frequency must be at least 1 year.' }),
});

export function RoiEstimator() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<ParkingLotRoiEstimatorOutput | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lotSizeAcres: '' as any,
      numberOfSpaces: '' as any,
      currentPaintCondition: "fair",
      repaintFrequencyYears: 2,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setResult(null);
    startTransition(async () => {
      const response = await submitRoiRequest(values);
      if (response.success && response.data) {
        setResult(response.data);
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: response.error || 'Failed to calculate ROI.',
        });
      }
    });
  }

  return (
    <section id="roi-estimator" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline text-primary">
            Parking Lot ROI Estimator
          </h2>
          <p className="mt-4 text-muted-foreground md:text-xl/relaxed">
            See how much you could save over 3 years by switching to our long-life TBL® paint.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-5xl grid gap-8 lg:grid-cols-2">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Calculate Your Savings</CardTitle>
              <CardDescription>Enter your parking lot details below.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="lotSizeAcres"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Lot Size (Acres)</FormLabel>
                          <FormControl>
                            <Input type="number" step="0.1" placeholder="e.g., 2.5" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="numberOfSpaces"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Number of Spaces</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="e.g., 200" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="currentPaintCondition"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Paint Condition</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select condition" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="good">Good</SelectItem>
                              <SelectItem value="fair">Fair</SelectItem>
                              <SelectItem value="poor">Poor</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="repaintFrequencyYears"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Repaint Frequency (Yrs)</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="e.g., 2" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button type="submit" disabled={isPending} className="w-full bg-accent text-accent-foreground hover:bg-accent/90" size="lg">
                    {isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Calculating...
                      </>
                    ) : (
                      "Estimate My ROI"
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
          
          <div className="flex items-center justify-center">
            {isPending ? (
                <Card className="w-full h-full flex flex-col items-center justify-center bg-muted/50">
                    <Loader2 className="h-12 w-12 animate-spin text-primary"/>
                    <p className="mt-4 text-muted-foreground">Generating your custom analysis...</p>
                </Card>
            ) : result ? (
              <Card className="w-full bg-primary text-primary-foreground shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-headline flex items-center gap-3">
                    <DollarSign className="h-8 w-8 text-accent" />
                    Your Estimated 3-Year Savings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-5xl font-bold text-accent mb-4">
                    ${result.estimatedSavings.toLocaleString()}
                  </p>
                  <h4 className="font-bold text-lg font-headline mb-2 flex items-center gap-2">
                    <BarChart2 className="h-5 w-5" />
                    ROI Explanation
                  </h4>
                  <p className="text-primary-foreground/80 text-sm whitespace-pre-wrap">{result.roiExplanation}</p>
                </CardContent>
              </Card>
            ) : (
                <Card className="w-full h-full flex flex-col items-center justify-center bg-muted/50 text-center p-8">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                        <DollarSign className="h-8 w-8 text-primary"/>
                    </div>
                    <h3 className="font-bold font-headline text-lg">Your ROI report will appear here.</h3>
                    <p className="text-muted-foreground mt-1">Fill out the form to get started.</p>
                </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
