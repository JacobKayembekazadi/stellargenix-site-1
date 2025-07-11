"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ScrollBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      if (scrollPercent > 50) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToForm = () => {
    document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-30 bg-primary text-primary-foreground p-3 transition-transform duration-500 ease-in-out",
        isVisible ? "translate-y-0" : "translate-y-full"
      )}
    >
      <div className="container mx-auto flex items-center justify-center sm:justify-between gap-4">
        <p className="hidden sm:block font-medium">Ready to improve your lot's safety and value?</p>
        <Button onClick={scrollToForm} variant="secondary" className="bg-accent text-accent-foreground hover:bg-accent/90 shrink-0">
          Book My Free Audit
        </Button>
      </div>
    </div>
  );
}
