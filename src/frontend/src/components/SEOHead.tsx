import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogUrl?: string;
  canonicalUrl?: string;
  structuredData?: object;
}

// Enhanced default keywords with all SEO keywords
const DEFAULT_KEYWORDS = "Solar Panel Installation, Rooftop Solar Installation, Home Solar Panel Installation, Commercial Solar Panel Installation, On Grid Solar System, Off Grid Solar System, Solar Inverter Installation, Solar Battery Installation, Solar Energy Solutions, Solar Power Systems in Rajasthan, Residential Solar System, Commercial Solar Projects, Rooftop Solar Subsidy Scheme, Luminous Solar Panels, Solar Panel Maintenance Service, Government Solar Scheme India, PM Surya Ghar Solar Yojana, Solar Battery Backup System";

export default function SEOHead({
  title,
  description,
  keywords,
  ogImage = '/assets/1000020605.png',
  ogUrl,
  canonicalUrl,
  structuredData,
}: SEOHeadProps) {
  useEffect(() => {
    // Update title
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', description);
    // Use provided keywords or default enhanced keywords
    updateMetaTag('keywords', keywords || DEFAULT_KEYWORDS);

    // Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', ogImage, true);
    updateMetaTag('og:type', 'website', true);
    if (ogUrl) {
      updateMetaTag('og:url', ogUrl, true);
    }

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', ogImage);

    // Canonical link
    if (canonicalUrl) {
      let linkElement = document.querySelector('link[rel="canonical"]');
      if (!linkElement) {
        linkElement = document.createElement('link');
        linkElement.setAttribute('rel', 'canonical');
        document.head.appendChild(linkElement);
      }
      linkElement.setAttribute('href', canonicalUrl);
    }

    // Structured data
    if (structuredData) {
      let scriptElement = document.querySelector('script[type="application/ld+json"]');
      if (!scriptElement) {
        scriptElement = document.createElement('script');
        scriptElement.setAttribute('type', 'application/ld+json');
        document.head.appendChild(scriptElement);
      }
      scriptElement.textContent = JSON.stringify(structuredData);
    }
  }, [title, description, keywords, ogImage, ogUrl, canonicalUrl, structuredData]);

  return null;
}
