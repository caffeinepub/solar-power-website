import { Card, CardContent } from '@/components/ui/card';
import { Zap, TrendingDown, Leaf, Shield, Home, Award } from 'lucide-react';

export default function Benefits() {
  const benefits = [
    {
      icon: TrendingDown,
      title: 'बिजली बिल में कमी',
      description: 'अपने मासिक बिजली खर्च में 70-90% तक की बचत करें',
    },
    {
      icon: Leaf,
      title: 'पर्यावरण संरक्षण',
      description: 'कार्बन फुटप्रिंट कम करें और स्वच्छ ऊर्जा का उपयोग करें',
    },
    {
      icon: Zap,
      title: 'निर्बाध बिजली',
      description: '24/7 विश्वसनीय और स्थिर बिजली आपूर्ति',
    },
    {
      icon: Award,
      title: 'सरकारी सब्सिडी',
      description: 'PM सूर्य घर योजना के तहत 40-60% तक सब्सिडी',
    },
    {
      icon: Home,
      title: 'संपत्ति मूल्य वृद्धि',
      description: 'सोलर इंस्टॉलेशन से आपकी संपत्ति का मूल्य बढ़ता है',
    },
    {
      icon: Shield,
      title: 'दीर्घकालिक निवेश',
      description: '25+ वर्षों तक चलने वाला टिकाऊ समाधान',
    },
  ];

  return (
    <section id="benefits" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">सोलर एनर्जी के फायदे</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            सोलर ऊर्जा अपनाकर आप न केवल पैसे बचाते हैं बल्कि पर्यावरण की भी रक्षा करते हैं
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <Card key={index} className="glass-effect border-border/40 hover:border-primary/40 transition-all duration-300 hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 flex-shrink-0">
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <img
            src="/assets/generated/solar-benefits-icons.dim_400x300.jpg"
            alt="Solar Benefits"
            className="mx-auto rounded-lg shadow-xl max-w-md"
          />
        </div>
      </div>
    </section>
  );
}
