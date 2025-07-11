'use client';

import { Button } from "@/components/ui/button";

const steps = [
  {
    number: "01",
    title: "Virtual Lot Health Audit",
    description: "Upload photos or schedule a drone scan. We'll deliver a comprehensive report within 24 hours.",
  },
  {
    number: "02",
    title: "ROI Proposal",
    description: "Receive a transparent, itemized proposal showing your life-cycle cost savings compared to standard paint.",
  },
  {
    number: "03",
    title: "72-Hour Scheduling",
    description: "We work around your schedule. Our night and weekend crews ensure your tenants are never inconvenienced.",
  },
  {
    number: "04",
    title: "3-Year Lot Care",
    description: "Enjoy peace of mind with our quarterly micro-inspections and rapid warranty dispatch if any issues arise.",
  },
];

export function Process() {
    const scrollToForm = () => {
        document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
    };
  return (
    <section id="process" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline text-primary">
                From Quote to Stripe in 4 Simple Steps
            </h2>
            <p className="mt-4 text-muted-foreground md:text-xl/relaxed">
                Our streamlined process is designed for your convenience, ensuring a hassle-free experience from start to finish.
            </p>
        </div>

        <div className="relative mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-1 w-2/3 bg-border/50 hidden lg:block" />
            {steps.map((step) => (
                <div key={step.number} className="relative flex flex-col items-center text-center p-6 bg-background rounded-lg shadow-md border">
                    <div className="absolute -top-6 flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground font-bold font-headline text-xl border-4 border-secondary">
                        {step.number}
                    </div>
                    <h3 className="mt-8 text-xl font-bold font-headline">{step.title}</h3>
                    <p className="mt-2 text-muted-foreground flex-grow">{step.description}</p>
                    <Button onClick={scrollToForm} variant="link" className="mt-4 text-primary">Book My Slot</Button>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
}
