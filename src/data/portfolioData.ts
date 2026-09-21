import { NotificationItem, Project, Capability, ProductPreviewItem } from '../types';

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'launch-product-preview-system',
    title: 'New: Abdullah Psychotic Product Preview System (1.webp — 8.webp)',
    message: 'Explore the newly adjusted product preview imaging system featuring products 1.webp through 8.webp with zoom inspection, technical specifications, and live collection archive.',
    category: 'project_launch',
    imageUrl: '/1.webp',
    linkUrl: '#product-preview-system',
    linkLabel: 'Open Product Previewer ↗',
    createdAt: 'Just updated',
    isRead: false,
    isActive: true,
    isPinned: true,
  },
  {
    id: 'offer-whatsapp-1',
    title: 'Special Offer: 30% Off Brand Identity & Web Development',
    message: 'Get a custom-crafted visual identity system, high-speed responsive website, or AI integration at an exclusive rate. Chat directly on WhatsApp to get started.',
    category: 'offer',
    offerCode: 'WHATSAPP30',
    offerDiscount: '30% OFF',
    linkUrl: 'https://wa.me/8801342900364?text=Hello%20Abdullah%2C%20I%20saw%20your%20portfolio%20offer%20(WHATSAPP30)%20and%20would%20like%20to%20discuss%20a%20project!',
    linkLabel: 'Chat on WhatsApp ↗',
    createdAt: 'Active today',
    isRead: false,
    isActive: true,
    isPinned: true,
  },
  {
    id: 'offer-whatsapp-2',
    title: 'Quick Consultation & Sprint Offer: 20% Off UI/UX',
    message: 'Need a fast turnaround on website redesign, Figma wireframes, or landing page optimization? Connect with me directly on WhatsApp.',
    category: 'offer',
    offerCode: 'SPRINT20',
    offerDiscount: '20% OFF',
    linkUrl: 'https://wa.me/8801342900364?text=Hi%20Abdullah%2C%20I%27d%20like%20to%20book%20a%20project%20consultation%20with%20your%20SPRINT20%20offer.',
    linkLabel: 'Message on WhatsApp ↗',
    createdAt: 'Active today',
    isRead: false,
    isActive: true,
    isPinned: true,
  },
  {
    id: 'social-facebook-travel',
    title: 'Connect & Travel Stories on Facebook',
    message: 'Explore my journey, creative behind-the-scenes, and travel adventures. Follow and connect with me directly on my Facebook profile.',
    category: 'website_link',
    imageUrl: 'https://raw.githubusercontent.com/forhad2008/profile/main/public/2.jpg',
    linkUrl: 'https://www.facebook.com/profile.php?id=61580779565120',
    linkLabel: 'View Facebook Profile ↗',
    createdAt: 'Featured',
    isRead: false,
    isActive: true,
    isPinned: true,
  }
];

