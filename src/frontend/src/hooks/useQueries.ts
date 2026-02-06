import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { ExternalBlob, UserRole } from '../backend';
import type { GalleryItem, PmSuryaGharApplication } from '../backend';
import { Principal } from '@icp-sdk/core/principal';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  author: string;
  coverImage: string;
  tags: string[];
  publishDate: number;
  lastModified: number;
  content: string;
  excerpt: string;
  metaDescription: string;
  published: boolean;
}

// Mock blog posts data (since backend doesn't have blog functionality yet)
const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'सोलर पैनल इंस्टॉलेशन के फायदे',
    slug: 'solar-panel-installation-benefits',
    author: 'श्री सांवरिया Solar Power',
    coverImage: '/assets/generated/solar-installation-hero.dim_1200x600.jpg',
    tags: ['Solar Panel Installation', 'Rooftop Solar', 'Home Solar'],
    publishDate: Date.now() - 7 * 24 * 60 * 60 * 1000,
    lastModified: Date.now() - 7 * 24 * 60 * 60 * 1000,
    content: `<h2>सोलर पैनल इंस्टॉलेशन क्यों जरूरी है?</h2>
    <p>आज के समय में बिजली की बढ़ती कीमतों और पर्यावरण संरक्षण की जरूरत को देखते हुए, सोलर पैनल इंस्टॉलेशन एक बेहतरीन समाधान है।</p>
    <h3>मुख्य लाभ:</h3>
    <ul>
      <li><strong>बिजली बिल में 80% तक की बचत</strong> - सोलर पैनल से उत्पन्न बिजली का उपयोग करके आप अपने मासिक बिजली बिल को काफी कम कर सकते हैं।</li>
      <li><strong>पर्यावरण के अनुकूल</strong> - सौर ऊर्जा एक स्वच्छ और नवीकरणीय ऊर्जा स्रोत है जो कार्बन उत्सर्जन को कम करता है।</li>
      <li><strong>सरकारी सब्सिडी</strong> - PM Surya Ghar Yojana के तहत सरकार द्वारा सब्सिडी प्रदान की जाती है।</li>
      <li><strong>25 साल की वारंटी</strong> - उच्च गुणवत्ता वाले सोलर पैनल लंबे समय तक चलते हैं।</li>
    </ul>
    <h3>Rooftop Solar Installation की प्रक्रिया</h3>
    <p>हमारी टीम आपके घर का मुफ्त साइट सर्वे करती है और आपकी जरूरतों के अनुसार सही On Grid Solar System या Off Grid Solar System का चयन करती है।</p>`,
    excerpt: 'सोलर पैनल इंस्टॉलेशन से बिजली बिल में 80% तक की बचत करें। जानें कैसे Rooftop Solar Installation आपके घर के लिए फायदेमंद है।',
    metaDescription: 'सोलर पैनल इंस्टॉलेशन के फायदे, Rooftop Solar Installation प्रक्रिया, और PM Surya Ghar Yojana सब्सिडी की पूरी जानकारी। Home Solar Panel Installation के लिए संपर्क करें।',
    published: true,
  },
  {
    id: '2',
    title: 'On Grid vs Off Grid Solar System - कौन सा बेहतर है?',
    slug: 'on-grid-vs-off-grid-solar-system',
    author: 'श्री सांवरिया Solar Power',
    coverImage: '/assets/generated/commercial-solar-array.dim_800x600.jpg',
    tags: ['On Grid Solar System', 'Off Grid Solar System', 'Solar Inverter'],
    publishDate: Date.now() - 14 * 24 * 60 * 60 * 1000,
    lastModified: Date.now() - 14 * 24 * 60 * 60 * 1000,
    content: `<h2>On Grid और Off Grid Solar System में अंतर</h2>
    <p>सोलर सिस्टम चुनते समय यह समझना जरूरी है कि On Grid और Off Grid Solar System में क्या अंतर है।</p>
    <h3>On Grid Solar System</h3>
    <ul>
      <li>बिजली ग्रिड से जुड़ा होता है</li>
      <li>नेट मीटरिंग की सुविधा</li>
      <li>कम लागत (बैटरी की जरूरत नहीं)</li>
      <li>अतिरिक्त बिजली ग्रिड को बेच सकते हैं</li>
    </ul>
    <h3>Off Grid Solar System</h3>
    <ul>
      <li>पूरी तरह से स्वतंत्र</li>
      <li>Solar Battery Installation जरूरी</li>
      <li>बिजली कटौती से मुक्ति</li>
      <li>दूरदराज के इलाकों के लिए उपयुक्त</li>
    </ul>
    <h3>Solar Inverter Installation की भूमिका</h3>
    <p>दोनों प्रकार के सिस्टम में Solar Inverter Installation महत्वपूर्ण है। यह DC करंट को AC करंट में बदलता है।</p>`,
    excerpt: 'On Grid Solar System और Off Grid Solar System में क्या अंतर है? जानें कौन सा सिस्टम आपके लिए बेहतर है।',
    metaDescription: 'On Grid Solar System vs Off Grid Solar System की तुलना। Solar Inverter Installation और Solar Battery Installation की पूरी जानकारी। Commercial Solar Panel Installation के लिए संपर्क करें।',
    published: true,
  },
  {
    id: '3',
    title: 'PM Surya Ghar Yojana - सब्सिडी और आवेदन प्रक्रिया',
    slug: 'pm-surya-ghar-yojana-subsidy-application',
    author: 'श्री सांवरिया Solar Power',
    coverImage: '/assets/generated/pm-surya-scheme.dim_800x500.jpg',
    tags: ['PM Surya Ghar Yojana', 'Government Subsidy', 'Home Solar Panel Installation'],
    publishDate: Date.now() - 21 * 24 * 60 * 60 * 1000,
    lastModified: Date.now() - 21 * 24 * 60 * 60 * 1000,
    content: `<h2>PM Surya Ghar Muft Bijli Yojana क्या है?</h2>
    <p>प्रधानमंत्री सूर्य घर मुफ्त बिजली योजना भारत सरकार की एक महत्वाकांक्षी योजना है जो घरों में Home Solar Panel Installation को बढ़ावा देती है।</p>
    <h3>सब्सिडी की राशि</h3>
    <ul>
      <li>1-2 kW सिस्टम: ₹30,000 प्रति kW</li>
      <li>2-3 kW सिस्टम: ₹18,000 प्रति kW (अतिरिक्त क्षमता के लिए)</li>
      <li>3 kW से अधिक: ₹18,000 प्रति kW</li>
    </ul>
    <h3>आवेदन के लिए आवश्यक दस्तावेज</h3>
    <ul>
      <li>आधार कार्ड</li>
      <li>बैंक पासबुक</li>
      <li>बिजली बिल</li>
      <li>पासपोर्ट साइज फोटो</li>
    </ul>
    <h3>हमारी सेवाएं</h3>
    <p>श्री सांवरिया Solar Power आपके Commercial Solar Panel Installation और Home Solar Panel Installation में पूरी मदद करता है। हम आवेदन से लेकर इंस्टॉलेशन तक की पूरी प्रक्रिया संभालते हैं।</p>`,
    excerpt: 'PM Surya Ghar Yojana के तहत सोलर पैनल पर सब्सिडी पाएं। जानें आवेदन प्रक्रिया और पात्रता की शर्तें।',
    metaDescription: 'PM Surya Ghar Muft Bijli Yojana की पूरी जानकारी। सब्सिडी राशि, आवेदन प्रक्रिया, और Home Solar Panel Installation के लिए दस्तावेज। अभी आवेदन करें।',
    published: true,
  },
];

