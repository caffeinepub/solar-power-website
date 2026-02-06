import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PromotionalPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Check if popup has been shown in this session
    const popupShown = sessionStorage.getItem('promotional-popup-shown');
    if (popupShown === 'true') {
      setHasShown(true);
      return;
    }

    let timeoutId: NodeJS.Timeout;
    let scrollTriggered = false;

    // Show after 2.5 seconds
    timeoutId = setTimeout(() => {
      if (!scrollTriggered && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
        sessionStorage.setItem('promotional-popup-shown', 'true');
      }
    }, 2500);

    // Show on 25% scroll
    const handleScroll = () => {
      if (scrollTriggered || hasShown) return;

      const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      
      if (scrollPercentage >= 25) {
        scrollTriggered = true;
        clearTimeout(timeoutId);
        setIsVisible(true);
        setHasShown(true);
        sessionStorage.setItem('promotional-popup-shown', 'true');
        window.removeEventListener('scroll', handleScroll);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasShown]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleCTA = () => {
    setIsVisible(false);
    // Smooth scroll to application form
    const applicationForm = document.getElementById('application-form');
    if (applicationForm) {
      applicationForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-in fade-in duration-300"
        onClick={handleClose}
      />
      
      {/* Popup */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div 
          className="relative w-full max-w-md pointer-events-auto animate-in zoom-in-95 duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-[oklch(var(--solar-green))] via-[oklch(var(--solar-yellow))] to-[oklch(var(--solar-green))] rounded-2xl blur-xl opacity-50 animate-pulse" />
          
          {/* Content */}
          <div className="relative glass-effect rounded-2xl p-6 sm:p-8 shadow-2xl border-2 border-[oklch(var(--solar-green)/0.3)]">
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-muted transition-colors"
              aria-label="बंद करें"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>

            {/* Sun emoji with glow */}
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-[oklch(var(--solar-yellow))] rounded-full blur-2xl opacity-50" />
                <span className="relative text-6xl">🌞</span>
              </div>
            </div>

            {/* Headline */}
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-3 bg-gradient-to-r from-[oklch(var(--solar-green))] via-[oklch(var(--solar-yellow))] to-[oklch(var(--solar-green))] bg-clip-text text-transparent">
              फ्री साइट सर्वे बुक करें!
            </h2>

            {/* Supporting text */}
            <p className="text-center text-muted-foreground mb-6 leading-relaxed">
              PM Surya Ghar योजना के तहत अपने घर पर सोलर पैनल लगवाएं और बिजली के बिल में बचत करें।
            </p>

            {/* CTA Button */}
            <Button
              onClick={handleCTA}
              className="w-full bg-gradient-to-r from-[oklch(var(--solar-green))] to-[oklch(var(--solar-blue))] hover:from-[oklch(var(--solar-green)/0.9)] hover:to-[oklch(var(--solar-blue)/0.9)] text-white font-semibold py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
            >
              अभी आवेदन करें
            </Button>

            {/* Decorative elements */}
            <div className="absolute -bottom-2 -left-2 w-20 h-20 bg-[oklch(var(--solar-yellow))] rounded-full blur-3xl opacity-20" />
            <div className="absolute -top-2 -right-2 w-20 h-20 bg-[oklch(var(--solar-green))] rounded-full blur-3xl opacity-20" />
          </div>
        </div>
      </div>
    </>
  );
}
