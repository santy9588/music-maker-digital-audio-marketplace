export interface PersonalInfo {
  name: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  website: string;
  photo: string;
}

export interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  bullets: string[];
}

export interface EducationEntry {
  id: string;
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
}

export interface ProjectEntry {
  id: string;
  name: string;
  description: string;
  link: string;
}

export interface CertEntry {
  id: string;
  name: string;
  issuer: string;
  date: string;
}

export interface SectionVisibility {
  summary: boolean;
  skills: boolean;
  experience: boolean;
  education: boolean;
  projects: boolean;
  certifications: boolean;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  skills: string[];
  experience: ExperienceEntry[];
  education: EducationEntry[];
  projects: ProjectEntry[];
  certifications: CertEntry[];
  sections: SectionVisibility;
}

export interface ResumeSettings {
  template: string;
  colorTheme: string;
  font: string;
}

export interface SavedResume {
  name: string;
  data: ResumeData;
  settings: ResumeSettings;
  savedAt: string;
}

export const COLOR_THEMES: Record<
  string,
  { primary: string; accent: string; light: string; label: string }
> = {
  professional: {
    primary: "#1e40af",
    accent: "#3b82f6",
    light: "#eff6ff",
    label: "Professional",
  },
  creative: {
    primary: "#5b21b6",
    accent: "#7c3aed",
    light: "#f5f3ff",
    label: "Creative",
  },
  minimal: {
    primary: "#1f2937",
    accent: "#4b5563",
    light: "#f9fafb",
    label: "Minimal",
  },
  fresh: {
    primary: "#065f46",
    accent: "#059669",
    light: "#ecfdf5",
    label: "Fresh",
  },
};

export const TEMPLATES = [
  { id: "modern-tech", label: "Modern Tech", category: "Technical" },
  { id: "software-pro", label: "Software Pro", category: "Technical" },
  { id: "data-analyst", label: "Data Analyst", category: "Technical" },
  { id: "executive", label: "Executive", category: "Non-Technical" },
  { id: "creative-pro", label: "Creative Pro", category: "Non-Technical" },
  { id: "minimal-clean", label: "Minimal Clean", category: "Non-Technical" },
];

export const FONT_OPTIONS = ["Inter", "Georgia", "Roboto", "Playfair Display"];

export const SUGGESTIONS = {
  summary: [
    "Results-driven software engineer with 5+ years building scalable web applications and distributed systems.",
    "Creative marketing professional with expertise in brand strategy, digital campaigns, and data-driven growth.",
    "Detail-oriented data analyst with strong skills in SQL, Python, and translating complex data into actionable insights.",
    "Dynamic sales leader with a proven track record of exceeding quotas and building high-performance teams.",
    "Versatile full-stack developer passionate about clean architecture, open source, and developer experience.",
  ],
  skills: [
    "TypeScript, React, Node.js, PostgreSQL, AWS, Docker",
    "Python, Machine Learning, TensorFlow, Pandas, SQL, Tableau",
    "Salesforce CRM, HubSpot, Lead Generation, Account Management",
    "Google Analytics, SEO, Content Marketing, A/B Testing, Figma",
    "Project Management, Agile/Scrum, JIRA, Stakeholder Communication",
  ],
  experience: [
    "Led cross-functional team of 6 engineers to deliver product 2 weeks ahead of schedule",
    "Increased conversion rate by 35% through A/B testing and UX improvements",
    "Reduced infrastructure costs by $120K annually by migrating to containerized architecture",
    "Grew organic traffic 200% in 12 months through targeted SEO and content strategy",
    "Onboarded and mentored 4 junior engineers, improving team velocity by 25%",
    "Automated reporting pipeline saving 10+ hours/week of manual work",
  ],
};

export const DEFAULT_RESUME_DATA: ResumeData = {
  personalInfo: {
    name: "Alex Johnson",
    jobTitle: "Senior Software Engineer",
    email: "alex.johnson@email.com",
    phone: "+1 (555) 234-5678",
    location: "San Francisco, CA",
    linkedin: "linkedin.com/in/alexjohnson",
    website: "alexjohnson.dev",
    photo: "",
  },
  summary:
    "Experienced software engineer with 7+ years building scalable web applications and microservices. Passionate about clean architecture, distributed systems, and mentoring junior developers.",
  skills: [
    "TypeScript",
    "React",
    "Node.js",
    "PostgreSQL",
    "AWS",
    "Docker",
    "GraphQL",
    "Python",
  ],
  experience: [
    {
      id: "1",
      company: "Tech Corp Inc.",
      role: "Senior Software Engineer",
      startDate: "Jan 2021",
      endDate: "Present",
      bullets: [
        "Led development of microservices architecture serving 2M+ daily active users",
        "Reduced API response time by 40% through query optimization and Redis caching",
        "Mentored a team of 4 junior engineers, conducting weekly code reviews",
      ],
    },
    {
      id: "2",
      company: "StartupXYZ",
      role: "Software Engineer",
      startDate: "Jun 2018",
      endDate: "Dec 2020",
      bullets: [
        "Built real-time analytics dashboard using React and WebSockets",
        "Implemented CI/CD pipeline reducing deployment time by 60%",
      ],
    },
  ],
  education: [
    {
      id: "1",
      institution: "University of California, Berkeley",
      degree: "B.S. Computer Science",
      startDate: "2014",
      endDate: "2018",
    },
  ],
  projects: [
    {
      id: "1",
      name: "OpenSource CLI Tool",
      description:
        "Developer productivity CLI with 2K+ GitHub stars, used by teams at 50+ companies",
      link: "github.com/alexj/cli-tool",
    },
  ],
  certifications: [
    {
      id: "1",
      name: "AWS Solutions Architect – Associate",
      issuer: "Amazon Web Services",
      date: "Mar 2022",
    },
  ],
  sections: {
    summary: true,
    skills: true,
    experience: true,
    education: true,
    projects: true,
    certifications: true,
  },
};

export const DEFAULT_SETTINGS: ResumeSettings = {
  template: "modern-tech",
  colorTheme: "professional",
  font: "Inter",
};
