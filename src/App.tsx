import { HeroSection } from "./components/HeroSection";
import { RealityCheckSection } from "./components/RealityCheckSection";
import { HowItWorksSection } from "./components/HowItWorksSection";
import { WhyNotOthersSection } from "./components/WhyNotOthersSection";
import { FinancialMathSection } from "./components/FinancialMathSection";
import { TrustSignalsStrip } from "./components/TrustSignalsStrip";
import { MetricsSection } from "./components/MetricsSection";
import { FAQSection } from "./components/FAQSection";
import { ProcessSequence } from "./components/ProcessSequence";
import { FinalCTAStrip } from "./components/FinalCTAStrip";
import { StickyHeader } from "./components/StickyHeader";
import { ExitIntentModal } from "./components/ExitIntentModal";
import { Footer } from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen">
      <StickyHeader />
      <ExitIntentModal />
      <HeroSection />
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

export default App;
