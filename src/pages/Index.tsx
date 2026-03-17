import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import StickyProductSection from "@/components/StickyProductSection";
import CapabilitiesSection from "@/components/CapabilitiesSection";
import DeveloperSection from "@/components/DeveloperSection";
import EcosystemSection from "@/components/EcosystemSection";
import SocialProofSection from "@/components/SocialProofSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <StickyProductSection />
      <CapabilitiesSection />
      <DeveloperSection />
      <EcosystemSection />
      <SocialProofSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
