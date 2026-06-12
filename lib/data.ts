export interface FeaturedProject {
    slug: string;
    title: string;
    subtitle?: string;
    roleBadge?: string;
    label?: string;
    description: string;
    detailedDescription?: string;
    learned?: string;
    tags: string[];
    statChips?: string[];
    githubUrl?: string;
    liveUrl?: string;
    gradient?: string;
    heroImage?: string;
    screenshots?: string[];
    keyMetrics?: { label: string; value: string }[];
    features?: string[];
    challenges?: string[];
    architectureDiagram?: string;
    timeline?: string;
    year?: string;
    status?: string;
    aspectRatio?: string;
}

export interface Certification {
    id: string;
    title: string;
    issuer: string;
    issuerLogo?: string;
    issueDate: string;
    credentialId: string;
    thumbnail: string;
    fullCertificate: string;
    verificationUrl: string;
    downloadUrl: string;
    skills: string[];
    status: "completed" | "in-progress";
    hours: string;
    aspectRatio?: number;
}

export const certifications: Certification[] = [
    {
        id: "cert-cisco-da",
        title: "Data Analytics Essentials",
        issuer: "Cisco Networking Academy",
        issuerLogo: "/cisco.png",
        issueDate: "May 2026",
        credentialId: "11da5486-64af-41ca-b4bd-ce8f77e1b5eb",
        thumbnail: "/Data_Analytics_Essentials_certificate_gargparteek1907-gmail-com_11da5486-64af-41ca-b4bd-ce8f77e1b5eb.pdf",
        fullCertificate: "/Data_Analytics_Essentials_certificate_gargparteek1907-gmail-com_11da5486-64af-41ca-b4bd-ce8f77e1b5eb.pdf",
        verificationUrl: "https://www.credly.com/badges/9584cbc6-96c9-4e9a-8e73-774a20c6bd82/linked_in_profile",
        downloadUrl: "/Data_Analytics_Essentials_certificate_gargparteek1907-gmail-com_11da5486-64af-41ca-b4bd-ce8f77e1b5eb.pdf",
        skills: ["Data Analysis", "Data Storytelling", "Microsoft Excel", "SQL", "Tableau"],
        status: "completed",
        hours: "30+",
        aspectRatio: 1.476,
    },
    {
        id: "cert-ibm-ml",
        title: "Machine Learning for Data Science Projects",
        issuer: "IBM",
        issuerLogo: "/ibm.svg",
        issueDate: "May 2026",
        credentialId: "e4d3f434-b6a8-4095-a040-ac043512205c",
        thumbnail: "/IBMDesign20260515-31-yjg1lj.pdf",
        fullCertificate: "/IBMDesign20260515-31-yjg1lj.pdf",
        verificationUrl: "https://www.credly.com/badges/e4d3f434-b6a8-4095-a040-ac043512205c/linked_in_profile",
        downloadUrl: "/IBMDesign20260515-31-yjg1lj.pdf",
        skills: ["AI Automation", "AI-on-AI", "AutoAI", "Data Modeling", "Hyperparameter Optimization"],
        status: "completed",
        hours: "20+",
        aspectRatio: 1.2941,
    },
    {
        id: "cert-oracle-ai",
        title: "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate",
        issuer: "Oracle",
        issuerLogo: "/oracle.png",
        issueDate: "Feb 2026",
        credentialId: "325937189OCI25AICFA",
        thumbnail: "/Oracle%20Cloud%20AI%20Infrastructure%202025.pdf",
        fullCertificate: "/Oracle%20Cloud%20AI%20Infrastructure%202025.pdf",
        verificationUrl: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=DD2A6A6E953EDEA81C3A6DE2A10D856A950EC27FA84214BF145BF92256731147",
        downloadUrl: "/Oracle%20Cloud%20AI%20Infrastructure%202025.pdf",
        skills: ["Artificial Intelligence", "Machine Learning", "Generative AI", "OCI Services", "AI Strategy"],
        status: "completed",
        hours: "6+",
        aspectRatio: 1.2941,
    },
    {
        id: "cert-oracle-fnd",
        title: "Oracle Cloud Infrastructure 2025 Certified Foundations Associate",
        issuer: "Oracle",
        issuerLogo: "/oracle.png",
        issueDate: "Feb 2026",
        credentialId: "325937189OCI25FNDCFA",
        thumbnail: "/Oracle%20Cloud%20Infrastructure%202025.pdf",
        fullCertificate: "/Oracle%20Cloud%20Infrastructure%202025.pdf",
        verificationUrl: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=0A360055C1CBBB554340D69F4060B82C78299BD85372ACA17EA33216827DDA80",
        downloadUrl: "/Oracle%20Cloud%20Infrastructure%202025.pdf",
        skills: ["Cloud Computing", "IAM", "Networking", "Compute & Storage", "OCI Security"],
        status: "completed",
        hours: "6+",
        aspectRatio: 1.2941,
    },
    {
        id: "cert-simplilearn-genai",
        title: "Introduction to Generative AI",
        issuer: "Simplilearn",
        issuerLogo: "/simplilearn.jpeg",
        issueDate: "Feb 2026",
        credentialId: "9845280",
        thumbnail: "/Introduction%20To%20Generative%20AI.pdf",
        fullCertificate: "/Introduction%20To%20Generative%20AI.pdf",
        verificationUrl: "https://drive.google.com/file/d/1IBTzew8_IHq2MejshQd8smIBl8WXeemV/view",
        downloadUrl: "/Introduction%20To%20Generative%20AI.pdf",
        skills: ["Prompt Engineering", "Large Language Models", "Generative AI", "ChatGPT", "AI Tools"],
        status: "completed",
        hours: "1",
    },
];