export const PRODUCT_PREVIEW_COLLECTION: ProductPreviewItem[] = [
  {
    id: 'product-01',
    number: '01',
    name: 'Fashion Signature',
    caption: 'Abdullah Psychotic Runway',
    image: '/1.webp',
    fallbackImage: 'https://raw.githubusercontent.com/forhad2008/Abdullah-psychotic-collections/main/1.webp',
    tag: 'Signature Piece',
    category: 'Fashion',
    description: 'Sculptural architectural silhouette balancing dark aesthetic tension with modern minimalist discipline.',
    details: {
      material: '100% Heavyweight Japanese Cotton',
      style: 'Monochrome High-Contrast',
      edition: 'Vol. 1 Limited'
    }
  },
  {
    id: 'product-02',
    number: '02',
    name: 'Lifestyle Edition',
    caption: 'Modern Living & Essentials',
    image: '/2.webp',
    fallbackImage: 'https://raw.githubusercontent.com/forhad2008/Abdullah-psychotic-collections/main/2.webp',
    tag: 'Lifestyle Art',
    category: 'Lifestyle',
    description: 'Contemporary lifestyle accessories engineered with brutalist precision and tactile luxury touch.',
    details: {
      material: 'Anodized Matte Alloy & Leather',
      style: 'Minimal Industrial',
      edition: 'Core Archive'
    }
  },
  {
    id: 'product-03',
    number: '03',
    name: 'Psycho Notes',
    caption: 'Creative Manifesto Journal',
    image: '/3.webp',
    fallbackImage: 'https://raw.githubusercontent.com/forhad2008/Abdullah-psychotic-collections/main/3.webp',
    tag: 'Art & Concept',
    category: 'Art & Concept',
    description: 'Raw conceptual sketches, typography manifestos, and midnight design studies bound in obsidian covers.',
    details: {
      material: 'Acid-Free Archival Paper 300gsm',
      style: 'Editorial Grids',
      edition: 'Author Series'
    }
  },
  {
    id: 'product-04',
    number: '04',
    name: 'Fashion Bespoke',
    caption: 'Tailored Contrast Cut',
    image: '/4.webp',
    fallbackImage: 'https://raw.githubusercontent.com/forhad2008/Abdullah-psychotic-collections/main/4.webp',
    tag: 'Bespoke Cut',
    category: 'Fashion',
    description: 'Sharp tailored angles with surgical white topstitching against deep onyx fabric.',
    details: {
      material: 'Worsted Wool & Raw Silk Blend',
      style: 'Structured Angular',
      edition: 'Fall / Winter 26'
    }
  },
  {
    id: 'product-05',
    number: '05',
    name: 'Clothes Heavyweight',
    caption: 'Subculture Everyday Apparel',
    image: '/5.webp',
    fallbackImage: 'https://raw.githubusercontent.com/forhad2008/Abdullah-psychotic-collections/main/5.webp',
    tag: 'Daily Wear',
    category: 'Apparel',
    description: 'Heavyweight oversized garment crafted with reinforced flatlock seams and understated tonal typography.',
    details: {
      material: '450gsm Loopback French Terry',
      style: 'Drop-Shoulder Boxy',
      edition: 'Psychotic Standard'
    }
  },
  {
    id: 'product-06',
    number: '06',
    name: 'Streetwear Tactical',
    caption: 'Industrial Urban Subculture',
    image: '/6.webp',
    fallbackImage: 'https://raw.githubusercontent.com/forhad2008/Abdullah-psychotic-collections/main/6.webp',
    tag: 'Street Culture',
    category: 'Streetwear',
    description: 'Raw urban subculture silhouette integrating functional hardware, utility rings, and dark aesthetics.',
    details: {
      material: 'Water-Repellent Cordura & Twill',
      style: 'Modular Utility',
      edition: 'Night Ops 06'
    }
  },
  {
    id: 'product-07',
    number: '07',
    name: 'Luxury Perfume',
    caption: 'Smoked Amber & Dark Woods',
    image: '/7.webp',
    fallbackImage: 'https://raw.githubusercontent.com/forhad2008/Abdullah-psychotic-collections/main/7.webp',
    tag: 'Olfactory Art',
    category: 'Fragrance',
    description: 'Intoxicating bespoke extrait de parfum blending birch tar, dark amber resin, and crisp metallic saffron.',
    details: {
      material: 'Pure Parfum Extrait 30% Concentrate',
      style: 'Smoky Amber & Cedar',
      edition: 'Numbered Flacon'
    }
  },
  {
    id: 'product-08',
    number: '08',
    name: 'Hoodies Thermal',
    caption: 'Obsidian Oversized Fleece',
    image: '/8.webp',
    fallbackImage: 'https://raw.githubusercontent.com/forhad2008/Abdullah-psychotic-collections/main/8.webp',
    tag: 'Winter Signature',
    category: 'Streetwear',
    description: 'Double-layered oversized hoodie constructed with thermal brushed interior and deep crossover hood.',
    details: {
      material: '500gsm Organic Combed Cotton Fleece',
      style: 'Ultra-Heavy Boxy Fit',
      edition: 'Winter Capsule'
    }
  }
];

