// Single source of truth. Edit here, the whole site updates.
export const site = {
  name: "Nicholas Maina", // use ONE name everywhere (site, CV, GitHub, LinkedIn)
  role: "Full-Stack Developer",
  focus: "AI & Automation",
  email: "nicholasmaina826@gmail.com",
  phone: "+254742695562",
  location: "Kiambu, Kenya",
  status: "Full-Stack Software Developer | IT Support Specialist",
  github: "https://github.com/K1nkyio",
  linkedin: "https://www.linkedin.com/in/nicholas-mureithi/",
  instagram: "https://www.instagram.com/nklaus0/",
  cv: "/Nicholas_Maina_Resume.pdf", // put the PDF in /public
};

export type Group = "ai" | "platform" | "commerce";
export type Project = {
  slug: string; name: string; group: Group; hue: number; featured?: boolean;
  summary: string; problem: string; highlights: string[]; stack: string[];
  repo?: string; live?: string; image?: string; // image: /public/shots/<slug>.png
};

export const groupLabels: Record<Group | "all", string> = {
  all: "All", ai: "AI & automation", platform: "Platforms", commerce: "Commerce & fintech",
};

export const projects: Project[] = [
  {
    slug: "savvy-wallet", name: "Savvy Wallet", group: "commerce", hue: 222, featured: true,
    summary: "Personal finance that reads your M-Pesa messages so you don't have to log spending by hand.",
    problem: "Mobile-money spending is easy to lose track of when every transaction is just an SMS.",
    highlights: [
      "Parses M-Pesa SMS messages to detect and categorize income and expenses automatically.",
      "Customizable virtual wallets with budget tracking, overspending alerts and savings goals.",
      "JWT-secured analytics dashboards over a PostgreSQL backend.",
    ],
    stack: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL", "JWT"],
    repo: "https://github.com/K1nkyio/Savvy-Wallet",
  },
  {
    slug: "zetechverse", name: "ZetechVerse", group: "platform", hue: 275, featured: true,
    summary: "One campus platform for a blog, marketplace, opportunities board, events and confessions.",
    problem: "Student life is scattered across chats and notice boards, with no single trusted place.",
    highlights: [
      "Five interconnected modules sharing one backend and database schema.",
      "Role-based access control, an admin dashboard and audit logging.",
      "Deployed with a live demo.",
    ],
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "shadcn/ui", "Node.js", "Express", "PostgreSQL", "JWT"],
    repo: "https://github.com/K1nkyio/ZetechVerse", live: "https://zetechverse-user.vercel.app/",
  },
  {
    slug: "chronixx", name: "CHRONIXX", group: "ai", hue: 172, featured: true,
    summary: "A voice-first AI assistant that also controls the desktop, reminders and your calendar.",
    problem: "Chat assistants talk well but can't act on your machine or remember context between sessions.",
    highlights: [
      "Routes requests between the Groq and Gemini APIs.",
      "Bridges cloud AI with local device capabilities for desktop automation.",
      "Persistent memory for context-aware conversations, plus reminders and calendar management.",
    ],
    stack: ["TanStack Start", "Cloudflare Workers", "Groq API", "Gemini API", "Voice interface"],
    repo: "https://github.com/K1nkyio/CHRONIXX",
  },
  {
    slug: "kodi", name: "KODI", group: "platform", hue: 24, featured: true,
    summary: "Rental management that gives landlords units, tenants, payments and maintenance in one dashboard.",
    problem: "Landlords track rent and repairs across notebooks and chats.",
    highlights: [
      "Central dashboard for units, tenants, payments and maintenance requests.",
      "Relational database schema and backend APIs for core property workflows.",
      "Deployed with a live demo.",
    ],
    stack: ["React", "Tailwind CSS", "Express", "PostgreSQL"],
    repo: "https://github.com/K1nkyio/Rental-Management-System", live: "https://rental-management-system-delta-gilt.vercel.app/",
  },
  {
    slug: "rammarts", name: "RAMMARTS", group: "commerce", hue: 8,
    summary: "Hardware store e-commerce with a customer storefront and admin workflows.",
    problem: "A hardware business needs catalogues, stock and orders handled in one system.",
    highlights: [
      "Product catalogues, inventory, carts, wishlists, orders and fulfilment.",
      "Account security and access controls.",
      "M-Pesa Daraja and Pesapal integrations configured for testing; live payments need production credentials.",
    ],
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Node.js", "Express", "PostgreSQL", "Supabase"],
    repo: "https://github.com/K1nkyio/Hardware_Store", live: "https://hardware-store-user.vercel.app/",
  },
  {
    slug: "expert-giggle", name: "Expert Giggle", group: "platform", hue: 330,
    summary: "A multi-portal university management system.",
    problem: "Students, lecturers, finance and the registrar all need different views of the same data.",
    highlights: [
      "Portals for student, lecturer/staff, finance, registrar and academic workflows.",
      "REST APIs and relational workflows with SQL migrations.",
      "JWT authentication, password hashing and server-side role and permission checks.",
    ],
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Node.js", "Express", "PostgreSQL", "Supabase"],
    repo: "https://github.com/K1nkyio/expert-giggle",
  },
  {
    slug: "student-blog", name: "Student Blog", group: "platform", hue: 150,
    summary: "A student community platform in core PHP and MySQL, with posts, a marketplace and an admin side.",
    problem: "Students need one place for posts, events, opportunities and buying and selling, without a heavy framework.",
    highlights: [
      "Registration, login, profiles, posts, comments, reactions, bookmarks and notifications.",
      "Administration for posts, events, opportunities, marketplace listings and SafeSpeak reports.",
      "Marketplace cart with a mock-mode M-Pesa checkout workflow.",
      "Shared security helpers and CSRF protection.",
    ],
    stack: ["Core PHP", "MySQL", "JavaScript", "HTML", "CSS"],
    repo: "https://github.com/K1nkyio/Student_Blog",
  },
  {
    slug: "resume-analyzer", name: "Smart Resume Analyzer", group: "ai", hue: 195,
    summary: "Analyzes a resume against a job and scores the fit.",
    problem: "Job seekers can't see how an ATS or recruiter reads their resume against a role.",
    highlights: [
      "Resume parsing, ATS-oriented analysis, skill matching and weighted job-fit scoring.",
      "GroqCloud API for evaluation, career coaching and resume optimization, with structured response validation.",
      "Multi-job comparison, DOCX/PDF export and automated tests.",
    ],
    stack: ["Python", "Streamlit", "GroqCloud API", "SQLite", "NLP"],
    repo: "https://github.com/K1nkyio/Smart-Resume-Analyzer-Job-Fit-Matcher",
  },
];

