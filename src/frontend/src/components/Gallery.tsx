import { useGetGallery } from '../hooks/useQueries';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Image as ImageIcon } from 'lucide-react';

export default function Gallery() {
  const { data: galleryItems, isLoading } = useGetGallery();

  // Placeholder images if no gallery items from backend
  const placeholderImages = [
    {
      src: '/assets/generated/solar-installation-hero.dim_1200x600.jpg',
      title: 'आवासीय सोलर इंस्टॉलेशन',
      description: 'घरेलू सोलर पैनल सिस्टम',
    },
    {
      src: '/assets/generated/commercial-solar-array.dim_800x600.jpg',
      title: 'व्यावसायिक सोलर प्रोजेक्ट',
      description: 'बड़े पैमाने पर सोलर सिस्टम',
    },
    {
      src: '/assets/generated/maintenance-service.dim_600x400.jpg',
      title: 'रखरखाव सेवा',
      description: 'नियमित सोलर पैनल रखरखाव',
    },
    {
      src: '/assets/generated/consultation-meeting.dim_600x400.jpg',
      title: 'ग्राहक परामर्श',
      description: 'सोलर समाधान योजना',
    },
    {
      src: '/assets/generated/happy-family-solar.dim_600x400.jpg',
      title: 'संतुष्ट ग्राहक',
      description: 'सोलर ऊर्जा से खुश परिवार',
    },
    {
      src: '/assets/generated/pm-surya-scheme.dim_800x500.jpg',
      title: 'PM सूर्य घर योजना',
      description: 'सरकारी योजना के तहत इंस्टॉलेशन',
    },
  ];

  return (
    <section id="gallery" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">हमारे सोलर प्रोजेक्ट्स की गैलरी</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            हमारे द्वारा पूर्ण किए गए सोलर इंस्टॉलेशन प्रोजेक्ट्स देखें
          </p>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <Card key={index} className="overflow-hidden">
                <Skeleton className="h-64 w-full" />
                <CardContent className="p-4">
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-3 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems && galleryItems.length > 0 ? (
              galleryItems.map((item) => (
                <Card key={Number(item.id)} className="glass-effect border-border/40 overflow-hidden group hover:border-primary/40 transition-all duration-300">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={item.blob.getDirectURL()}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              ))
            ) : (
              placeholderImages.map((image, index) => (
                <Card key={index} className="glass-effect border-border/40 overflow-hidden group hover:border-primary/40 transition-all duration-300">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={image.src}
                      alt={image.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-1">{image.title}</h3>
                    <p className="text-sm text-muted-foreground">{image.description}</p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}

        <div className="mt-12 text-center">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-muted/50 border border-border/40">
            <ImageIcon className="w-5 h-5 text-primary mr-2" />
            <span className="text-sm text-muted-foreground">
              500+ सफल प्रोजेक्ट्स पूर्ण किए गए
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
