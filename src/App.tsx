import { HeroSection } from "./components/HeroSection";
import { RealityCheckSection } from "./components/RealityCheckSection";
import { HowItWorksSection } from "./components/HowItWorksSection";
import { FinancialMathSection } from "./components/FinancialMathSection";
import { TrustSignalsStrip } from "./components/TrustSignalsStrip";
import { MetricsSection } from "./components/MetricsSection";
import { FAQSection } from "./components/FAQSection";
import { ProcessSequence } from "./components/ProcessSequence";
import { AuditFormSection } from "./components/AuditFormSection";
import { FinalCTAStrip } from "./components/FinalCTAStrip";
import { StickyHeader } from "./components/StickyHeader";
import { ExitIntentModal } from "./components/ExitIntentModal";

function App() {
  return (
    <div className="min-h-screen">
      <StickyHeader />
      <ExitIntentModal />
      <HeroSection />
      <RealityCheckSection />
      <HowItWorksSection />
      <FinancialMathSection />
      <TrustSignalsStrip />
      <MetricsSection />
      <FAQSection />
      <ProcessSequence />
      <AuditFormSection />
      <FinalCTAStrip />
    </div>
  );
}

export default App;
