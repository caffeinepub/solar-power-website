import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useSubmitContactForm } from '../hooks/useQueries';
import { toast } from 'sonner';
import { Phone, Mail, MapPin, Send, Loader2 } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const submitMutation = useSubmitContactForm();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      toast.error('कृपया सभी फील्ड भरें');
      return;
    }

    try {
      await submitMutation.mutateAsync(formData);
      toast.success('संदेश सफलतापूर्वक भेजा गया! हम जल्द ही आपसे संपर्क करेंगे।');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      toast.error('संदेश भेजने में त्रुटि हुई। कृपया पुनः प्रयास करें।');
      console.error('Contact form error:', error);
    }
  };

  const phoneNumbers = [
    { number: '9468691001', display: '+91 94686 91001' },
    { number: '8209525778', display: '+91 82095 25778' },
    { number: '9828148269', display: '+91 98281 48269' },
    { number: '9828770712', display: '+91 98287 70712' },
  ];

  const contactInfo = [
    {
      icon: Phone,
      title: 'फोन नंबर',
      details: phoneNumbers,
      type: 'phone',
    },
    {
      icon: Mail,
      title: 'ईमेल',
      details: [
        { text: 'info@srisanwariyasolar.com', link: 'mailto:info@srisanwariyasolar.com' },
        { text: 'support@srisanwariyasolar.com', link: 'mailto:support@srisanwariyasolar.com' },
      ],
      type: 'email',
    },
    {
      icon: MapPin,
      title: 'पता',
      details: [
        { text: 'श्री सांवरिया Solar Power' },
        { text: 'राजस्थान, भारत' },
      ],
      type: 'address',
    },
  ];

  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">संपर्क करें</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            हमसे संपर्क करें और अपने सोलर समाधान के बारे में जानें
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {contactInfo.map((info, index) => (
            <Card key={index} className="glass-effect border-border/40 hover:border-primary/40 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <info.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-3">{info.title}</h3>
                
                {info.type === 'phone' && (
                  <div className="space-y-2">
                    {info.details.map((phone: any, idx: number) => (
                      <a
                        key={idx}
                        href={`tel:+91${phone.number}`}
                        className="block text-muted-foreground hover:text-primary transition-colors"
                      >
                        {phone.display}
                      </a>
                    ))}
                  </div>
                )}
                
                {info.type === 'email' && (
                  <div className="space-y-2">
                    {info.details.map((email: any, idx: number) => (
                      <a
                        key={idx}
                        href={email.link}
                        className="block text-muted-foreground hover:text-primary transition-colors break-all"
                      >
                        {email.text}
                      </a>
                    ))}
                  </div>
                )}
                
                {info.type === 'address' && (
                  <div className="space-y-1">
                    {info.details.map((addr: any, idx: number) => (
                      <p key={idx} className="text-muted-foreground">
                        {addr.text}
                      </p>
                    ))}
                  </div>
                )}
                
                {info.type === 'phone' && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4"
                    asChild
                  >
                    <a href={`tel:+91${phoneNumbers[0].number}`}>
                      कॉल करें
                    </a>
                  </Button>
                )}
                
                {info.type === 'email' && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4"
                    asChild
                  >
                    <a href="mailto:info@srisanwariyasolar.com">
                      ईमेल भेजें
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="glass-effect border-border/40 max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl text-center">संदेश भेजें</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">नाम *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="अपना नाम दर्ज करें"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="email">ईमेल *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="example@email.com"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="phone">फोन नंबर *</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="10 अंकों का मोबाइल नंबर"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="message">संदेश *</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="अपना संदेश यहां लिखें..."
                  rows={5}
                  required
                  className="mt-1"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-primary hover:bg-primary/90"
                disabled={submitMutation.isPending}
              >
                {submitMutation.isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    भेजा जा रहा है...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    संदेश भेजें
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Quick Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90"
            asChild
          >
            <a href={`tel:+91${phoneNumbers[0].number}`}>
              <Phone className="w-5 h-5 mr-2" />
              अभी कॉल करें
            </a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-2"
            onClick={() => {
              const element = document.getElementById('application-form');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            मुफ्त साइट सर्वे बुक करें
          </Button>
        </div>
      </div>
    </section>
  );
}
