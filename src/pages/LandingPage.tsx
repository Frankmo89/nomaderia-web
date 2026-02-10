import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import HeroSection from '@/components/landing/HeroSection';
import ExpeditionsSection from '@/components/landing/ExpeditionsSection';
import WhyUsSection from '@/components/landing/WhyUsSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import FAQSection from '@/components/landing/FAQSection';
import CTASection from '@/components/landing/CTASection';
import CalendlyModal from '@/components/landing/CalendlyModal';
import EmailCaptureModal from '@/components/landing/EmailCaptureModal';
import ExpeditionDetailModal from '@/components/landing/ExpeditionDetailModal';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import { type Expedition } from '@/data/landing/expeditions';

export default function LandingPage() {
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [selectedExpedition, setSelectedExpedition] = useState<Expedition | null>(null);

  const handleBookCall = () => {
    setIsCalendlyOpen(true);
  };

  const handleSubscribe = () => {
    setIsEmailModalOpen(true);
  };

  const handleViewExpeditions = () => {
    const expeditionsSection = document.getElementById('expeditions');
    expeditionsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectExpedition = (expedition: Expedition) => {
    setSelectedExpedition(expedition);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <main>
        <HeroSection 
          onBookCall={handleBookCall}
          onViewExpeditions={handleViewExpeditions}
        />
        
        <ExpeditionsSection 
          onSelectExpedition={handleSelectExpedition}
        />
        
        <WhyUsSection />
        
        <TestimonialsSection />
        
        <FAQSection />
        
        <CTASection 
          onBookCall={handleBookCall}
          onSubscribe={handleSubscribe}
        />
      </main>

      <Footer />

      {/* Modals */}
      <CalendlyModal 
        isOpen={isCalendlyOpen}
        onClose={() => setIsCalendlyOpen(false)}
      />

      <EmailCaptureModal 
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
      />

      <ExpeditionDetailModal 
        expedition={selectedExpedition}
        isOpen={!!selectedExpedition}
        onClose={() => setSelectedExpedition(null)}
        onBookCall={handleBookCall}
      />

      {/* WhatsApp Widget */}
      <WhatsAppWidget />
    </div>
  );
}