export const skills = [
  { group: "Languages", items: ["JavaScript", "TypeScript", "Python", "PHP", "C", "C++", "SQL"] },
  { group: "Frontend", items: ["React", "TanStack Start", "Vite", "Tailwind CSS", "HTML5", "CSS3"] },
  { group: "Backend", items: ["Node.js", "Express", "FastAPI", "REST APIs", "Core PHP"] },
  { group: "Data", items: ["PostgreSQL", "MySQL", "Supabase"] },
  { group: "AI", items: ["Gemini API", "Groq API", "OpenAI API"] },
  { group: "Tools", items: ["Git", "GitHub", "VS Code", "Render", "Vercel", "Android Studio"] },
];

export const security = [
  ["Role-based access control", "Server-side role and permission checks in ZetechVerse and Expert Giggle."],
  ["Authentication", "JWT sessions, bcrypt password hashing and multi-factor authentication."],
  ["Request safety", "CSRF protection on form-based apps."],
  ["Accountability", "Audit logging behind the ZetechVerse admin dashboard."],
];

export const timeline = [
  { when: "2024 to 2025", what: "Diploma in Software Engineering", where: "Zetech University, Mang'u" },
  { when: "Jan to Apr 2026", what: "IT Support Intern (industrial attachment)", where: "Zetech University, Mang'u Campus",
    bullets: [
      "Installed, configured and maintained desktop computers and software for university staff and students.",
      "Diagnosed and resolved hardware and software issues, minimizing downtime across campus workstations.",
      "Provided first-line technical support and documented recurring technical issues.",
      "Assisted with routine system maintenance and IT infrastructure support.",
    ] },
  { when: "2026 to 2028", what: "B.Sc. Computer Science", where: "Zetech University, Mang'u (expected 2028)" },
];

export const coursework = ["Data Structures and Algorithms", "Operating Systems", "Databases", "Computer Networks", "Software Engineering"];
