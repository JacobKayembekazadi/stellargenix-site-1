'use client';
import { Button } from '@/components/ui/button';
import { Logo } from './Logo';

export function Header() {
  const scrollToForm = () => {
    document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/90 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Logo />
        <Button onClick={scrollToForm} className="hidden sm:inline-flex bg-accent text-accent-foreground hover:bg-accent/90 shadow-md">
          Get My Free Audit
        </Button>
      </div>
    </header>
  );
}
