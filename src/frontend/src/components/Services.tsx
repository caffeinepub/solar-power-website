import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench, Settings, MessageSquare, Leaf } from 'lucide-react';

export default function Services() {
  const services = [
    {
      icon: Settings,
      title: 'सोलर पैनल इंस्टॉलेशन',
      description: 'आवासीय और व्यावसायिक संपत्तियों के लिए पेशेवर सोलर पैनल इंस्टॉलेशन सेवाएं। हम Luminous Systems के उच्च गुणवत्ता वाले उत्पादों का उपयोग करते हैं।',
      image: '/assets/generated/commercial-solar-array.dim_800x600.jpg',
    },
    {
      icon: Wrench,
      title: 'मेंटेनेंस और मरम्मत',
      description: 'नियमित रखरखाव, सफाई और मरम्मत सेवाएं ताकि आपका सोलर सिस्टम हमेशा अधिकतम दक्षता पर काम करे। 24/7 सपोर्ट उपलब्ध।',
      image: '/assets/generated/maintenance-service.dim_600x400.jpg',
    },
    {
      icon: MessageSquare,
      title: 'सोलर कंसल्टेशन',
      description: 'विशेषज्ञ परामर्श सेवाएं जो आपको सही सोलर समाधान चुनने में मदद करती हैं। मुफ्त साइट सर्वे और कस्टमाइज्ड सिस्टम डिज़ाइन।',
      image: '/assets/generated/consultation-meeting.dim_600x400.jpg',
    },
    {
      icon: Leaf,
      title: 'ग्रीन एनर्जी सलाह',
      description: 'पर्यावरण के अनुकूल ऊर्जा समाधान और सरकारी योजनाओं के बारे में विस्तृत जानकारी। PM सूर्य घर योजना में पूर्ण सहायता।',
      image: '/assets/generated/pm-surya-scheme.dim_800x500.jpg',
    },
  ];

  return (
    <section id="services" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">हमारी सेवाएं</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            हम आपके लिए संपूर्ण सोलर समाधान प्रदान करते हैं - इंस्टॉलेशन से लेकर रखरखाव तक
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="glass-effect border-border/40 hover:border-primary/40 transition-all duration-300 overflow-hidden group">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
              </div>
              <CardHeader>
                <div className="flex items-center space-x-3 mb-2">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
