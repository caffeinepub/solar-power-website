import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import { useGetBlogPosts, useGetAllBlogTags } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Calendar, Tag } from 'lucide-react';

export default function BlogListPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | undefined>();

  const { data: posts = [], isLoading } = useGetBlogPosts(searchTerm, selectedTag);
  const { data: allTags = [] } = useGetAllBlogTags();

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'श्री सांवरिया Solar Power Blog',
    description: 'Latest articles on Solar Panel Installation, Rooftop Solar, PM Surya Ghar Yojana, and renewable energy solutions.',
    url: 'https://sanwariya-solar-power-website-590.caffeine.xyz/blog',
  };

  return (
    <>
      <SEOHead
        title="ब्लॉग - श्री सांवरिया Solar Power | Solar Energy Articles & Updates"
        description="Read latest articles on Solar Panel Installation, Rooftop Solar Installation, On Grid Solar System, Off Grid Solar System, PM Surya Ghar Yojana, and renewable energy solutions."
        keywords="Solar Panel Installation blog, Rooftop Solar articles, Solar energy news, PM Surya Ghar Yojana updates, Solar installation tips"
        ogUrl="https://sanwariya-solar-power-website-590.caffeine.xyz/blog"
        canonicalUrl="https://sanwariya-solar-power-website-590.caffeine.xyz/blog"
        structuredData={structuredData}
      />
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-12">
          {/* Hero Section */}
          <section className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
              ब्लॉग - सोलर एनर्जी की दुनिया
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Solar Panel Installation, Rooftop Solar, और PM Surya Ghar Yojana से जुड़ी नवीनतम जानकारी और टिप्स
            </p>
          </section>

          {/* Search and Filter */}
          <section className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  type="text"
                  placeholder="ब्लॉग पोस्ट खोजें..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Tags Filter */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedTag === undefined ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedTag(undefined)}
              >
                सभी
              </Button>
              {allTags.map((tag) => (
                <Button
                  key={tag}
                  variant={selectedTag === tag ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedTag(tag)}
                >
                  {tag}
                </Button>
              ))}
            </div>
          </section>

          {/* Blog Posts Grid */}
          <section>
            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">लोड हो रहा है...</p>
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">कोई ब्लॉग पोस्ट नहीं मिला</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <Card key={post.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate({ to: `/blog/${post.slug}` })}>
                    <CardHeader className="p-0">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                    </CardHeader>
                    <CardContent className="pt-4">
                      <CardTitle className="mb-2 line-clamp-2">{post.title}</CardTitle>
                      <CardDescription className="line-clamp-3 mb-4">
                        {post.excerpt}
                      </CardDescription>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(post.publishDate).toLocaleDateString('hi-IN')}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {post.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" className="w-full">
                        पूरा पढ़ें →
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
