import { Navbar } from './Navbar';
import { HeroSection } from './HeroSection';
import { AboutsSection } from './AboutSection';
import { FeaturesSection } from './FeaturesSection';
import { DampakSection } from './DampakSection';
import { Footer } from './Footer';

export function LandingPageContent() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <AboutsSection />
      <FeaturesSection />
      <DampakSection />
      <Footer />
    </>
  );
}
