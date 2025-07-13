import HeroSection from '@/components/landing/HeroSection';
import HowItWorks from '@/components/landing/HowItWorks';
import UseCases from '@/components/landing/UseCases';
import EarningOpportunity from '@/components/landing/EarningOpportunity';
import SafetyMeasures from '@/components/landing/SafetyMeasures';
import PricingPreview from '@/components/landing/PricingPreview';
import WaitlistForm from '@/components/landing/WaitlistForm';

export default function Home() {
  return (
    <main className="bg-black">
      <HeroSection />
      <HowItWorks />
      <UseCases />
      <EarningOpportunity />
      <SafetyMeasures />
      <PricingPreview />
      <WaitlistForm />
    </main>
  );
}