export const PORTFOLIO_PROJECTS: Project[] = [
  {
    id: 'abdullah-psychotic',
    title: 'Abdullah Psychotic',
    tagline: 'A dark visual system built around identity, discipline, high-contrast typography, and 1.webp-8.webp product line.',
    category: 'branding',
    categoryLabel: 'Brand Identity & Web',
    imageUrl: '/1.webp',
    galleryImages: [
      '/1.webp',
      '/2.webp',
      '/3.webp',
      '/4.webp',
      '/5.webp',
      '/6.webp',
      '/7.webp',
      '/8.webp'
    ],
    productItems: PRODUCT_PREVIEW_COLLECTION,
    featured: true,
    searchTags: ['branding', 'dark mode', 'identity', 'fashion', 'web design', 'psychotic', 'editorial', 'products', '1.webp', '8.webp'],
    description: 'A comprehensive brand identity and digital experience crafted for a forward-thinking streetwear and visual art initiative.',
    fullCaseStudy: {
      clientOrContext: 'Independent Brand & Creative Lab',
      role: 'Lead Art Director, Brand Designer & Front-End Developer',
      timeline: '6 Weeks (Design & Implementation)',
      tools: ['Adobe Illustrator', 'Figma', 'React', 'Tailwind CSS', 'Motion'],
      challenge: 'Creating a rebellious yet surgically refined aesthetic that balances raw editorial tension with fluid web responsiveness.',
      solution: 'Developed custom display letterforms, an austere monochrome color palette with surgical cobalt blue highlights, and a micro-animated portfolio experience.',
      metrics: '350+ brand assets generated, 99 Lighthouse performance score.',
      demoUrl: 'https://forhad2008.github.io/Abdullah-psychotic-collections/',
      githubUrl: 'https://github.com/forhad2008/Abdullah-psychotic-collections',
    }
  },
  {
    id: 'neural-canvas-ai',
    title: 'NeuralCanvas AI Studio',
    tagline: 'Generative AI interface uniting prompt-driven canvas composition with real-time parameter tweaking.',
    category: 'web_ai',
    categoryLabel: 'AI Technologist & Web App',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1400&q=88',
    featured: false,
    searchTags: ['ai', 'generative', 'web app', 'machine learning', 'react', 'tailwind', 'canvas'],
    description: 'An AI-powered design assistant created to accelerate vector poster layouts and style exploration for creative professionals.',
    fullCaseStudy: {
      clientOrContext: 'Diploma Finalist Innovation Showcase',
      role: 'Full-Stack Developer & AI Systems Architect',
      timeline: '4 Weeks',
      tools: ['React 19', 'TypeScript', 'Gemini API / LLM', 'Tailwind CSS', 'HTML5 Canvas'],
      challenge: 'Translating fuzzy creative briefs from non-technical clients into structured prompt sequences and usable visual outputs.',
      solution: 'Constructed an adaptive interface that interprets natural language descriptions into aesthetic style matrices, generating downloadable SVG and color tokens.',
      metrics: 'Under 1.2s roundtrip generation time; automated palette extraction.',
      demoUrl: 'https://github.com/forhad-psychotic',
      githubUrl: 'https://github.com/forhad-psychotic',
    }
  },
  {
    id: 'digital-portfolio-system',
    title: 'NeoEditorial Portfolio',
    tagline: 'Modern responsive architecture blending editorial magazine layout rhythm with snappy client-side state.',
    category: 'web_ai',
    categoryLabel: 'Web UI / Development',
    imageUrl: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=1400&q=88',
    featured: false,
    searchTags: ['web', 'portfolio', 'ui', 'ux', 'responsive', 'javascript', 'react'],
    description: 'Fluid web application utilizing modern component architecture, dynamic notification streams, and mobile app-like tactile feel.',
    fullCaseStudy: {
      clientOrContext: 'Personal Flagship Project',
      role: 'Sole Designer & Engineer',
      timeline: 'Ongoing Evolution',
      tools: ['React', 'TypeScript', 'Tailwind CSS', 'Motion'],
      challenge: 'Unifying mobile-first handheld tactile controls with expansive desktop widescreen typography.',
      solution: 'Engineered a dual-mode layout that transitions effortlessly from a floating mobile dock to a high-end desktop editorial masthead with live notifications.',
      metrics: 'Zero layout shift (CLS 0.0), 100% accessible contrast ratios.',
      demoUrl: '#home',
      githubUrl: 'https://github.com/forhad-psychotic',
    }
  },
  {
    id: 'visual-poster-collection',
    title: 'Kinetic Poster Studies',
    tagline: 'Experimental geometric compositions exploring brutalist grid systems, typography, and optical illusions.',
    category: 'graphics',
    categoryLabel: 'Graphic Design',
    imageUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1400&q=88',
    featured: false,
    searchTags: ['graphics', 'poster', 'print', 'geometry', 'vector', 'composition'],
    description: 'A continuous archive of vector posters and visual experiments dissecting form, scale, and typographic tension.',
    fullCaseStudy: {
      clientOrContext: 'Self-Initiated Design Research',
      role: 'Graphic Designer & Typographer',
      timeline: 'Seasonal Series (12+ Editions)',
      tools: ['Adobe Illustrator', 'Photoshop', 'Generative Scripting'],
      challenge: 'Challenging standard commercial layout norms through asymmetric weight and intentional negative space.',
      solution: 'Produced a cohesive 12-piece print and screen series featured across international digital design communities.',
      metrics: 'Over 14,000 views across Behance and design forums.',
      demoUrl: 'https://behance.net',
      githubUrl: 'https://github.com/forhad-psychotic',
    }
  },
  {
    id: 'experimental-typeface',
    title: 'Synthetix Display Type',
    tagline: 'Custom modular typeface forged for high-impact headlines, packaging, and digital branding.',
    category: 'typography',
    categoryLabel: 'Typography & Form',
    imageUrl: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&w=1400&q=88',
    featured: false,
    searchTags: ['typography', 'font', 'lettering', 'type design', 'display font'],
    description: 'A radical geometric display font designed with sharp angular terminals and hyper-condensed counterspaces.',
    fullCaseStudy: {
      clientOrContext: 'Type Foundry Exploration',
      role: 'Type Designer',
      timeline: '8 Weeks',
      tools: ['Glyphs', 'Illustrator', 'OpenType Features'],
      challenge: 'Balancing extreme visual personality with legibility at display scales on both dark and light digital surfaces.',
      solution: 'Engineered full uppercase, figures, mathematical symbols, and ligatures with specialized optical adjustments for screen rendering.',
      metrics: 'Standard OpenType format; tested across 24 print and screen sizes.',
      demoUrl: 'https://github.com/forhad-psychotic',
      githubUrl: 'https://github.com/forhad-psychotic',
    }
  },
  {
    id: 'ai-creative-copilot',
    title: 'Aura Intelligence Agent',
    tagline: 'Autonomous AI workflow tool connecting generative reasoning with live visual asset production.',
    category: 'web_ai',
    categoryLabel: 'AI Technologist',
    imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1400&q=88',
    featured: false,
    searchTags: ['ai', 'agent', 'automation', 'llm', 'technologist', 'fullstack'],
    description: 'An AI-powered creative engine that autonomously researches design references, synthesizes color tokens, and suggests UI wireframes.',
    fullCaseStudy: {
      clientOrContext: 'Engineering Diploma Project Lab',
      role: 'AI Technologist & Core Architect',
      timeline: '5 Weeks',
      tools: ['TypeScript', 'Gemini Models', 'Node.js', 'Vite', 'Tailwind'],
      challenge: 'Reducing the gap between creative ideation and technical code generation for front-end developers.',
      solution: 'Implemented structured tool-calling architecture enabling the model to output verified Tailwind CSS mockups and color harmonics.',
      metrics: '4x faster early mockup turnaround during testing phase.',
      demoUrl: 'https://github.com/forhad-psychotic',
      githubUrl: 'https://github.com/forhad-psychotic',
    }
  }
];

