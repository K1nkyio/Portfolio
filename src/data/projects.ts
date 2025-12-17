import type { Project } from '@/types';

export const projects: Project[] = [
  {
    id: '1',
    title: 'PesaPal',
    category: 'mobile',
    year: '2024',
    slug: 'pesapal',
    coverImage: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHNlYXJjaHwxfHxidWRnZXQlMjBhcHB8ZW58MHx8fHwxNzA5MTU0MTEyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'A Kotlin + Firebase mobile application designed to help students manage irregular income. It provides adaptive budgeting, expense insights, and personalized savings goals through a clean, intuitive interface.',
    highlights: [
      'Adaptive budgeting algorithm',
      'Income trend analysis',
      'Savings goal tracking',
      'Responsive, student-friendly UI'
    ],
    techStack: ['Kotlin', 'Firebase', 'Android SDK', 'Material Design'],
    liveUrl: 'https://play.google.com/store/apps/details?id=com.pesapal',
    githubUrl: 'https://github.com/nicholasmureithi/pesapal',
    images: [
      {
        id: '1-1',
        src: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHNlYXJjaHwyfHxmaW5hbmNlfGVufDB8fHx8MTcwOTE1NDExMnww&ixlib=rb-4.1.0&q=80&w=1080',
        alt: 'Budget tracking interface'
      },
      {
        id: '1-2',
        src: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHNlYXJjaHwzfHxzYXZpbmdzfGVufDB8fHx8MTcwOTE1NDExMnww&ixlib=rb-4.1.0&q=80&w=1080',
        alt: 'Savings goals dashboard'
      }
    ]
  },
  {
    id: '2',
    title: 'HotelEase',
    category: 'fullstack',
    year: '2024',
    slug: 'hotelease',
    coverImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHNlYXJjaHwxfHxob3RlbHxlbnwwfHx8fDE3MDkxNTQxMTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'A modern reservation system built with React and Node.js, offering real-time availability and a smooth booking experience suitable for both small hotels and large booking operations.',
    highlights: [
      'Advanced search and filtering',
      'Secure payment integration',
      'Email notifications',
      'Real-time room availability'
    ],
    techStack: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Socket.io'],
    liveUrl: 'https://hotelease.app',
    githubUrl: 'https://github.com/nicholasmureithi/hotelease',
    images: [
      {
        id: '2-1',
        src: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHNlYXJjaHwyfHxob3RlbCUyMHJvb218ZW58MHx8fHwxNzA5MTU0MTEyfDA&ixlib=rb-4.1.0&q=80&w=1080',
        alt: 'Hotel booking interface'
      },
      {
        id: '2-2',
        src: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHNlYXJjaHwzfHxob3RlbCUyMGxvYmJ5fGVufDB8fHx8MTcwOTE1NDExMnww&ixlib=rb-4.1.0&q=80&w=1080',
        alt: 'Room selection dashboard'
      }
    ]
  },
  {
    id: '3',
    title: 'Smart Resume Analyzer',
    category: 'ai',
    year: '2024',
    slug: 'smart-resume-analyzer',
    coverImage: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHNlYXJjaHwxfHxyZXN1bWV8ZW58MHx8fHwxNzA5MTU0MTEyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'A Python-based AI system that evaluates resumes, extracts skills, compares them with job descriptions, and produces match scores to assist recruiters and job seekers.',
    highlights: [
      'Machine-learning skill extraction',
      'Compatibility scoring',
      'PDF/DOCX document support',
      'Keyword optimization suggestions'
    ],
    techStack: ['Python', 'spaCy', 'scikit-learn', 'FastAPI', 'Docker'],
    liveUrl: 'https://resume-analyzer.app',
    githubUrl: 'https://github.com/nicholasmureithi/smart-resume-analyzer',
    images: [
      {
        id: '3-1',
        src: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHNlYXJjaHwyfHxkb2N1bWVudHxlbnwwfHx8fDE3MDkxNTQxMTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        alt: 'Resume analysis dashboard'
      },
      {
        id: '3-2',
        src: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHNlYXJjaHwzfHxhbmFseXRpY3N8ZW58MHx8fHwxNzA5MTU0MTEyfDA&ixlib=rb-4.1.0&q=80&w=1080',
        alt: 'Skills matching interface'
      }
    ]
  },
  {
    id: '4',
    title: 'Personal AI Assistant',
    category: 'ai',
    year: '2023',
    slug: 'personal-ai-assistant',
    coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHNlYXJjaHwxfHxhaXxlbnwwfHx8fDE3MDkxNTQxMTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'A customizable conversational assistant using Python and OpenAI APIs, built to help with coding, productivity tasks, and general queries, with support for voice input and contextual understanding.',
    highlights: [
      'Voice recognition',
      'Context-aware responses',
      'Code snippet generation',
      'Personalized learning behavior'
    ],
    techStack: ['Python', 'OpenAI API', 'Flask', 'Speech Recognition', 'Redis'],
    liveUrl: 'https://ai-assistant.app',
    githubUrl: 'https://github.com/nicholasmureithi/personal-ai-assistant',
    images: [
      {
        id: '4-1',
        src: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHNlYXJjaHwyfHxhaXxlbnwwfHx8fDE3MDkxNTQxMTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        alt: 'AI chat interface'
      },
      {
        id: '4-2',
        src: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHNlYXJjaHwzfHxyb2JvdHxlbnwwfHx8fDE3MDkxNTQxMTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        alt: 'Voice command interface'
      }
    ]
  },
  {
    id: '5',
    title: 'ZetechVerse',
    category: 'platform',
    year: '2023',
    slug: 'zetechverse',
    coverImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5fGVufDB8fHx8MTcwOTE1NDExMnww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'A dedicated web platform created for Zetech University students, built to centralize essential academic and campus services. It focuses on accessibility, simplicity, and improving the student experience.',
    highlights: [
      'Student accounts and role-based dashboards',
      'Course materials, announcements, and updates',
      'Community-driven student tools',
      'Clean, mobile-first interface'
    ],
    techStack: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Tailwind CSS'],
    liveUrl: 'https://zetechverse.app',
    githubUrl: 'https://github.com/nicholasmureithi/zetechverse',
    images: [
      {
        id: '5-1',
        src: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHNlYXJjaHwyfHx1bml2ZXJzaXR5fGVufDB8fHx8MTcwOTE1NDExMnww&ixlib=rb-4.1.0&q=80&w=1080',
        alt: 'Student portal dashboard'
      },
      {
        id: '5-2',
        src: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHNlYXJjaHwzfHxzdHVkeXxlbnwwfHx8fDE3MDkxNTQxMTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        alt: 'Course materials page'
      }
    ]
  },
  {
    id: '6',
    title: 'Hardware Store Manager',
    category: 'fullstack',
    year: '2023',
    slug: 'hardware-store-manager',
    coverImage: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHNlYXJjaHwxfHxoYXJkd2FyZSUyMHN0b3JlfGVufDB8fHx8MTcwOTE1NDExMnww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'A full-stack system designed for small and mid-sized hardware stores to streamline stock management, sales, and customer orders. Built for reliability and day-to-day business operations.',
    highlights: [
      'Product and inventory tracking',
      'Order and sales management',
      'Role-based user permissions',
      'Simple, efficient admin UI'
    ],
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Chart.js'],
    liveUrl: 'https://hardware-manager.app',
    githubUrl: 'https://github.com/nicholasmureithi/hardware-store-manager',
    images: [
      {
        id: '6-1',
        src: 'https://images.unsplash.com/photo-1553413077-190dd305871c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHNlYXJjaHwyfHx3YXJlaG91c2V8ZW58MHx8fHwxNzA5MTU0MTEyfDA&ixlib=rb-4.1.0&q=80&w=1080',
        alt: 'Inventory management interface'
      },
      {
        id: '6-2',
        src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHNlYXJjaHwzfHxkYXNoYm9hcmR8ZW58MHx8fHwxNzA5MTU0MTEyfDA&ixlib=rb-4.1.0&q=80&w=1080',
        alt: 'Sales analytics dashboard'
      }
    ]
  },
  {
    id: '7',
    title: 'E-Commerce Dashboard',
    category: 'fullstack',
    year: '2024',
    slug: 'ecommerce-dashboard',
    coverImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2V8ZW58MHx8fHwxNzA5MTU0MTEyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'A comprehensive admin dashboard for e-commerce businesses featuring real-time analytics, inventory management, order tracking, and customer insights with a modern, responsive interface.',
    highlights: [
      'Real-time sales analytics',
      'Multi-vendor support',
      'Automated inventory alerts',
      'Customer segmentation tools'
    ],
    techStack: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Recharts'],
    liveUrl: 'https://ecom-dash.app',
    githubUrl: 'https://github.com/K1nkyio/ecommerce-dashboard',
    images: [
      {
        id: '7-1',
        src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHNlYXJjaHwyfHxkYXNoYm9hcmR8ZW58MHx8fHwxNzA5MTU0MTEyfDA&ixlib=rb-4.1.0&q=80&w=1080',
        alt: 'Analytics dashboard'
      },
      {
        id: '7-2',
        src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHNlYXJjaHwzfHxkYXNoYm9hcmR8ZW58MHx8fHwxNzA5MTU0MTEyfDA&ixlib=rb-4.1.0&q=80&w=1080',
        alt: 'Order management view'
      }
    ]
  },
  {
    id: '8',
    title: 'Weather Forecast API',
    category: 'fullstack',
    year: '2023',
    slug: 'weather-forecast-api',
    coverImage: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHNlYXJjaHwxfHx3ZWF0aGVyfGVufDB8fHx8MTcwOTE1NDExMnww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'A RESTful API service that aggregates weather data from multiple sources, providing accurate forecasts, historical data, and severe weather alerts for developers to integrate into their applications.',
    highlights: [
      'Multi-source data aggregation',
      'Rate limiting and caching',
      'Webhook notifications',
      'Comprehensive API documentation'
    ],
    techStack: ['Python', 'FastAPI', 'Redis', 'PostgreSQL', 'Docker'],
    liveUrl: 'https://weather-api.app/docs',
    githubUrl: 'https://github.com/K1nkyio/weather-forecast-api',
    images: [
      {
        id: '8-1',
        src: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHNlYXJjaHwyfHx3ZWF0aGVyfGVufDB8fHx8MTcwOTE1NDExMnww&ixlib=rb-4.1.0&q=80&w=1080',
        alt: 'API documentation'
      },
      {
        id: '8-2',
        src: 'https://images.unsplash.com/photo-1561484930-998b6a7b22e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHNlYXJjaHwzfHxjbG91ZHN8ZW58MHx8fHwxNzA5MTU0MTEyfDA&ixlib=rb-4.1.0&q=80&w=1080',
        alt: 'Weather data visualization'
      }
    ]
  },
  {
    id: '9',
    title: 'Task Flow',
    category: 'mobile',
    year: '2024',
    slug: 'task-flow',
    coverImage: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHNlYXJjaHwxfHx0YXNrJTIwbWFuYWdlbWVudHxlbnwwfHx8fDE3MDkxNTQxMTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'A productivity-focused mobile app with Kanban boards, time tracking, team collaboration features, and AI-powered task prioritization to help teams stay organized and meet deadlines.',
    highlights: [
      'Drag-and-drop Kanban boards',
      'AI task prioritization',
      'Team collaboration',
      'Time tracking & reports'
    ],
    techStack: ['React Native', 'TypeScript', 'Firebase', 'OpenAI API'],
    liveUrl: 'https://taskflow.app',
    githubUrl: 'https://github.com/K1nkyio/task-flow',
    images: [
      {
        id: '9-1',
        src: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHNlYXJjaHwyfHxrYW5iYW58ZW58MHx8fHwxNzA5MTU0MTEyfDA&ixlib=rb-4.1.0&q=80&w=1080',
        alt: 'Kanban board view'
      },
      {
        id: '9-2',
        src: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHNlYXJjaHwzfHxwbGFubmluZ3xlbnwwfHx8fDE3MDkxNTQxMTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        alt: 'Task details screen'
      }
    ]
  },
  {
    id: '10',
    title: 'Sentiment Analyzer',
    category: 'ai',
    year: '2023',
    slug: 'sentiment-analyzer',
    coverImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHNlYXJjaHwxfHxzZW50aW1lbnR8ZW58MHx8fHwxNzA5MTU0MTEyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'An NLP-powered tool that analyzes customer feedback, social media posts, and reviews to extract sentiment, emotions, and key topics, helping businesses understand customer opinions at scale.',
    highlights: [
      'Multi-language support',
      'Emotion detection',
      'Topic extraction',
      'Trend analysis dashboard'
    ],
    techStack: ['Python', 'Hugging Face', 'Flask', 'PostgreSQL', 'D3.js'],
    liveUrl: 'https://sentiment-ai.app',
    githubUrl: 'https://github.com/K1nkyio/sentiment-analyzer',
    images: [
      {
        id: '10-1',
        src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHNlYXJjaHwyfHxhbmFseXRpY3N8ZW58MHx8fHwxNzA5MTU0MTEyfDA&ixlib=rb-4.1.0&q=80&w=1080',
        alt: 'Sentiment dashboard'
      },
      {
        id: '10-2',
        src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDA2OTF8MHwxfHNlYXJjaHwzfHxkYXRhfGVufDB8fHx8MTcwOTE1NDExMnww&ixlib=rb-4.1.0&q=80&w=1080',
        alt: 'Topic analysis view'
      }
    ]
  }
];

// Helper function to get project by slug
export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find(project => project.slug === slug);
};

// Helper function to get projects by category
export const getProjectsByCategory = (category: string): Project[] => {
  if (category === 'all') return projects;
  return projects.filter(project => project.category === category);
};

// Helper function to get featured projects (first 4)
export const getFeaturedProjects = (): Project[] => {
  return projects.slice(0, 4);
};

// Helper function to get next/previous project
export const getAdjacentProjects = (currentSlug: string): { prev: Project | null; next: Project | null } => {
  const currentIndex = projects.findIndex(p => p.slug === currentSlug);
  
  return {
    prev: currentIndex > 0 ? projects[currentIndex - 1] : null,
    next: currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null
  };
};
