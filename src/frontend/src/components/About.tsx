import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, Award, Shield, Users } from 'lucide-react';

export default function About() {
  const features = [
    {
      icon: CheckCircle2,
      title: 'Luminous Systems',
      description: 'प्रीमियम क्वालिटी सोलर उत्पादों के साथ',
    },
    {
      icon: Award,
      title: 'पूर्ण वारंटी',
      description: 'सभी इंस्टॉलेशन पर व्यापक वारंटी',
    },
    {
      icon: Shield,
      title: 'मुफ्त साइट सर्वे',
      description: 'विशेषज्ञों द्वारा निःशुल्क स्थल निरीक्षण',
    },
    {
      icon: Users,
      title: 'विशेषज्ञ टीम',
      description: 'अनुभवी और प्रशिक्षित तकनीशियन',
    },
  ];

  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">हमारे बारे में</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            श्री सांवरिया Solar Power भारत में स्वच्छ और नवीकरणीय ऊर्जा समाधान प्रदान करने में अग्रणी है। 
            हम Luminous Systems के साथ मिलकर उच्च गुणवत्ता वाले सोलर पैनल इंस्टॉलेशन, रखरखाव और परामर्श सेवाएं प्रदान करते हैं।
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="glass-effect border-border/40 hover:border-primary/40 transition-all duration-300 hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="glass-effect border-border/40">
          <CardContent className="p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">हमारी सेवाएं</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">पूर्ण सोलर पैनल इंस्टॉलेशन और सेटअप</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">नियमित रखरखाव और मरम्मत सेवाएं</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">व्यापक वारंटी और गारंटी सपोर्ट</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">मुफ्त साइट सर्वे और कोटेशन</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">PM सूर्य घर योजना में सहायता</span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <img
                  src="/assets/generated/happy-family-solar.dim_600x400.jpg"
                  alt="Happy Family with Solar"
                  className="rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
