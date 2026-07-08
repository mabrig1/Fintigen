export const stats = [
  { value: "5,000+", label: "Students Trained" },
  { value: "40+", label: "Courses Available" },
  { value: "3,200+", label: "Certificates Issued" },
  { value: "8,000+", label: "Community Members" },
];

export const coreValues = [
  {
    name: "Excellence",
    description:
      "We hold ourselves and our students to world-class standards in everything we teach and build.",
  },
  {
    name: "Innovation",
    description:
      "We embrace new technologies and creative approaches to learning and problem-solving.",
  },
  {
    name: "Integrity",
    description:
      "We are honest, transparent, and accountable to our students, partners, and community.",
  },
  {
    name: "Impact",
    description:
      "We measure our success by the careers launched and lives transformed across Africa.",
  },
  {
    name: "Lifelong Learning",
    description:
      "We believe learning never stops — we equip students to keep growing throughout their careers.",
  },
];

export interface Course {
  slug: string;
  title: string;
  description: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  price: "Free" | "Premium";
  /** Route to an interactive course player, when the course is live. */
  href?: string;
}

export interface CourseCategory {
  name: string;
  icon: string;
  courses: Course[];
}

export const courseCategories: CourseCategory[] = [
  {
    name: "Technology & Programming",
    icon: "💻",
    courses: [
      {
        slug: "web-development",
        title: "Web Development",
        description:
          "Build modern, responsive websites with HTML, CSS, and JavaScript from the ground up.",
        level: "Beginner",
        duration: "12 weeks",
        price: "Free",
      },
      {
        slug: "mobile-app-development",
        title: "Mobile App Development",
        description:
          "Create Android and iOS apps using modern cross-platform frameworks.",
        level: "Intermediate",
        duration: "14 weeks",
        price: "Premium",
      },
      {
        slug: "python-programming",
        title: "Python Programming",
        description:
          "Master Python fundamentals, automation, and scripting for real-world projects.",
        level: "Beginner",
        duration: "10 weeks",
        price: "Free",
      },
      {
        slug: "javascript",
        title: "JavaScript",
        description:
          "Go deep into the language of the web — from fundamentals to advanced patterns.",
        level: "Beginner",
        duration: "10 weeks",
        price: "Free",
      },
      {
        slug: "nextjs",
        title: "Next.js",
        description:
          "Build production-grade, full-stack React applications with Next.js.",
        level: "Intermediate",
        duration: "8 weeks",
        price: "Premium",
      },
      {
        slug: "nestjs",
        title: "NestJS",
        description:
          "Design scalable server-side applications and APIs with NestJS and TypeScript.",
        level: "Intermediate",
        duration: "8 weeks",
        price: "Premium",
      },
      {
        slug: "software-engineering",
        title: "Software Engineering",
        description:
          "Learn professional engineering practices: version control, testing, architecture, and teamwork.",
        level: "Advanced",
        duration: "16 weeks",
        price: "Premium",
      },
    ],
  },
  {
    name: "Artificial Intelligence",
    icon: "🤖",
    courses: [
      {
        slug: "agentic-ai",
        title: "Agentic AI & Autonomous Agents",
        description:
          "Build and orchestrate AI agents that perform complex tasks independently — beyond simple chatbots. Master LangGraph, AutoGen, and CrewAI.",
        level: "Advanced",
        duration: "8 weeks",
        price: "Free",
        href: "/learn/agentic-ai",
      },
      {
        slug: "generative-ai",
        title: "Generative AI, Prompt Engineering & Enterprise AI Literacy",
        description:
          "Master advanced LLMs, multimodal systems, fine-tuning, and AI governance — from Transformers to enterprise policy.",
        level: "Beginner",
        duration: "8 weeks",
        price: "Free",
        href: "/learn/generative-ai",
      },
      {
        slug: "prompt-engineering",
        title: "Prompt Engineering",
        description:
          "Learn to communicate with AI models effectively and get reliable, high-quality results.",
        level: "Beginner",
        duration: "4 weeks",
        price: "Free",
        href: "/learn/generative-ai",
      },
      {
        slug: "ai-tools",
        title: "AI Tools",
        description:
          "A practical tour of today's most powerful AI tools for work, study, and business.",
        level: "Beginner",
        duration: "6 weeks",
        price: "Free",
      },
      {
        slug: "machine-learning",
        title: "Machine Learning",
        description:
          "Understand and build machine learning models with Python, from regression to neural networks.",
        level: "Advanced",
        duration: "16 weeks",
        price: "Premium",
      },
      {
        slug: "chatgpt-for-productivity",
        title: "ChatGPT for Productivity",
        description:
          "Use AI assistants to write, research, plan, and automate your daily work.",
        level: "Beginner",
        duration: "3 weeks",
        price: "Free",
      },
    ],
  },
  {
    name: "Data & Business",
    icon: "📊",
    courses: [
      {
        slug: "data-analysis",
        title: "Data Analysis",
        description:
          "Turn raw data into insights and decisions with modern analysis workflows.",
        level: "Beginner",
        duration: "10 weeks",
        price: "Premium",
      },
      {
        slug: "excel",
        title: "Excel",
        description:
          "From formulas to pivot tables and dashboards — become the Excel expert on any team.",
        level: "Beginner",
        duration: "6 weeks",
        price: "Free",
      },
      {
        slug: "power-bi",
        title: "Power BI",
        description:
          "Build interactive business dashboards and reports with Microsoft Power BI.",
        level: "Intermediate",
        duration: "8 weeks",
        price: "Premium",
      },
      {
        slug: "data-science",
        title: "Data Science",
        description:
          "Statistics, Python, and machine learning combined into a complete data science path.",
        level: "Advanced",
        duration: "20 weeks",
        price: "Premium",
      },
    ],
  },
  {
    name: "Design",
    icon: "🎨",
    courses: [
      {
        slug: "ui-ux-design",
        title: "UI/UX Design",
        description:
          "Design beautiful, user-centered digital products with Figma and modern design systems.",
        level: "Beginner",
        duration: "12 weeks",
        price: "Premium",
      },
      {
        slug: "graphics-design",
        title: "Graphics Design",
        description:
          "Create stunning visuals, brand identities, and marketing materials.",
        level: "Beginner",
        duration: "10 weeks",
        price: "Premium",
      },
      {
        slug: "video-editing",
        title: "Video Editing",
        description:
          "Edit professional video content for social media, business, and film.",
        level: "Beginner",
        duration: "8 weeks",
        price: "Premium",
      },
    ],
  },
  {
    name: "Digital Business",
    icon: "🚀",
    courses: [
      {
        slug: "digital-marketing",
        title: "Digital Marketing",
        description:
          "Master SEO, paid ads, email marketing, and analytics to grow any business online.",
        level: "Beginner",
        duration: "10 weeks",
        price: "Premium",
      },
      {
        slug: "social-media-management",
        title: "Social Media Management",
        description:
          "Plan, create, and manage social content that builds audiences and drives sales.",
        level: "Beginner",
        duration: "6 weeks",
        price: "Free",
      },
      {
        slug: "freelancing",
        title: "Freelancing",
        description:
          "Win clients on global platforms and build a sustainable freelance career.",
        level: "Beginner",
        duration: "6 weeks",
        price: "Free",
      },
      {
        slug: "e-commerce",
        title: "E-commerce",
        description:
          "Launch and scale an online store — products, payments, logistics, and growth.",
        level: "Intermediate",
        duration: "8 weeks",
        price: "Premium",
      },
    ],
  },
  {
    name: "Career Skills",
    icon: "🧭",
    courses: [
      {
        slug: "cv-writing",
        title: "CV Writing",
        description:
          "Craft a CV that gets past screening systems and impresses recruiters.",
        level: "Beginner",
        duration: "2 weeks",
        price: "Free",
      },
      {
        slug: "interview-preparation",
        title: "Interview Preparation",
        description:
          "Practice technical and behavioral interviews with proven frameworks.",
        level: "Beginner",
        duration: "3 weeks",
        price: "Free",
      },
      {
        slug: "linkedin-optimization",
        title: "LinkedIn Optimization",
        description:
          "Turn your LinkedIn profile into a magnet for recruiters and opportunities.",
        level: "Beginner",
        duration: "2 weeks",
        price: "Free",
      },
      {
        slug: "remote-job-skills",
        title: "Remote Job Skills",
        description:
          "Communication, tools, and habits that make you excel in remote and global teams.",
        level: "Beginner",
        duration: "4 weeks",
        price: "Free",
      },
    ],
  },
];

