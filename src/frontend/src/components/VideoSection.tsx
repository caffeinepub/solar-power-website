import { Card, CardContent } from '@/components/ui/card';
import { Play } from 'lucide-react';

export default function VideoSection() {
  return (
    <section id="video" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">हमारे सोलर प्रोजेक्ट्स की झलक देखें</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            वीडियो के माध्यम से हमारे काम की गुणवत्ता और ग्राहक संतुष्टि देखें
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="glass-effect border-border/40 overflow-hidden">
            <CardContent className="p-0">
              <div className="relative aspect-video bg-muted/50 flex items-center justify-center group cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20" />
                <img
                  src="/assets/generated/solar-installation-hero.dim_1200x600.jpg"
                  alt="Video Thumbnail"
                  className="absolute inset-0 w-full h-full object-cover opacity-50"
                />
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-2xl">
                    <Play className="w-10 h-10 text-white ml-1" fill="white" />
                  </div>
                  <p className="mt-4 text-lg font-semibold text-white drop-shadow-lg">
                    वीडियो देखने के लिए क्लिक करें
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <Card className="glass-effect border-border/40">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">500+</div>
                <p className="text-sm text-muted-foreground">सफल इंस्टॉलेशन</p>
              </CardContent>
            </Card>
            <Card className="glass-effect border-border/40">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-secondary mb-2">100%</div>
                <p className="text-sm text-muted-foreground">ग्राहक संतुष्टि</p>
              </CardContent>
            </Card>
            <Card className="glass-effect border-border/40">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-accent mb-2">10+</div>
                <p className="text-sm text-muted-foreground">वर्षों का अनुभव</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
