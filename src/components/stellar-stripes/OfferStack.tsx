'use client';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const offerItems = [
    { text: "Precision Striping, Crack-Fill & Seal-Coat" },
    { text: "FREE Parking-Lot ROI Blueprint" },
    { text: "24-Month Safety & Compliance Monitoring" },
    { text: "Priority Storm-Damage Hotline Access" },
];

export function OfferStack() {
    const scrollToForm = () => {
        document.getElementById('roi-estimator')?.scrollIntoView({ behavior: 'smooth' });
    };

  return (
    <section id="offer" className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-6">
            <div className="inline-block rounded-lg bg-primary-foreground/10 px-3 py-1 text-sm font-medium">The Grand Slam Offer</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
              Everything You Need for a Perfect Lot.
            </h2>
            <p className="max-w-[600px] text-primary-foreground/80 md:text-xl/relaxed">
              We've bundled our best services and guarantees into one unbeatable package. This isn't just a repaint; it's a long-term solution for your property's value and safety.
            </p>
            <ul className="space-y-3">
              {offerItems.map((item) => (
                <li key={item.text} className="flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 text-accent" />
                  <span className="text-lg">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center justify-center">
            <Card className="w-full max-w-md bg-background text-foreground shadow-2xl">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-headline">
                        <ShieldCheck className="h-8 w-8 text-green-600" />
                        Our "Stay-Sharp" 1,095-Day Warranty
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p>If your line reflectivity drops by more than 20% within 3 years, we'll repaint the affected areas at no charge. Period.</p>
                    <p className="font-bold">PLUS, we'll donate $500 to a charity of your choice. That's how confident we are.</p>
                    <div className="rounded-lg border bg-accent/10 p-4">
                        <p className="font-bold text-primary">Limited Time: <span className="text-destructive">Claim by the end of this month for a $0 mobilization fee.</span></p>
                        <p className="text-sm text-muted-foreground mt-1">Only 15 TBL® kits in our current allocation.</p>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button onClick={scrollToForm} size="lg" className="w-full bg-primary hover:bg-primary/90">Book My Slot & Claim Offer</Button>
                </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
