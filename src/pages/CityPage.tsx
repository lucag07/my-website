import { useParams, Navigate } from "react-router-dom";
import { getCityBySlug } from "../content/locations";
import { HeroSection } from "../components/HeroSection";
import { RealityCheckSection } from "../components/RealityCheckSection";
import { HowItWorksSection } from "../components/HowItWorksSection";
import { WhyNotOthersSection } from "../components/WhyNotOthersSection";
import { FinancialMathSection } from "../components/FinancialMathSection";
import { TrustSignalsStrip } from "../components/TrustSignalsStrip";
import { MetricsSection } from "../components/MetricsSection";
import { FAQSection } from "../components/FAQSection";
import { ProcessSequence } from "../components/ProcessSequence";
import { FinalCTAStrip } from "../components/FinalCTAStrip";
import { StickyHeader } from "../components/StickyHeader";
import { ExitIntentModal } from "../components/ExitIntentModal";
import { Footer } from "../components/Footer";

export function CityPage() {
  const { region, city } = useParams<{ region: string; city: string }>();
  
  const cityData = getCityBySlug(city || "");
  
  // Verify the city belongs to this region and exists
  if (!cityData || cityData.regionSlug !== region) {
    return <Navigate to={`/locations/${region || ""}`} replace />;
  }

  return (
    <div className="min-h-screen">
      <StickyHeader />
      <ExitIntentModal />
      <HeroSection cityName={cityData.name} />
      <RealityCheckSection />
      <HowItWorksSection />
      <WhyNotOthersSection />
      <FinancialMathSection />
      <TrustSignalsStrip />
      <MetricsSection />
      <FAQSection />
      <ProcessSequence />
      <FinalCTAStrip />
      <Footer />
    </div>
  );
}
