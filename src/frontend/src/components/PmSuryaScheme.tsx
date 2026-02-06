import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, FileText, Users, IndianRupee, ClipboardList, HelpCircle } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function PmSuryaScheme() {
  const scrollToForm = () => {
    const element = document.getElementById('application-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const eligibilityCriteria = [
    'भारतीय नागरिक होना आवश्यक',
    'आवासीय संपत्ति का मालिक',
    'बिजली कनेक्शन होना जरूरी',
    'आधार कार्ड और बैंक खाता',
  ];

  const requiredDocuments = [
    'आधार कार्ड (PDF)',
    'बैंक पासबुक (PDF)',
    'बिजली बिल (PDF)',
    'पासपोर्ट साइज फोटो (JPG/PNG)',
  ];

  const applicationProcess = [
    { step: '1', title: 'ऑनलाइन आवेदन', description: 'हमारी वेबसाइट पर फॉर्म भरें' },
    { step: '2', title: 'दस्तावेज़ अपलोड', description: 'आवश्यक दस्तावेज़ सुरक्षित रूप से अपलोड करें' },
    { step: '3', title: 'साइट सर्वे', description: 'हमारी टीम मुफ्त साइट निरीक्षण करेगी' },
    { step: '4', title: 'इंस्टॉलेशन', description: 'सोलर पैनल इंस्टॉलेशन और सेटअप' },
    { step: '5', title: 'सब्सिडी प्राप्ति', description: 'सरकारी सब्सिडी का लाभ उठाएं' },
  ];

  return (
    <section id="pm-surya" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-block mb-4 px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
            <span className="text-sm font-medium text-accent">सरकारी योजना</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">PM सूर्य घर मुफ्त बिजली योजना</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            प्रधानमंत्री सूर्य घर योजना के तहत अपने घर पर सोलर पैनल लगाएं और सरकारी सब्सिडी का लाभ उठाएं
          </p>
        </div>

        {/* Scheme Overview */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="glass-effect border-border/40">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="w-6 h-6 text-primary mr-3" />
                योजना का उद्देश्य
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                PM सूर्य घर मुफ्त बिजली योजना का उद्देश्य घरों में सोलर रूफटॉप सिस्टम को बढ़ावा देना है। 
                इस योजना के तहत 1 करोड़ घरों को सोलर पैनल लगाने के लिए सब्सिडी प्रदान की जाएगी।
              </p>
              <img
                src="/assets/generated/pm-surya-scheme.dim_800x500.jpg"
                alt="PM Surya Ghar Yojana"
                className="rounded-lg w-full"
              />
            </CardContent>
          </Card>

          <Card className="glass-effect border-border/40">
            <CardHeader>
              <CardTitle className="flex items-center">
                <IndianRupee className="w-6 h-6 text-primary mr-3" />
                सब्सिडी विवरण
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">1-2 kW सिस्टम</span>
                    <span className="text-primary font-bold">₹30,000/kW</span>
                  </div>
                  <p className="text-sm text-muted-foreground">अधिकतम ₹60,000 तक</p>
                </div>
                <div className="p-4 rounded-lg bg-secondary/10 border border-secondary/20">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">2-3 kW सिस्टम</span>
                    <span className="text-secondary font-bold">₹18,000/kW</span>
                  </div>
                  <p className="text-sm text-muted-foreground">अतिरिक्त क्षमता के लिए</p>
                </div>
                <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">3 kW से अधिक</span>
                    <span className="text-accent font-bold">₹18,000/kW</span>
                  </div>
                  <p className="text-sm text-muted-foreground">अधिकतम 3 kW तक</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Eligibility and Documents */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="glass-effect border-border/40">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-6 h-6 text-primary mr-3" />
                पात्रता मानदंड
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {eligibilityCriteria.map((criteria, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{criteria}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="glass-effect border-border/40">
            <CardHeader>
              <CardTitle className="flex items-center">
                <ClipboardList className="w-6 h-6 text-primary mr-3" />
                आवश्यक दस्तावेज़
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {requiredDocuments.map((doc, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{doc}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Application Process */}
        <Card className="glass-effect border-border/40 mb-12">
          <CardHeader>
            <CardTitle className="text-center text-2xl">आवेदन प्रक्रिया</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-5 gap-4">
              {applicationProcess.map((item, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border-2 border-primary mb-3">
                    <span className="text-2xl font-bold text-primary">{item.step}</span>
                  </div>
                  <h4 className="font-semibold mb-2">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* How We Help */}
        <Card className="glass-effect border-border/40 mb-12">
          <CardHeader>
            <CardTitle className="flex items-center">
              <HelpCircle className="w-6 h-6 text-primary mr-3" />
              हम कैसे मदद करते हैं
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>पूर्ण दस्तावेज़ सहायता</AccordionTrigger>
                <AccordionContent>
                  हम आपके सभी दस्तावेज़ों को तैयार करने और सही तरीके से जमा करने में मदद करते हैं। 
                  हमारी टीम यह सुनिश्चित करती है कि आपका आवेदन पहली बार में ही स्वीकृत हो जाए।
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>मुफ्त साइट सर्वे और डिज़ाइन</AccordionTrigger>
                <AccordionContent>
                  हमारे विशेषज्ञ आपके घर का निःशुल्क निरीक्षण करते हैं और सबसे उपयुक्त सोलर सिस्टम डिज़ाइन करते हैं। 
                  हम आपकी छत की क्षमता और बिजली की जरूरतों का विश्लेषण करते हैं।
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>सब्सिडी प्रक्रिया में सहायता</AccordionTrigger>
                <AccordionContent>
                  हम सरकारी सब्सिडी प्राप्त करने की पूरी प्रक्रिया में आपकी मदद करते हैं। 
                  आवेदन से लेकर सब्सिडी मिलने तक, हम हर कदम पर आपके साथ हैं।
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>गुणवत्तापूर्ण इंस्टॉलेशन</AccordionTrigger>
                <AccordionContent>
                  हम Luminous Systems के प्रीमियम उत्पादों का उपयोग करते हैं और पेशेवर इंस्टॉलेशन सुनिश्चित करते हैं। 
                  सभी इंस्टॉलेशन पर व्यापक वारंटी और रखरखाव सेवाएं उपलब्ध हैं।
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center">
          <Button
            size="lg"
            onClick={scrollToForm}
            className="bg-primary hover:bg-primary/90 text-lg px-12 py-6"
          >
            <FileText className="w-5 h-5 mr-2" />
            अभी आवेदन करें
          </Button>
        </div>
      </div>
    </section>
  );
}
