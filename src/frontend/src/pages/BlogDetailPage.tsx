import { useParams, useNavigate } from '@tanstack/react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import { useGetBlogPost, useGetBlogPosts } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, User, ArrowLeft, Share2 } from 'lucide-react';
import { SiFacebook, SiX } from 'react-icons/si';

export default function BlogDetailPage() {
  const { slug } = useParams({ strict: false });
  const navigate = useNavigate();
  const { data: post, isLoading } = useGetBlogPost(slug as string);
  const { data: relatedPosts = [] } = useGetBlogPosts();

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-background flex items-center justify-center">
          <p className="text-muted-foreground">लोड हो रहा है...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (!post) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">ब्लॉग पोस्ट नहीं मिला</h1>
            <Button onClick={() => navigate({ to: '/blog' })}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              ब्लॉग पर वापस जाएं
            </Button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.metaDescription,
    image: post.coverImage,
    datePublished: new Date(post.publishDate).toISOString(),
    dateModified: new Date(post.lastModified).toISOString(),
    author: {
      '@type': 'Organization',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'श्री सांवरिया Solar Power',
      logo: {
        '@type': 'ImageObject',
        url: 'https://sanwariya-solar-power-website-590.caffeine.xyz/assets/1000020605.png',
      },
    },
  };

  const shareUrl = `https://sanwariya-solar-power-website-590.caffeine.xyz/blog/${post.slug}`;

  const handleShare = (platform: string) => {
    const text = encodeURIComponent(post.title);
    const url = encodeURIComponent(shareUrl);
    
    const shareUrls: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  };

  const related = relatedPosts
    .filter(p => p.id !== post.id && p.tags.some(tag => post.tags.includes(tag)))
    .slice(0, 3);

  return (
    <>
      <SEOHead
        title={`${post.title} - श्री सांवरिया Solar Power Blog`}
        description={post.metaDescription}
        keywords={post.tags.join(', ')}
        ogImage={post.coverImage}
        ogUrl={shareUrl}
        canonicalUrl={shareUrl}
        structuredData={structuredData}
      />
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-12">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => navigate({ to: '/blog' })}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            ब्लॉग पर वापस जाएं
          </Button>

          {/* Article Header */}
          <article className="max-w-4xl mx-auto">
            <header className="mb-8">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">{post.title}</h1>
              
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(post.publishDate).toLocaleDateString('hi-IN')}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>

              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-64 md:h-96 object-cover rounded-lg mb-6"
              />

              {/* Share Buttons */}
              <div className="flex items-center gap-2 mb-8">
                <span className="text-sm text-muted-foreground flex items-center gap-2">
                  <Share2 className="w-4 h-4" />
                  शेयर करें:
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShare('facebook')}
                >
                  <SiFacebook className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShare('twitter')}
                >
                  <SiX className="w-4 h-4" />
                </Button>
              </div>
            </header>

            {/* Article Content */}
            <div
              className="prose prose-lg dark:prose-invert max-w-none mb-12"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Related Posts */}
            {related.length > 0 && (
              <section className="mt-12 pt-12 border-t border-border">
                <h2 className="text-2xl font-bold mb-6">संबंधित लेख</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {related.map((relatedPost) => (
                    <Card
                      key={relatedPost.id}
                      className="hover:shadow-lg transition-shadow cursor-pointer"
                      onClick={() => navigate({ to: `/blog/${relatedPost.slug}` })}
                    >
                      <CardHeader className="p-0">
                        <img
                          src={relatedPost.coverImage}
                          alt={relatedPost.title}
                          className="w-full h-32 object-cover rounded-t-lg"
                        />
                      </CardHeader>
                      <CardContent className="pt-4">
                        <CardTitle className="text-base line-clamp-2 mb-2">
                          {relatedPost.title}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {relatedPost.excerpt}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}
          </article>
        </main>
        <Footer />
      </div>
    </>
  );
}