export const featuredProjects: FeaturedProject[] = [
    {
        slug: "greentrace",
        title: "GreenTrace",
        subtitle: "Environmental Intelligence Platform",
        description: "A premium, high-end platform that transforms personal carbon tracking into an interactive, beautifully crafted digital experience.",
        detailedDescription: "GreenTrace is a next-generation personal sustainability tracker that positions environmental intelligence as a premium, highly crafted experience—drawing inspiration from Apple and Arc Browser. The platform relies on three core pillars: The Intelligence Dashboard (a robust, Recharts-powered analytics suite tracking real-world emissions), The Carbon Twin Simulator (a predictive engine modeling future impact of lifestyle changes instantly), and The Carbon Signature (a generative, WebGL-inspired shareable digital artifact). It features architectural dual-state routing, where desktop users get a robust sidebar-driven analytics app, and mobile users receive an exclusive, scroll-driven storytelling experience.",
        learned: "Architecting dual-state mobile/desktop viewports, managing heavy client-side state with Context API for instant simulation updates, building animated data visualizations with Recharts, and orchestrating complex Framer Motion entrance choreographies.",
        tags: ["Next.js", "TypeScript", "TailwindCSS", "Framer Motion", "Supabase", "Recharts"],
        statChips: ["Carbon Twin Simulator", "Generative Signature", "Dual-State Routing"],
        githubUrl: "https://github.com/parteek1907/GreenTrace",
        heroImage: "/GreenTrace/LandingPage.png",
        screenshots: [
            "/GreenTrace/LandingPage.png",
            "/GreenTrace/Methodology.png",
            "/GreenTrace/Dashboard.png",
            "/GreenTrace/CarbonTwin.png",
            "/GreenTrace/Recommendation.png",
            "/GreenTrace/CarbonSignature.png"
        ],
        keyMetrics: [
            { label: "Core Engines", value: "3" },
            { label: "Animations", value: "60 FPS" },
            { label: "State Sync", value: "Real-time" }
        ],
        features: [
            "Carbon Twin Simulator: An isolated prediction engine for future lifestyle changes.",
            "The Intelligence Dashboard: Recharts-powered analytics for real-world emissions.",
            "The Carbon Signature: A generative, shareable digital artifact of your sustainability journey.",
            "Architectural Dual-State Routing: Completely custom curated mobile experience vs robust desktop application.",
            "Animated Micro-Interactions: Soft entrance choreographies, particle systems, and staggered reveals via Framer Motion."
        ],
        challenges: [
            "Architecting a completely custom mobile viewport strategy without duplicating heavy logic.",
            "Ensuring heavy client-side state (CarbonContext) instantly re-renders across the component tree without layout shifts.",
            "Optimizing complex Framer Motion and Recharts SVGs to maintain a buttery-smooth 60fps."
        ],
        architectureDiagram: "/GreenTrace/SystemArchitecture.png",
        timeline: "2 Weeks",
        year: "June 2026",
        status: "Production"
    },
    {
        slug: "lumiere",
        label: "HACKATHON PROJECT · Team Lead",
        title: "Lumiere",
        subtitle: "Hack-O-Mania 2.0 · Team Lead",
        description: "An AI-powered patient identity resolution system that detects and prevents duplicate medical records in real time using hybrid matching, confidence-based scoring, and a human-in-the-loop review pipeline — built in a hackathon environment with privacy-first architecture.",
        detailedDescription: "Lumiere is an AI-powered patient identity resolution system designed to detect and prevent duplicate medical records in real time. Built during Hack-O-Mania 2.0 by a team of 5, the system uses hybrid matching algorithms combining deterministic and probabilistic approaches, confidence-based scoring for match quality assessment, and a human-in-the-loop review pipeline for edge cases. The architecture prioritizes privacy-first design with multi-stage verification to ensure accurate patient identity resolution while maintaining data security.",
        learned: "Healthcare identity resolution, privacy-preserving AI workflows, human-in-the-loop system design, confidence-scoring pipelines, and leading architecture and product direction under hackathon constraints",
        tags: ["Next.js", "React", "FastAPI", "PostgreSQL", "Python", "TailwindCSS", "AI/ML"],
        statChips: ["Real-time detection", "Confidence scoring", "Hybrid matching", "Human-in-the-loop", "Multi-stage verification", "Privacy-first AI"],
        githubUrl: "https://github.com/parteek1907/lumiere",
        gradient: "linear-gradient(to right, #a855f7, #ec4899)",
        screenshots: [
            "/Lumiere/LandingPage.png",
            "/Lumiere/Methodology.png",
            "/Lumiere/Dashboard.png",
            "/Lumiere/Records.png",
            "/Lumiere/Performance.png"
        ],
        liveUrl: "#",
        keyMetrics: [
            { label: "Matches Detected", value: "99.9%" },
            { label: "Latency", value: "< 50ms" },
            { label: "Records Processed", value: "100k+" }
        ],
        features: [
            "Hybrid Matching Engine (Deterministic + Probabilistic)",
            "Real-time Confidence Scoring Pipeline",
            "Human-in-the-loop Review Dashboard",
            "Privacy-first Patient Identity Resolution",
            "Multi-stage Verification Workflows"
        ],
        challenges: [
            "Designing a privacy-preserving architecture within hackathon constraints.",
            "Balancing probabilistic matching speed with deterministic accuracy.",
            "Handling edge cases like twins or individuals with identical names and birthdates."
        ],
        architectureDiagram: "/Lumiere/SystemArchitecture.png",
        timeline: "30 Hours",
        year: "10-11 April 2026",
        status: "Completed"
    },
    {
        slug: "veralon",
        title: "Veralon",
        description: "A RAG-based credibility intelligence platform that evaluates any claim \u2014 text, URL, PDF, or image \u2014 against up to 30 deduplicated sources using a deterministic 13-step verification pipeline with an 8-component 100-point scoring engine and SHA-256 audit trails.",
        detailedDescription: "Veralon is a full-stack credibility intelligence platform built to combat misinformation at scale. It accepts any claim format \u2014 plain text, URLs, PDFs, or images \u2014 and runs it through a deterministic 13-step verification pipeline. The system retrieves up to 30 deduplicated sources using RAG (Retrieval-Augmented Generation), applies Union-Find clustering to group related evidence, and computes a credibility score using an 8-component 100-point scoring engine. Every verification step is logged with SHA-256 audit trails for full transparency. The architecture uses a maximum of 2 LLM calls per verification to minimize cost and latency while maintaining accuracy. Built with Auth0 for authentication, Express for the API layer, React for the frontend, and Supabase with Row Level Security for data storage.",
        learned: "RAG architecture, deterministic scoring systems, Union-Find clustering, LLM prompt injection sanitization, Supabase RLS, and production full-stack development with Auth0, Express, and React",
        tags: ["Full Stack", "AI / RAG", "TypeScript", "React", "Supabase", "Groq LLM"],
        statChips: ["13-step pipeline", "100-pt scoring engine", "Max 2 LLM calls", "SHA-256 audit trails"],
        githubUrl: "https://github.com/parteek1907/Veralon",
        gradient: "linear-gradient(to right, #f59e0b, #ef4444)",
        heroImage: "/placeholder-project.svg",
        screenshots: [
            "/Veralon/LandingPage.png",
            "/Veralon/Methodology.png",
            "/Veralon/ScoreBreakDown.png",
            "/Veralon/ScoreCompare.png"
        ],
        liveUrl: "#",
        keyMetrics: [
            { label: "Sources Evaluated", value: "30+" },
            { label: "Pipeline Steps", value: "13" },
            { label: "LLM Calls/Query", value: "Max 2" }
        ],
        features: [
            "Accepts Text, URLs, PDFs, and Images",
            "RAG-based Source Retrieval & Deduplication",
            "Union-Find Clustering for Evidence Grouping",
            "Deterministic 100-Point Scoring Engine",
            "Cryptographic SHA-256 Audit Trails"
        ],
        challenges: [
            "Minimizing LLM hallucination in evidence synthesis.",
            "Reducing LLM inference costs while processing 30+ sources.",
            "Structuring complex unstructured text from diverse URL targets."
        ],
        architectureDiagram: "/Veralon/SystemArchitecture.png",
        timeline: "4 Weeks",
        year: "Feb - March 2026",
        status: "Completed"
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
        gradient: "linear-gradient(to right, #3b82f6, #8b5cf6)",
        heroImage: "/placeholder-project.svg",
        screenshots: [
            "/CampusCare/LandingPage.png",
            "/CampusCare/Methodology.png",
            "/CampusCare/Dashboard.png",
            "/CampusCare/SubjectReport.png",
            "/CampusCare/TimeTable.png",
            "/CampusCare/Subjects.png",
            "/CampusCare/Attendance.png",
            "/CampusCare/CgpaCalc.png"
        ],
        liveUrl: "#",
        keyMetrics: [
            { label: "Backend Dependency", value: "0" },
            { label: "Test Coverage", value: "High" },
            { label: "Schema Migrations", value: "Auto" }
        ],
        features: [
            "Vanilla TypeScript Architecture without Frameworks",
            "Auth0 SPA Integration with Scoped Storage",
            "CGPA/SGPA Computation & What-If Scenarios",
            "jsPDF Transcript Generation",
            "Automated localStorage Data Migrations"
        ],
        challenges: [
            "Managing complex global state entirely in Vanilla TS.",
            "Ensuring zero data loss across version schema upgrades.",
            "Building a reliable E2E test suite without a modern React virtual DOM."
        ],
        architectureDiagram: "/CampusCare/SystemArchitecture.png",
        timeline: "4 Months",
        year: "Jan - April 2026",
        status: "Completed"
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
        gradient: "linear-gradient(to right, #10b981, #06b6d4)",
        heroImage: "/placeholder-project.svg",
        screenshots: [
            "/DnaEncoding/Dashboard.png"
        ],
        liveUrl: "#",
        keyMetrics: [
            { label: "Input Modalities", value: "4" },
            { label: "Base Mappings", value: "Dynamic" },
            { label: "Animation Engine", value: "Framer" }
        ],
        features: [
            "Text, Binary, Hex, and Custom DNA Encoding",
            "Configurable Binary-to-Nucleotide Mappings",
            "Live Interactive SVG Double Helix Animation",
            "React + Express + Drizzle ORM Stack",
            "Strict Type Safety with Zod & TRPC patterns"
        ],
        challenges: [
            "Synchronizing complex state between encoding inputs and the live SVG visualization.",
            "Building a robust in-memory database fallback when PostgreSQL isn't available.",
            "Ensuring highly performant 60FPS animations in React for long DNA strands."
        ],
        architectureDiagram: "/DnaEncoding/SystemArchitecture.png",
        timeline: "1 Week",
        year: "Feb 2026",
        status: "Completed"
    }
];

