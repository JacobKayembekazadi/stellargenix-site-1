"use client"

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileText, Download } from "lucide-react";

export function ExitIntentPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && sessionStorage.getItem("exitIntentShown") !== "true") {
        setIsOpen(true);
        sessionStorage.setItem("exitIntentShown", "true");
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md text-center p-8">
        <DialogHeader>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
            <FileText className="h-6 w-6 text-primary" />
          </div>
          <DialogTitle className="text-2xl font-headline">Wait! Before You Go...</DialogTitle>
          <DialogDescription className="mt-2 text-base text-muted-foreground">
            Grab our free 7-Point ADA Checklist to ensure your lot is safe, compliant, and protected from fines.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-6">
          <Button size="lg" className="w-full bg-primary hover:bg-primary/90">
            <Download className="mr-2 h-5 w-5" />
            Download My Free Checklist (PDF)
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
