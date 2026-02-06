import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Zap, Home, TrendingDown, Shield, Gauge, Building2 } from 'lucide-react';

export default function FiveKwSystem() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const features = [
    {
      icon: Zap,
      title: 'बिजली उत्पादन क्षमता',
      description: 'लगभग 20 यूनिट प्रतिदिन',
      color: 'text-solar-yellow',
    },
    {
      icon: Home,
      title: 'आवश्यक क्षेत्रफल',
      description: 'लगभग 500 वर्ग फुट',
      color: 'text-solar-green',
    },
    {
      icon: TrendingDown,
      title: 'बिजली बिल में बचत',
      description: '80% तक की बचत',
      color: 'text-solar-blue',
    },
    {
      icon: Shield,
      title: 'वारंटी',
      description: '25 साल की वारंटी वाले पैनल',
      color: 'text-primary',
    },
  ];

  const benefits = [
    'बिजली बिल में 80% तक की बचत',
    '25 साल की वारंटी वाले पैनल',
    'नेट मीटरिंग सुविधा',
    'सरकारी सब्सिडी का लाभ',
    'पर्यावरण के अनुकूल समाधान',
    'कम रखरखाव लागत',
  ];

  const suitableFor = [
    { icon: Home, text: 'घर' },
    { icon: Building2, text: 'दुकानें' },
    { icon: Building2, text: 'स्कूल' },
    { icon: Building2, text: 'छोटे व्यवसाय' },
  ];

  return (
    <section id="5kw-system" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-block mb-4 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <span className="text-sm font-medium text-primary">विशेष समाधान</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">5 किलोवाट रूफटॉप सोलर सिस्टम विवरण</span>
          </h2>
          <p className="text-xl text-muted-foreground font-medium">
            घर और छोटे व्यवसायों के लिए आदर्श सोलर समाधान
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
          {/* Image Section */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
            <div className="relative overflow-hidden rounded-2xl border border-border/40">
              <img
                src="/assets/generated/commercial-solar-array.dim_800x600.jpg"
                alt="5kW Rooftop Solar System"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="inline-block px-4 py-2 rounded-full bg-primary/90 backdrop-blur-sm">
                  <span className="text-sm font-bold text-primary-foreground">5kW सोलर सिस्टम</span>
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="glass-effect border-border/40 hover:border-primary/40 transition-all duration-300">
                <CardHeader>
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-3 ${feature.color}`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-primary">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Details Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Cost and Subsidy */}
          <Card className="glass-effect border-border/40">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Gauge className="w-6 h-6 text-primary mr-3" />
                लागत और सब्सिडी विवरण
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg bg-muted/50 border border-border/40">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">अनुमानित लागत</span>
                  <span className="text-lg font-bold text-primary">₹2.5 - 3.5 लाख</span>
                </div>
                <p className="text-sm text-muted-foreground">ग्राहक की आवश्यकता के अनुसार</p>
              </div>
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">सरकारी सब्सिडी</span>
                  <span className="text-lg font-bold text-primary">₹78,000 तक</span>
                </div>
                <p className="text-sm text-muted-foreground">PM सूर्य घर योजना के तहत</p>
              </div>
              <div className="p-4 rounded-lg bg-secondary/10 border border-secondary/20">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">सब्सिडी के बाद लागत</span>
                  <span className="text-lg font-bold text-secondary">₹1.7 - 2.7 लाख</span>
                </div>
                <p className="text-sm text-muted-foreground">अंतिम निवेश राशि</p>
              </div>
            </CardContent>
          </Card>

          {/* Benefits */}
          <Card className="glass-effect border-border/40">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <TrendingDown className="w-6 h-6 text-primary mr-3" />
                मुख्य लाभ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <div className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary/20 mr-3 mt-0.5 flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <span className="text-muted-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Suitable For */}
        <Card className="glass-effect border-border/40 mb-12">
          <CardHeader>
            <CardTitle className="text-center text-xl">उपयुक्त उपयोग</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {suitableFor.map((item, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border-2 border-primary/20 mb-3 hover:bg-primary/20 transition-colors">
                    <item.icon className="w-8 h-8 text-primary" />
                  </div>
                  <p className="font-semibold">{item.text}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center">
          <Button
            size="lg"
            onClick={scrollToContact}
            className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-lg px-12 py-6 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Zap className="w-5 h-5 mr-2" />
            5kW सोलर सिस्टम के लिए निशुल्क साइट सर्वे बुक करें
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            हमारे विशेषज्ञ आपसे 24 घंटे के भीतर संपर्क करेंगे
          </p>
        </div>
      </div>
    </section>
  );
}