export const allCourses: Course[] = courseCategories.flatMap(
  (category) => category.courses
);

export interface Instructor {
  name: string;
  role: string;
  bio: string;
  expertise: string[];
  initials: string;
  socials: { label: string; href: string }[];
}

export const instructors: Instructor[] = [
  {
    name: "Kelvin Mabri",
    role: "Founder & Lead Instructor",
    bio: "Software engineer and educator passionate about equipping Africans with world-class technology skills. Leads the engineering and AI tracks at FINTIGEN Academy.",
    expertise: ["Software Engineering", "Next.js", "AI Tools"],
    initials: "KM",
    socials: [
      { label: "LinkedIn", href: "#" },
      { label: "X (Twitter)", href: "#" },
    ],
  },
  {
    name: "Amina Yusuf",
    role: "Data & Analytics Instructor",
    bio: "Data analyst with 8+ years of experience across fintech and telecoms. Teaches Excel, Power BI, and the full data analysis track.",
    expertise: ["Data Analysis", "Power BI", "Excel"],
    initials: "AY",
    socials: [
      { label: "LinkedIn", href: "#" },
      { label: "X (Twitter)", href: "#" },
    ],
  },
  {
    name: "Chidi Okonkwo",
    role: "Design Instructor",
    bio: "Product designer who has shipped apps used by millions. Leads the UI/UX and graphics design courses with a project-first approach.",
    expertise: ["UI/UX Design", "Figma", "Design Systems"],
    initials: "CO",
    socials: [
      { label: "LinkedIn", href: "#" },
      { label: "Dribbble", href: "#" },
    ],
  },
  {
    name: "Fatima Diallo",
    role: "Digital Business Instructor",
    bio: "Digital marketer and entrepreneur helping African businesses grow online. Teaches digital marketing, freelancing, and e-commerce.",
    expertise: ["Digital Marketing", "Freelancing", "E-commerce"],
    initials: "FD",
    socials: [
      { label: "LinkedIn", href: "#" },
      { label: "Instagram", href: "#" },
    ],
  },
];

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "tech-skills-2026",
    title: "The Top 10 Tech Skills Employers Want in 2026",
    excerpt:
      "From AI literacy to cloud engineering, here are the skills that will define hiring across Africa's tech ecosystem this year.",
    category: "Technology Trends",
    date: "2026-06-28",
    readTime: "6 min read",
  },
  {
    slug: "ai-career-guide",
    title: "How to Start an AI Career Without a Computer Science Degree",
    excerpt:
      "A practical roadmap for breaking into artificial intelligence roles using free tools, projects, and community learning.",
    category: "AI",
    date: "2026-06-15",
    readTime: "8 min read",
  },
  {
    slug: "remote-work-africa",
    title: "Landing Remote Jobs from Africa: A Complete Guide",
    excerpt:
      "Everything you need — from payment platforms to time-zone strategies — to work for global companies from anywhere in Africa.",
    category: "Career Advice",
    date: "2026-05-30",
    readTime: "10 min read",
  },
  {
    slug: "freelance-first-client",
    title: "How to Win Your First Freelance Client in 30 Days",
    excerpt:
      "A step-by-step playbook for building a portfolio, pitching, and closing your first paid project as a beginner.",
    category: "Entrepreneurship",
    date: "2026-05-12",
    readTime: "7 min read",
  },
  {
    slug: "digital-opportunities-2026",
    title: "5 Digital Opportunities Every African Youth Should Know About",
    excerpt:
      "The digital economy is creating new paths to income and impact. Here are five you can start exploring today.",
    category: "Digital Opportunities",
    date: "2026-04-25",
    readTime: "5 min read",
  },
  {
    slug: "chatgpt-study-partner",
    title: "Using ChatGPT as Your Personal Study Partner",
    excerpt:
      "Smart prompting techniques that turn AI assistants into tutors, quiz masters, and project reviewers.",
    category: "AI",
    date: "2026-04-10",
    readTime: "6 min read",
  },
];

export interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  highlighted: boolean;
}

export const pricingPlans: PricingPlan[] = [
  {
    name: "Free",
    price: "₦0",
    period: "forever",
    description: "Start learning today with our free course library.",
    features: [
      "Access to all free courses",
      "Community forum access",
      "Course completion badges",
      "Mobile-friendly learning",
    ],
    cta: "Start for Free",
    highlighted: false,
  },
  {
    name: "Premium",
    price: "₦15,000",
    period: "per month",
    description: "Unlock every course, certificate, and career service.",
    features: [
      "Everything in Free",
      "All premium courses",
      "Verified certificates",
      "Assignments & quizzes with feedback",
      "Career Center & job board access",
      "Live classes & mentorship sessions",
      "Downloadable resources",
    ],
    cta: "Go Premium",
    highlighted: true,
  },
  {
    name: "Corporate",
    price: "Custom",
    period: "per team",
    description: "Train your team with tailored programs and reporting.",
    features: [
      "Everything in Premium",
      "Custom learning paths",
      "Team progress dashboards",
      "Dedicated account manager",
      "Onsite or virtual workshops",
      "Bulk certificate verification",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

export const testimonials = [
  {
    name: "Grace A.",
    role: "Frontend Developer, Lagos",
    quote:
      "FINTIGEN Academy took me from zero coding knowledge to my first developer job in nine months. The project-based approach made all the difference.",
  },
  {
    name: "Samuel K.",
    role: "Freelance Data Analyst, Nairobi",
    quote:
      "The Power BI and data analysis courses were incredibly practical. I now serve clients in three countries as a freelance analyst.",
  },
  {
    name: "Zainab M.",
    role: "Product Designer, Abuja",
    quote:
      "The mentorship and community pushed me further than any course alone could. I landed a remote design role two months after finishing the UI/UX track.",
  },
];

export interface JobListing {
  title: string;
  company: string;
  type: "Internship" | "Remote Job" | "Freelance";
  location: string;
  tags: string[];
}

export const jobListings: JobListing[] = [
  {
    title: "Frontend Developer Intern",
    company: "PayBridge Africa",
    type: "Internship",
    location: "Lagos, Nigeria (Hybrid)",
    tags: ["React", "JavaScript", "3 months"],
  },
  {
    title: "Junior Data Analyst",
    company: "SavannaTech",
    type: "Remote Job",
    location: "Remote (Africa-wide)",
    tags: ["Excel", "Power BI", "SQL"],
  },
  {
    title: "Social Media Manager",
    company: "GrowthHive Agency",
    type: "Freelance",
    location: "Remote",
    tags: ["Content", "Analytics", "Part-time"],
  },
  {
    title: "Backend Developer (NestJS)",
    company: "Kola Logistics",
    type: "Remote Job",
    location: "Remote (WAT timezone)",
    tags: ["NestJS", "TypeScript", "PostgreSQL"],
  },
  {
    title: "UI/UX Design Intern",
    company: "Mzizi Studio",
    type: "Internship",
    location: "Nairobi, Kenya",
    tags: ["Figma", "Prototyping", "6 months"],
  },
  {
    title: "Video Editor",
    company: "AfriStream Media",
    type: "Freelance",
    location: "Remote",
    tags: ["Premiere Pro", "Short-form", "Contract"],
  },
];

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Courses", href: "/courses" },
  { label: "Instructors", href: "/instructors" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "Community", href: "/community" },
  { label: "Career Center", href: "/career-center" },
  { label: "Certificates", href: "/certificates" },
  { label: "Contact", href: "/contact" },
];
