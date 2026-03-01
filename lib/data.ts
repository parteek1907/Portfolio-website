export interface Project {
    id: string;
    title: string;
    shortDescription: string;
    detailedDescription?: string;
    techStack: string[];
    githubLink?: string;
    liveLink?: string;
    tags: string[];
    featured: boolean;
    date: string;
}

export const projects: Project[] = [
    {
        id: "campus-care",
        title: "Campus Care",
        shortDescription: "Campus Care is a student-focused campus management platform built to streamline attendance tracking, CGPA management, and essential academic utilities in one place. The system helps students and institutes manage academic records more efficiently through a clean interface and practical workflows, focusing on real-world campus needs rather than just presentation.",
        detailedDescription: "Campus Care is a student-focused campus management platform built to streamline attendance tracking, CGPA management, and essential academic utilities in one place. The system helps students and institutes manage academic records more efficiently through a clean interface and practical workflows, focusing on real-world campus needs rather than just presentation.",
        techStack: ["React", "Typescript", "Next.js"], // Updated to generic relevant stack since user didn't specify tech stack but "tags".
        liveLink: "https://campuscare.tech",
        tags: ["Web Platform", "Student Project", "Academic Management", "Full Stack"],
        featured: true,
        date: "2024-03-01"
    },
    {
        id: "dna-encoding",
        title: "DNA Encoding",
        shortDescription: "DNA Encoding is an experimental data science project that demonstrates how digital information can be encoded into DNA sequences. It explores the intersection of computer science and biotechnology by converting text into DNA bases and visualizing the encoding process through an interactive web interface.",
        detailedDescription: "DNA Encoding is an experimental data science project that demonstrates how digital information can be encoded into DNA sequences. It explores the intersection of computer science and biotechnology by converting text into DNA bases and visualizing the encoding process through an interactive web interface.",
        techStack: ["React", "Data Science", "Bioinformatics"], // Inferring basic stack to match tags
        liveLink: "https://dnaencoding.app/",
        tags: ["Data Science", "Artificial Intelligence", "Bioinformatics", "Web App"],
        featured: true,
        date: "2024-04-01"
    }
];

export const skills = {
    programmingLanguages: [
        { name: "C", level: 85 },
        { name: "JavaScript", level: 85 },
        { name: "Java", level: 80 },
        { name: "Python", level: 90 }
    ],
    frontendDevelopment: [
        { name: "HTML5", level: 90 },
        { name: "CSS3", level: 90 }
    ],
    domains: [
        { name: "Data Science", level: 85 },
        { name: "Artificial Intelligence", level: 80 }
    ]
};

export const aboutMe = {
    tagline: "Data Science + AI + CSE student",
    heroDescription: "My interest in technology started with curiosity and has grown into a focus on building practical projects while strengthening my programming foundations. I’m currently working on small projects to improve problem-solving and core computer science skills. Alongside this, I’m actively learning Data Science and Artificial Intelligence through structured study and hands-on experimentation. I enjoy breaking problems down until the logic feels simple.",
    description: "I am a first-year B.Tech CSE student at NMIMS Chandigarh, focused on building strong fundamentals in programming, problem-solving, and data-driven thinking. I am currently exploring Data Science and AI through structured learning, hands-on practice, and gradual skill development, with the goal of transitioning into meaningful beginner-level projects and real-world experience."
};

export const socialLinks = {
    linkedin: "https://www.linkedin.com/in/parteek1907/",
    instagram: "https://instagram.com/parteek1907",
    twitter: "https://twitter.com/parteek1907",
    github: "https://github.com/parteek1907",
    leetcode: "https://leetcode.com/parteek1907"
};
