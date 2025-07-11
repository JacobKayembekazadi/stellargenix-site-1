'use client';

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Play } from "lucide-react";

const caseStudies = [
  {
    logo: "https://placehold.co/150x50.png",
    logoAlt: "Stewart Airport Logo",
    beforeImage: "/images/image6.jpg",
    beforeImageHint: "faded parking lines",
    afterImage: "/images/image7.jpg",
    afterImageHint: "fresh parking lines",
    quote: "StellarGenix cut our repaint spend by 28% in 3 years. The lot has never looked better or been safer."
  },
  {
    logo: "https://placehold.co/150x50.png",
    logoAlt: "Houston Galleria Logo",
    beforeImage: "/images/image8.jpg",
    beforeImageHint: "cracked asphalt night",
    afterImage: "/images/image9.jpg",
    afterImageHint: "sealed asphalt night",
    quote: "The 72-hour turnaround was incredible. We had zero disruption to our shoppers and the ADA updates were seamless."
  },
  {
    logo: "https://placehold.co/150x50.png",
    logoAlt: "Dallas Medical Center Logo",
    beforeImage: "/images/image10.jpg",
    beforeImageHint: "worn parking lot day",
    afterImage: "/images/image11.jpg",
    afterImageHint: "new parking lot day",
    quote: "Their team's professionalism and communication were top-notch. They handled a complex, multi-level garage with ease."
  }
];

const trustBadges = [
    { name: "BBB Accredited Business" },
    { name: "ISNetworld Member" },
    { name: "Certified Women-Owned" },
    { name: "OSHA Certified" },
    { name: "Texas Apartment Association" },
]

export function SocialProof() {
  return (
    <section id="proof" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="outline" className="text-sm">134+ Texas Properties Served</Badge>
          <h2 className="mt-4 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline text-primary">
            Trusted by Property Managers Across Texas
          </h2>
          <p className="mt-4 text-muted-foreground md:text-xl/relaxed">
            We have a 97% repeat customer rate for a reason. See what our clients have to say about our work.
          </p>
        </div>

        <Carousel className="w-full max-w-5xl mx-auto mt-12" opts={{ loop: true }}>
          <CarouselContent>
            {caseStudies.map((study, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card className="overflow-hidden">
                    <CardContent className="grid md:grid-cols-2 gap-6 p-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="font-bold mb-2 text-center">Before</p>
                            <Image
                                src={study.beforeImage}
                                alt={`Before view for ${study.logoAlt}`}
                                width={300}
                                height={200}
                                className="rounded-lg object-cover w-full aspect-[3/2]"
                                data-ai-hint={study.beforeImageHint}
                            />
                        </div>
                         <div>
                            <p className="font-bold mb-2 text-center text-primary">After</p>
                            <Image
                                src={study.afterImage}
                                alt={`After view for ${study.logoAlt}`}
                                width={300}
                                height={200}
                                className="rounded-lg object-cover w-full aspect-[3/2] border-2 border-primary"
                                data-ai-hint={study.afterImageHint}
                            />
                        </div>
                      </div>
                      <div className="flex flex-col justify-center space-y-4">
                        <Image src={study.logo} alt={study.logoAlt} width={120} height={40} className="opacity-70" />
                        <blockquote className="text-lg font-semibold leading-snug">
                          "{study.quote}"
                        </blockquote>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden lg:flex" />
          <CarouselNext className="hidden lg:flex" />
        </Carousel>

        <div className="mt-16 grid gap-8 md:grid-cols-2 items-center">
            <div className="relative aspect-video w-full">
                <video 
                    src="/videos/video2.mp4" 
                    controls 
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full rounded-lg object-cover"
                    poster="/images/image12.jpg"
                >
                    Your browser does not support the video tag.
                </video>
            </div>
            <div className="space-y-4">
                <h3 className="text-2xl font-bold font-headline text-primary">"Communication was easy, pricing superb."</h3>
                <p className="text-muted-foreground">Hear directly from Donald K., a Property Manager who switched to StellarGenix for his entire portfolio of commercial properties after just one project.</p>
                <div className="flex flex-wrap gap-4 pt-4">
                    {trustBadges.map(badge => <Badge key={badge.name} variant="secondary" className="text-base">{badge.name}</Badge>)}
                </div>
            </div>
        </div>

      </div>
    </section>
  );
}
