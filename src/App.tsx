import { HeroSection } from "./components/HeroSection";
import { RealityCheckSection } from "./components/RealityCheckSection";
import { HowItWorksSection } from "./components/HowItWorksSection";
import { FinancialMathSection } from "./components/FinancialMathSection";
import { TrustSignalsStrip } from "./components/TrustSignalsStrip";
import { ProcessSequence } from "./components/ProcessSequence";
import { AuditFormSection } from "./components/AuditFormSection";
import { FinalCTAStrip } from "./components/FinalCTAStrip";

function App() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <RealityCheckSection />
      <HowItWorksSection />
      <FinancialMathSection />
      <TrustSignalsStrip />
      <ProcessSequence />
      <AuditFormSection />
      <FinalCTAStrip />
    </div>
  );
}

export default App;
