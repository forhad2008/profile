export type NotificationCategory = 'offer' | 'website_link' | 'project_launch' | 'announcement' | 'ai_tech';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  category: NotificationCategory;
  linkUrl?: string;
  linkLabel?: string;
  imageUrl?: string;
  offerCode?: string;
  offerDiscount?: string;
  createdAt: string;
  isRead?: boolean;
  isActive: boolean;
  isPinned?: boolean;
}

export type ProjectCategory = 'all' | 'web_ai' | 'branding' | 'graphics' | 'typography';

export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: ProjectCategory;
  categoryLabel: string;
  imageUrl: string;
  featured?: boolean;
  searchTags: string[];
  description: string;
  fullCaseStudy: {
    clientOrContext: string;
    role: string;
    timeline: string;
    tools: string[];
    challenge: string;
    solution: string;
    metrics?: string;
    demoUrl?: string;
    githubUrl?: string;
  };
}

export interface Capability {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  iconName: string;
}
