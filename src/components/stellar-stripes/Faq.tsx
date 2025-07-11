'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const faqs = [
  {
    question: "Why TBL® paint vs. standard?",
    answer: "Our TBL® traffic paint lasts 2-3 times longer than standard paint. This significantly reduces how often you need to repaint, saving you money on materials and labor over the long term and minimizing disruption to your business."
  },
  {
    question: "How soon can crews mobilize after a purchase order?",
    answer: "Typically, our crews can be on-site and ready to work within 72 hours of receiving a purchase order. We pride ourselves on our rapid response and efficient scheduling to get your project completed quickly."
  },
  {
    question: "What happens if weather causes delays?",
    answer: "Safety and quality are our top priorities. If weather conditions are not suitable for pavement work, we will proactively communicate with you to reschedule at the earliest possible opportunity, ensuring minimal disruption to your operations."
  },
  {
    question: "What are your payment and financing options?",
    answer: "We offer a variety of convenient payment options to suit your needs. For qualified customers, we also provide flexible financing plans to help manage the investment in your property's safety and appearance."
  }
];

export function Faq() {
  return (
    <section id="faq" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline text-primary">
                Frequently Asked Questions
            </h2>
            <p className="mt-4 text-muted-foreground md:text-xl/relaxed">
                Got questions? We've got answers. Here are some of the most common inquiries we receive.
            </p>
        </div>

        <div className="mx-auto max-w-3xl mt-12">
            <Card>
                <CardContent className="p-6">
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, index) => (
                            <AccordionItem value={`item-${index}`} key={index}>
                                <AccordionTrigger className="text-lg font-medium text-left hover:no-underline">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-base text-muted-foreground">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </CardContent>
            </Card>
        </div>
      </div>
    </section>
  );
}
