/**
 * Core TypeScript interfaces for Developer Portfolio
 */

export type ProjectCategory = 'mobile' | 'web' | 'ai' | 'fullstack' | 'platform';

export interface TechStack {
  name: string;
  icon?: string;
}

export interface ProjectImage {
  id: string;
  src: string;
  alt: string;
}

export interface ProjectHighlight {
  text: string;
}

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  year: string;
  coverImage: string;
  images: ProjectImage[];
  description: string;
  highlights: string[];
  techStack: string[];
  slug: string;
  liveUrl?: string;
  githubUrl?: string;
}

export interface DeveloperInfo {
  name: string;
  tagline: string;
  heroIntroduction: string;
  aboutWork: string;
  journey: string;
  howIWork: string;
  whatDrivesMe: string;
  beyondCode: string;
  futureGoals: string;
  skills: string[];
  location: string;
  email: string;
  availability: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
  portraitImage: string;
}

export interface ContactSubmission {
  name: string;
  email: string;
  projectType: 'web' | 'mobile' | 'ai' | 'consulting';
  message: string;
  timestamp: Date;
}
