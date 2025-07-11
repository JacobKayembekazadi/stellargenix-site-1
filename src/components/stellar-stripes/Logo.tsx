import { Rocket } from 'lucide-react';

export function Logo() {
  return (
    <a href="#" className="flex items-center gap-2 text-xl font-bold text-primary font-headline md:text-2xl">
      <Rocket className="h-6 w-6 md:h-7 md:w-7 text-accent" />
      <span>StellarGenix</span>
    </a>
  );
}
