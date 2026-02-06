import { Button } from '@/components/ui/button';
import { ArrowRight, Phone, FileText } from 'lucide-react';

export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/generated/solar-installation-hero.dim_1200x600.jpg"
          alt="Solar Installation"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/80" />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 solar-gradient-radial opacity-50" />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl">
          <div className="inline-block mb-4 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <span className="text-sm font-medium text-primary">भारत सरकार द्वारा अनुमोदित</span>
          </div>
          
          {/* Logo and Company Name */}
          <div className="flex items-center gap-4 mb-6">
            <img
              src="/assets/1000020605.png"
              alt="श्री सांवरिया Solar Power Logo"
              className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 object-contain"
            />
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="text-gradient">श्री सांवरिया</span>
              <br />
              <span className="text-foreground">Solar Power</span>
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-2xl">
            रोशनी आपकी, जिम्मेदारी हमारी
          </p>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
            Luminous Systems के साथ पूर्ण सोलर समाधान। मुफ्त साइट सर्वे, वारंटी और रखरखाव सेवाओं के साथ।
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              onClick={() => scrollToSection('application-form')}
              className="bg-primary hover:bg-primary/90 text-lg px-8 py-6"
            >
              <FileText className="w-5 h-5 mr-2" />
              PM सूर्य घर योजना के लिए आवेदन करें
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection('contact')}
              className="text-lg px-8 py-6 border-2"
            >
              <Phone className="w-5 h-5 mr-2" />
              मुफ्त साइट सर्वे बुक करें
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-12 pt-12 border-t border-border/40">
            <div>
              <div className="text-3xl font-bold text-primary mb-1">500+</div>
              <div className="text-sm text-muted-foreground">संतुष्ट ग्राहक</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-1">100%</div>
              <div className="text-sm text-muted-foreground">वारंटी सपोर्ट</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-1">24/7</div>
              <div className="text-sm text-muted-foreground">सहायता सेवा</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
