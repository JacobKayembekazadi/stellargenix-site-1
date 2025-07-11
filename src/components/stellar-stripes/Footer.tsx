
'use client';

import { useState, useEffect } from "react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Phone, MessageCircle } from "lucide-react";

export function Footer() {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="w-full bg-primary/5 border-t">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          <div className="flex flex-col gap-4 lg:col-span-2">
            <Logo />
            <p className="text-muted-foreground max-w-md">
              The only Texas lot-care partner who increases safety, slashes costs, and removes every risk.
            </p>
            <div className="flex gap-2 mt-2">
                <Button variant="outline" size="icon"><svg role="img" viewBox="0 0 24 24" className="h-4 w-4 fill-current"><title>Facebook</title><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.323-1.325z"/></svg></Button>
                <Button variant="outline" size="icon"><svg role="img" viewBox="0 0 24 24" className="h-4 w-4 fill-current"><title>LinkedIn</title><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg></Button>
            </div>
          </div>
          <div>
            <h4 className="font-headline font-bold mb-4">Services</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-primary">Precision Striping</a></li>
              <li><a href="#" className="hover:text-primary">Crack-Fill & Seal-Coat</a></li>
              <li><a href="#" className="hover:text-primary">ADA Compliance</a></li>
              <li><a href="#" className="hover:text-primary">Safety Monitoring</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-headline font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-center gap-2"><Phone size={16}/> (713) 555-0123</li>
              <li className="flex items-center gap-2"><MessageCircle size={16}/> sales@stellargenix.com</li>
            </ul>
          </div>
          <div className="bg-accent/20 rounded-lg p-4">
            <h4 className="font-headline font-bold mb-2 text-primary">Striping Emergency?</h4>
            <p className="text-sm text-muted-foreground mb-3">Text for a 15-min callback.</p>
            <Button variant="outline" className="w-full bg-background">Text LOT911</Button>
          </div>
        </div>
        <div className="border-t mt-8 pt-6 text-center text-sm text-muted-foreground">
          © {year} StellarGenix Pavement Solutions. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