export const CAPABILITIES: Capability[] = [
  {
    number: '01',
    title: 'Brand Identity & Systems',
    subtitle: 'Graphic Design & Art Direction',
    description: 'Cohesive visual ecosystems: logos, custom typography, brand guidelines, stationery, and memorable digital assets that define distinct personas.',
    tags: ['Brand Guidelines', 'Logo Design', 'Art Direction', 'Vector Systems'],
    iconName: 'Sparkles'
  },
  {
    number: '02',
    title: 'Modern Web Development',
    subtitle: 'Front-End & UI Engineering',
    description: 'Blazing fast, responsive web applications built with React, TypeScript, and modern styling. Flawless on both handheld smartphones and 4K displays.',
    tags: ['React 19', 'TypeScript', 'Tailwind CSS', 'Responsive UI', 'State Flow'],
    iconName: 'Code'
  },
  {
    number: '03',
    title: 'AI Technology & Generative Systems',
    subtitle: 'Applied AI & Creative Automation',
    description: 'Integrating cutting-edge LLMs and multimodal AI into digital products. Prompt orchestration, automated design workflows, and smart interfaces.',
    tags: ['Gemini / LLM Integration', 'Prompt Engineering', 'Generative UI', 'Creative Tech'],
    iconName: 'Bot'
  },
  {
    number: '04',
    title: 'Typography & Editorial Graphics',
    subtitle: 'Form, Scale & Visual Tension',
    description: 'Poster designs, experimental display typefaces, editorial magazines, and social campaign graphics that arrest attention through disciplined composition.',
    tags: ['Display Type', 'Editorial Layouts', 'Print & Digital Posters', 'Color Theory'],
    iconName: 'Type'
  }
];