export function useGetGallery() {
  const { actor, isFetching } = useActor();

  return useQuery<GalleryItem[]>({
    queryKey: ['gallery'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getGallery();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitPmSuryaGharApplication() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      fullName: string;
      email: string;
      phoneNumber: string;
      aadhaarCard: ExternalBlob;
      bankPassbook: ExternalBlob;
      electricityBill: ExternalBlob;
      passportPhoto: ExternalBlob;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.submitPmSuryaGharApplication(
        data.fullName,
        data.email,
        data.phoneNumber,
        data.aadhaarCard,
        data.bankPassbook,
        data.electricityBill,
        data.passportPhoto
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] });
    },
  });
}

export function useSubmitContactForm() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      phone: string;
      message: string;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.submitContactForm(data.name, data.email, data.phone, data.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact-submissions'] });
    },
  });
}

export function useGetApplicationStatus(applicationId: bigint | null) {
  const { actor, isFetching } = useActor();

  return useQuery<string>({
    queryKey: ['application-status', applicationId?.toString()],
    queryFn: async () => {
      if (!actor || !applicationId) return '';
      return actor.getApplicationStatus(applicationId);
    },
    enabled: !!actor && !isFetching && !!applicationId,
  });
}

// Admin-only queries
export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['isAdmin'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
    retry: false,
  });
}

export function useGetPmSuryaGharApplications(searchTerm: string, statusFilter: string) {
  const { actor, isFetching } = useActor();

  return useQuery<PmSuryaGharApplication[]>({
    queryKey: ['applications', searchTerm, statusFilter],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPmSuryaGharApplicationsFiltered(searchTerm, statusFilter);
    },
    enabled: !!actor && !isFetching,
    retry: false,
  });
}

export function useUpdateApplicationStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { applicationId: bigint; newStatus: string }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.updateApplicationStatus(data.applicationId, data.newStatus);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] });
    },
  });
}

export function useAssignAdminRole() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (principal: Principal) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.assignCallerUserRole(principal, UserRole.admin);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['isAdmin'] });
    },
  });
}

// Blog queries (using mock data until backend is implemented)
export function useGetBlogPosts(searchTerm?: string, tag?: string) {
  return useQuery<BlogPost[]>({
    queryKey: ['blog-posts', searchTerm, tag],
    queryFn: async () => {
      let posts = mockBlogPosts.filter(post => post.published);
      
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        posts = posts.filter(post => 
          post.title.toLowerCase().includes(term) ||
          post.excerpt.toLowerCase().includes(term) ||
          post.tags.some(t => t.toLowerCase().includes(term))
        );
      }
      
      if (tag) {
        posts = posts.filter(post => post.tags.includes(tag));
      }
      
      return posts.sort((a, b) => b.publishDate - a.publishDate);
    },
  });
}

export function useGetBlogPost(slug: string) {
  return useQuery<BlogPost | null>({
    queryKey: ['blog-post', slug],
    queryFn: async () => {
      const post = mockBlogPosts.find(p => p.slug === slug && p.published);
      return post || null;
    },
  });
}

export function useGetAllBlogTags() {
  return useQuery<string[]>({
    queryKey: ['blog-tags'],
    queryFn: async () => {
      const allTags = mockBlogPosts
        .filter(post => post.published)
        .flatMap(post => post.tags);
      return Array.from(new Set(allTags));
    },
  });
}
