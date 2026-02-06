import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border/40 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <img
              src="/assets/1000020605.png"
              alt="श्री सांवरिया Solar Power Logo"
              className="w-12 h-12 object-contain"
            />
          </div>
          
          <p className="text-lg font-semibold mb-2">
            रोशनी आपकी जिम्मेदारी हमारी
          </p>
          <p className="text-sm text-muted-foreground">
            © 2025 श्री सांवरिया Solar Power. सभी अधिकार सुरक्षित।
          </p>
          <p className="text-sm text-muted-foreground mt-2 flex items-center justify-center gap-1">
            Built with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> using{' '}
            <a
              href="https://caffeine.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
