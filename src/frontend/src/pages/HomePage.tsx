import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import FiveKwSystem from '../components/FiveKwSystem';
import Benefits from '../components/Benefits';
import PmSuryaScheme from '../components/PmSuryaScheme';
import Gallery from '../components/Gallery';
import VideoSection from '../components/VideoSection';
import ApplicationForm from '../components/ApplicationForm';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import PromotionalPopup from '../components/PromotionalPopup';
import SEOHead from '../components/SEOHead';

export default function HomePage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'श्री सांवरिया Solar Power',
    url: 'https://sanwariya-solar-power-website-590.caffeine.xyz',
    logo: 'https://sanwariya-solar-power-website-590.caffeine.xyz/assets/1000020605.png',
    description: 'Professional Solar Panel Installation, Rooftop Solar Installation, and Solar Energy Solutions. On Grid and Off Grid Solar Systems with PM Surya Ghar Yojana subsidy support.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-9468691001',
      contactType: 'Customer Service',
    },
    sameAs: [],
  };

  return (
    <>
      <SEOHead
        title="श्री सांवरिया Solar Power - Solar Panel Installation | Rooftop Solar | PM Surya Ghar Yojana"
        description="Professional Solar Panel Installation services in India. Get Rooftop Solar Installation, On Grid Solar System, Off Grid Solar System with PM Surya Ghar Yojana subsidy. Free site survey and expert consultation."
        keywords="Solar Panel Installation, Rooftop Solar Installation, Home Solar Panel Installation, Commercial Solar Panel Installation, On Grid Solar System, Off Grid Solar System, Solar Inverter Installation, Solar Battery Installation, PM Surya Ghar Yojana"
        ogUrl="https://sanwariya-solar-power-website-590.caffeine.xyz/"
        canonicalUrl="https://sanwariya-solar-power-website-590.caffeine.xyz/"
        structuredData={structuredData}
      />
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Hero />
          <About />
          <Services />
          <FiveKwSystem />
          <Benefits />
          <PmSuryaScheme />
          <Gallery />
          <VideoSection />
          <ApplicationForm />
          <Contact />
        </main>
        <Footer />
        <PromotionalPopup />
      </div>
    </>
  );
}
