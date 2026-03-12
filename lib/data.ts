export interface FeaturedProject {
    slug: string;
    title: string;
    description: string;
    detailedDescription: string;
    learned: string;
    tags: string[];
    statChips: string[];
    githubUrl: string;
    gradient: string;
}

export const featuredProjects: FeaturedProject[] = [
    {
        slug: "veralon",
        title: "Veralon",
        description: "A RAG-based credibility intelligence platform that evaluates any claim \u2014 text, URL, PDF, or image \u2014 against up to 30 deduplicated sources using a deterministic 13-step verification pipeline with an 8-component 100-point scoring engine and SHA-256 audit trails.",
        detailedDescription: "Veralon is a full-stack credibility intelligence platform built to combat misinformation at scale. It accepts any claim format \u2014 plain text, URLs, PDFs, or images \u2014 and runs it through a deterministic 13-step verification pipeline. The system retrieves up to 30 deduplicated sources using RAG (Retrieval-Augmented Generation), applies Union-Find clustering to group related evidence, and computes a credibility score using an 8-component 100-point scoring engine. Every verification step is logged with SHA-256 audit trails for full transparency. The architecture uses a maximum of 2 LLM calls per verification to minimize cost and latency while maintaining accuracy. Built with Auth0 for authentication, Express for the API layer, React for the frontend, and Supabase with Row Level Security for data storage.",
        learned: "RAG architecture, deterministic scoring systems, Union-Find clustering, LLM prompt injection sanitization, Supabase RLS, and production full-stack development with Auth0, Express, and React",
        tags: ["Full Stack", "AI / RAG", "TypeScript", "React", "Supabase", "Groq LLM"],
        statChips: ["13-step pipeline", "100-pt scoring engine", "Max 2 LLM calls", "SHA-256 audit trails"],
        githubUrl: "https://github.com/parteek1907/Veralon",
        gradient: "linear-gradient(to right, #f59e0b, #ef4444)"
    },
    {
        slug: "campus-care",
        title: "Campus Care",
        description: "A fully client-side academic management platform built with Vanilla TypeScript \u2014 track attendance, calculate CGPA/SGPA, simulate what-if scenarios, and manage multiple semesters from one dashboard. Auth0-scoped localStorage with auto data migration and Playwright E2E tests.",
        detailedDescription: "Campus Care is a zero-backend academic management platform built entirely with Vanilla TypeScript \u2014 no React, no Vue, no framework overhead. It provides five core features: attendance tracking with percentage calculations, CGPA/SGPA computation across multiple semesters, what-if GPA simulation, jsPDF-powered transcript generation, and a unified dashboard for all academic data. Authentication is handled via Auth0 SPA SDK, with user data scoped to localStorage using Auth0 user IDs. The system includes automatic data migration between schema versions to prevent data loss during updates. The entire application is tested end-to-end with Playwright, covering all user flows from login to transcript export. This project was developed following the full Design Thinking process.",
        learned: "Vanilla TypeScript DOM manipulation without any UI framework, Auth0 SPA integration, localStorage architecture, jsPDF, Playwright E2E testing, and the full Design Thinking process",
        tags: ["Vanilla TypeScript", "Auth0", "Academic Tool", "Playwright", "jsPDF"],
        statChips: ["5 core features", "E2E tested", "No UI framework", "Multi-semester support"],
        githubUrl: "https://github.com/parteek1907/CampusCare",
        gradient: "linear-gradient(to right, #3b82f6, #8b5cf6)"
    },
    {
        slug: "dna-encoding",
        title: "DNA Encoding",
        description: "A full-stack interactive simulator for DNA-based digital data storage \u2014 encode text into nucleotide sequences, configure custom base mappings, decode binary back to text, and visualize a live animated SVG double helix.",
        detailedDescription: "DNA Encoding is a full-stack interactive simulator that demonstrates how digital information can be stored in DNA sequences. The application supports four input types \u2014 plain text, binary, hexadecimal, and custom \u2014 and converts them into nucleotide sequences (A, T, C, G) using configurable base mappings. Users can define their own binary-to-nucleotide mappings, decode sequences back to text, and watch a live animated SVG double helix that visualizes the encoded data in real-time using Framer Motion. The project started as a simple single-page HTML assignment and evolved into a production-grade application with a React + TypeScript frontend, an Express backend, Drizzle ORM for database operations (with an in-memory fallback), TanStack React Query for data fetching, and Zod schemas for input validation across the entire stack.",
        learned: "Full-stack TypeScript with React and Express, Drizzle ORM, animated SVG with Framer Motion, TanStack React Query, and Zod validation",
        tags: ["React", "TypeScript", "Express", "Framer Motion", "Bioinformatics"],
        statChips: ["4 input types", "Live helix viz", "Deterministic encoding", "In-memory fallback"],
        githubUrl: "https://github.com/parteek1907/DNA-Encoding",
        gradient: "linear-gradient(to right, #10b981, #06b6d4)"
    }
];

export const skills = {
    programmingLanguages: [
        { name: "C", levelLabel: "Beginner", iconClass: "devicon-c-plain", iconColor: "#A8B9CC" },
        { name: "JavaScript", levelLabel: "Beginner", iconClass: "devicon-javascript-plain", iconColor: "#F7DF1E" },
        { name: "Java", levelLabel: "Beginner", iconClass: "devicon-java-plain", iconColor: "#ED8B00" },
        { name: "Python", levelLabel: "Beginner", iconClass: "devicon-python-plain", iconColor: "#3776AB" }
    ],
    frontendDevelopment: [
        { name: "HTML5", levelLabel: "Intermediate", iconClass: "devicon-html5-plain", iconColor: "#E34F26" },
        { name: "CSS3", levelLabel: "Intermediate", iconClass: "devicon-css3-plain", iconColor: "#1572B6" }
    ],
    domains: [
        { name: "Data Science", levelLabel: "Beginner", iconClass: "devicon-pandas-plain", iconColor: "#150458" },
        { name: "Artificial Intelligence", levelLabel: "Beginner", iconClass: "devicon-tensorflow-line", iconColor: "#FF6F00" }
    ]
};

export const aboutMe = {
    tagline: "Data Science + AI + CSE student",
    heroDescription: "First-year B.Tech CSE student at NMIMS Chandigarh, building full-stack systems and exploring Data Science and AI. I enjoy breaking problems down until the logic feels simple.",
    description: "I am a first-year B.Tech CSE student at NMIMS Chandigarh, focused on building strong fundamentals in programming, problem-solving, and data-driven thinking. I am currently exploring Data Science and AI through structured learning, hands-on practice, and gradual skill development, with the goal of transitioning into meaningful beginner-level projects and real-world experience."
};

export const socialLinks = {
    linkedin: "https://www.linkedin.com/in/parteek1907/",
    instagram: "https://instagram.com/parteek1907",
    twitter: "https://twitter.com/parteek1907",
    github: "https://github.com/parteek1907",
    leetcode: "https://leetcode.com/parteek1907"
};
