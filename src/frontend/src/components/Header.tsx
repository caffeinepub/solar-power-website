import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Phone, Sun, Moon, Shield } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useNavigate, useLocation } from '@tanstack/react-router';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (id: string) => {
    if (location.pathname !== '/') {
      navigate({ to: '/' });
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setMobileMenuOpen(false);
  };

  const goToAdmin = () => {
    navigate({ to: '/admin' });
    setMobileMenuOpen(false);
  };

  const goToBlog = () => {
    navigate({ to: '/blog' });
    setMobileMenuOpen(false);
  };

  const goToHome = () => {
    navigate({ to: '/' });
    setMobileMenuOpen(false);
  };

  const navItems = [
    { label: 'होम', action: goToHome },
    { label: 'हमारे बारे में', id: 'about' },
    { label: 'सेवाएं', id: 'services' },
    { label: 'PM सूर्य घर योजना', id: 'pm-surya' },
    { label: 'ब्लॉग', action: goToBlog },
    { label: 'गैलरी', id: 'gallery' },
    { label: 'संपर्क', id: 'contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 glass-effect">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Brand */}
          <button onClick={goToHome} className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <img
              src="/assets/1000020605.png"
              alt="श्री सांवरिया Solar Power - Solar Panel Installation Company Logo"
              className="w-10 h-10 object-contain"
            />
            <div className="flex flex-col">
              <span className="text-lg font-bold text-gradient">श्री सांवरिया Solar Power</span>
              <span className="text-xs text-muted-foreground hidden sm:block">स्वच्छ ऊर्जा का भरोसेमंद साथी</span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => item.action ? item.action() : item.id && scrollToSection(item.id)}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="hidden sm:flex"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button
              onClick={goToAdmin}
              variant="outline"
              size="sm"
              className="hidden lg:flex"
            >
              <Shield className="w-4 h-4 mr-2" />
              एडमिन
            </Button>
            <Button
              onClick={() => scrollToSection('contact')}
              className="hidden sm:flex bg-primary hover:bg-primary/90"
            >
              <Phone className="w-4 h-4 mr-2" />
              संपर्क करें
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/40">
            <nav className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => item.action ? item.action() : item.id && scrollToSection(item.id)}
                  className="text-left px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-accent/50 rounded-md transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={goToAdmin}
                className="text-left px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-accent/50 rounded-md transition-colors flex items-center"
              >
                <Shield className="w-4 h-4 mr-2" />
                एडमिन लॉगिन
              </button>
              <Button
                onClick={() => scrollToSection('contact')}
                className="mx-4 bg-primary hover:bg-primary/90"
              >
                <Phone className="w-4 h-4 mr-2" />
                संपर्क करें
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