export const expertise = [
    {
        area: "Programming Languages",
        technologies: ["Python", "Java", "TypeScript", "C"]
    },
    {
        area: "Frontend",
        technologies: ["React.js", "HTML5", "CSS3", "Tailwind CSS", "Framer Motion"]
    },
    {
        area: "Backend & Tools",
        technologies: ["Node.js", "Git", "GitHub", "VS Code"]
    },
    {
        area: "Databases",
        technologies: ["Supabase (PostgreSQL)", "localStorage"]
    },
    {
        area: "AI / Data Science",
        technologies: ["Groq LLM", "RAG Architecture", "Data Science (learning)"]
    },
    {
        area: "Domains",
        technologies: ["Full Stack Web", "Bioinformatics", "Academic Tools"]
    }
];

export const aboutMe = {
    tagline: "Architecting Intelligence & Full-Stack Systems",
    heroDescription: "Computer Science student exploring software engineering, data science, and AI through hands-on projects, continuous learning, and thoughtful problem-solving.",
    description: "I am a B.Tech CSE student at NMIMS Chandigarh, focused on building strong fundamentals in programming, problem-solving, and data-driven architecture. I am currently exploring Data Science and AI through structured learning and hands-on practice, with the goal of transitioning into scalable, data-driven applications and impactful real-world engineering."
};

export const socialLinks = {
    linkedin: "https://www.linkedin.com/in/parteek1907/",
    instagram: "https://instagram.com/parteek1907",
    twitter: "https://twitter.com/parteek1907",
    github: "https://github.com/parteek1907",
    leetcode: "https://leetcode.com/parteek1907"
};
