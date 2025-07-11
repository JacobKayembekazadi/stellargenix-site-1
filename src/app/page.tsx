import { Header } from '@/components/stellar-stripes/Header';
import { Hero } from '@/components/stellar-stripes/Hero';
import { PainPoints } from '@/components/stellar-stripes/PainPoints';
import { OfferStack } from '@/components/stellar-stripes/OfferStack';
import { SocialProof } from '@/components/stellar-stripes/SocialProof';
import { Process } from '@/components/stellar-stripes/Process';
import { RoiEstimator } from '@/components/stellar-stripes/RoiEstimator';
import { Faq } from '@/components/stellar-stripes/Faq';
import { Footer } from '@/components/stellar-stripes/Footer';
import { Chatbot } from '@/components/stellar-stripes/Chatbot';
import { ExitIntentPopup } from '@/components/stellar-stripes/ExitIntentPopup';
import { ScrollBanner } from '@/components/stellar-stripes/ScrollBanner';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <Hero />
        <PainPoints />
        <OfferStack />
        <SocialProof />
        <Process />
        <RoiEstimator />
        <Faq />
      </main>
      <Footer />
      <Chatbot />
      <ExitIntentPopup />
      <ScrollBanner />
    </div>
  );
}
