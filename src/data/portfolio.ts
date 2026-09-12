import type { ComponentType } from 'react';
import {
    Award,
    Brain,
    Briefcase,
    Boxes,
    Bug,
    Cloud,
    Code2,
    Database,
    FileCode2,
    GitBranch,
    GraduationCap,
    Layout,
    Network,
    Server,
    Sparkles,
    Star,
    Terminal,
    TestTube2,
    Trophy,
    Workflow,
    Wrench,
    Zap,
} from 'lucide-react';

import { GithubIcon, LinkedinIcon } from '../components/icons/BrandIcons';
import { GeeksforGeeksIcon, LeetCodeIcon } from '@/components/icons/CodingIcons';

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

export interface SocialLink {
    label: string;
    href: string;
    icon: ComponentType<{ className?: string }>;
}

export interface SkillGroup {
    category: string;
    icon: ComponentType<{ className?: string }>;
    items: string[];
    accent: string;
}

export interface Project {
    id: string;
    title: string;
    tagline: string;
    description: string;
    highlights: string[];
    tech: string[];
    liveUrl?: string;
    repoUrl?: string;
    featured?: boolean;
    accent: string;

    /* ---------- new editorial metadata ---------- */
    /** Year(s) the project was built — e.g. "2025" or "2024–2025" */
    year?: string;
    /** My role on the project — e.g. "Solo Developer" */
    role?: string;
    /** Current status of the project */
    status?: 'Active' | 'Production' | 'Complete' | 'In development';
    /** Optional metrics — GitHub stars, LOC, endpoints, etc. */
    metrics?: Array<{ label: string; value: string }>;
}

export interface ExperienceItem {
    role: string;
    company: string;
    location: string;
    start: string;
    end: string;
    highlights: string[];
    tech: string[];
}

export interface EducationItem {
    degree: string;
    institution: string;
    location: string;
    start: string;
    end: string;
    details?: string;
}

export interface Certification {
    title: string;
    issuer: string;
    year: string;
    link?: string;
    verify?: string;
}

export interface AwardItem {
    title: string;
    issuer: string;
    year: string;
    description: string;
}

/* -------------------------------------------------------------------------- */
/*  Personal                                                                  */
/* -------------------------------------------------------------------------- */

export const personal = {
    shortName: 'Subhash',
    name: 'Subhash',
    firstName: 'Subhash',
    role: 'Full Stack Software Engineer',
    tagline:
        'Building production-grade backends with Java 21 & Spring Boot — distributed caching with Redis, event-driven pipelines with Kafka, and secure JWT auth — deployed on AWS.',
    shortBio:
        'Full Stack Software Engineer specialising in Spring Boot microservices, event-driven architecture, and modern React + TypeScript interfaces. AWS Cloud Foundations certified, Kafka-native, and obsessed with clean, testable code.',
    heroPhrases: [
        'shipping production backends in Java 21 + Spring Boot',
        'streaming click events through Kafka at scale',
        'caching hot redirects in Redis — near-zero latency',
        'building React + TypeScript interfaces on top',
        'deploying to AWS with CI/CD on Linux',
    ] as const,
    location: 'Gwalior, India',
    address: '108, Dhabla Gujar, Dist-Mandsaur, Madhya Pradesh',
    email: 'subhashpatidar1733@gmail.com',
    phone: '+91 7693066217',
    availability: 'Available for internships & full-time roles',
    resumeUrl: '/Subhash_Resume.pdf',
    avatarUrl: '/avatar.jpg',
    yearsOfExperience: 'Fresher · 3 flagship projects · Codtech Intern Aug–Sep 2025',
    bio: [
        "I'm a Full Stack Software Engineer (B.Tech CSE, Amity University Madhya Pradesh, CGPA 8.83 — 2023–27) building production-grade systems with Java 21 and Spring Boot. I design scalable REST APIs, distributed caching with Redis (Redisson + Lettuce), and event-driven architectures with Apache Kafka.",
        'My flagship project, **Dishari**, is a Bitly-grade URL shortener handling high-throughput redirects with sub-millisecond latency — Base62 short links, custom aliases, expiry + QR (ZXing), with a Kafka-backed real-time analytics pipeline (MaxMind GeoIP2 + YAUAA) for time-series trends, heatmaps and device breakdowns.',
        'I also built **Musify**, a full-stack music streaming platform with JWT-secured auth, chunked audio uploads to cloud storage, and a Redis-cached playback metadata layer. Ranked #1 on the GeeksforGeeks Coding Leaderboard at Amity (out of 800+ students). AWS Academy Graduate — Cloud Foundations (Credly verified). I care about systems that are readable, observable, and kind to the engineers who come after me.',
    ],
} as const;

/* -------------------------------------------------------------------------- */
/*                                   Socials                                  */
/* -------------------------------------------------------------------------- */

export const socials: SocialLink[] = [
    { label: 'GitHub', href: 'https://github.com/Subhash-Patel-108', icon: GithubIcon },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/subhash-patidar-b358042b7', icon: LinkedinIcon },
    { label: 'GeeksforGeeks', href: 'https://www.geeksforgeeks.org/profile/subhash108?tab=activity', icon: GeeksforGeeksIcon },
];

export const contactInfo = [
    {
        label: 'Email',
        value: 'subhashpatidar1733@gmail.com',
        href: 'mailto:subhashpatidar1733@gmail.com',
        icon: 'Mail' as const,
    },
    {
        label: 'Phone',
        value: '+91 7693066217',
        href: 'tel:+917693066217',
        icon: 'Phone' as const,
    },
    {
        label: 'Location',
        value: 'Gwalior, India',
        href: undefined,
        icon: 'MapPin' as const,
    },
];

/* -------------------------------------------------------------------------- */
/*                                   Skills                                   */
/* -------------------------------------------------------------------------- */

export const skillGroups: SkillGroup[] = [
    {
        category: 'Languages',
        icon: FileCode2,
        accent: 'from-indigo-500 to-purple-600',
        items: ['Java 21', 'TypeScript', 'JavaScript', 'C++', 'C'],
    },
    {
        category: 'Backend & Frameworks',
        icon: Server,
        accent: 'from-violet-500 to-indigo-600',
        items: [
            'Spring Boot',
            'Spring Security',
            'Spring Data JPA',
            'Spring Mail',
            'JWT',
            'Bucket4j',
            'Hibernate',
            'REST API Design',
            'Thymeleaf',
            'Lombok',
        ],
    },
    {
        category: 'Microservices & Messaging',
        icon: Network,
        accent: 'from-cyan-500 to-blue-600',
        items: ['Microservices', 'Apache Kafka', 'Event-Driven Architecture', 'Producer / Consumer', 'Async Processing'],
    },
    {
        category: 'Frontend',
        icon: Layout,
        accent: 'from-sky-500 to-cyan-500',
        items: ['React.js', 'TypeScript', 'Tailwind CSS', 'HTML5', 'CSS3', 'Chart.js', 'GSAP', 'React Router', 'Vite'],
    },
    {
        category: 'Databases & Caching',
        icon: Database,
        accent: 'from-emerald-500 to-teal-500',
        items: ['MySQL', 'Redis (Redisson + Lettuce)', 'Distributed Caching', 'DynamoDB', 'Spring Data JPA'],
    },
    {
        category: 'AWS Cloud',
        icon: Cloud,
        accent: 'from-amber-500 to-orange-500',
        items: [
            'EC2',
            'S3 (Presigned URLs, Versioning)',
            'IAM (Least Privilege)',
            'Lambda',
            'RDS (MySQL)',
            'DynamoDB',
            'VPC',
            'CloudWatch',
            'CodePipeline + CodeDeploy',
            'Billing & Cost Management',
        ],
    },
    {
        category: 'DevOps & CI/CD',
        icon: Workflow,
        accent: 'from-rose-500 to-pink-500',
        items: [
            'CI/CD Pipelines',
            'AWS CodePipeline',
            'CodeDeploy',
            'GitHub Actions',
            'Linux (CLI, SSH, Systemd)',
            'Bash Scripting',
            'Git / GitHub',
        ],
    },
    {
        category: 'AI & GenAI',
        icon: Brain,
        accent: 'from-fuchsia-500 to-purple-600',
        items: ['GenAI', 'LLM Integration', 'Prompt Engineering', 'OpenAI / Gemini APIs', 'RAG Basics', 'Embeddings'],
    },
    {
        category: 'Tools & Libraries',
        icon: Wrench,
        accent: 'from-slate-500 to-slate-700',
        items: [
            'Postman',
            'MaxMind GeoIP2',
            'YAUAA',
            'ZXing QR',
            'Jsoup',
            'Playwright',
            'Apache Commons',
            'Maven',
            'IntelliJ IDEA',
        ],
    },
    {
        category: 'Design & Fundamentals',
        icon: Boxes,
        accent: 'from-teal-500 to-cyan-600',
        items: [
            'Low-Level Design (LLD)',
            'High-Level Design (HLD)',
            'SOLID Principles',
            'OOPs',
            'DBMS',
            'Operating Systems',
            'Computer Networks',
            'Data Structures & Algorithms',
        ],
    },
];

/* -------------------------------------------------------------------------- */
/*                                  Projects                                  */
/*  Musify + Dishari + Enterprise Auth                                        */
/* -------------------------------------------------------------------------- */

export const projects: Project[] = [
    {
        id: 'musify',
        title: 'Musify',
        tagline: 'Full-Stack Music Streaming Platform',
        description:
            'A production-grade music streaming platform with user authentication, playlist management, audio uploads, and streaming endpoints. Built on Spring Boot with JWT-secured REST APIs, cloud object storage for audio files, and Redis caching for high-throughput playback metadata.',
        highlights: [
            'Spring Security + JWT based auth with BCrypt password hashing, role-based access (users / artists / admins), and protected endpoints across the entire API surface.',
            'Chunked audio upload pipeline to cloud object storage — tracks, cover art, and metadata stored separately for CDN-friendly delivery and fast playback start times.',
            'Redis-backed caching layer for playlists, top tracks, and recently played — reduced DB read load on hot endpoints and faster response times on the streaming path.',
            'Clean layered architecture (Controller → Service → Repository) with Spring Data JPA, DTO mapping, Jakarta Bean Validation, and global exception handling.',
        ],
        tech: [
            'Java 17',
            'Spring Boot',
            'Spring Security',
            'JWT',
            'Spring Data JPA',
            'MySQL',
            'Redis',
            'AWS S3',
            'REST APIs',
            'Maven',
            'Lombok',
        ],
        featured: true,
        accent: 'from-fuchsia-500 to-pink-600',
        repoUrl: 'https://github.com/Subhash-Patel-108/musify-backend',
        year: '2025',
        role: 'Solo Developer',
        status: 'Active',
        metrics: [
            { label: 'Domain', value: 'Streaming' },
            { label: 'Focus', value: 'Backend' },
            { label: 'Auth', value: 'JWT + BCrypt' },
        ],
    },
    {
        id: 'dishari',
        title: 'Dishari',
        tagline: 'Full-Stack URL Shortener & Analytics Platform',
        description:
            'A Bitly-grade URL shortening platform with a modern React + TypeScript dashboard on top of a high-throughput Java backend. Supports Base62-encoded short links, custom aliases, link expiry with auto-invalidation, and one-click QR code generation — engineered for sub-millisecond redirects and real-time analytics.',
        highlights: [
            'Redis (Redisson + Lettuce with Commons Pool2) distributed cache for hot URL lookups — near-zero latency on repeat requests, drastically reducing MySQL read load on the hot redirect path.',
            'Apache Kafka event backbone — every redirect emits a click event (timestamp, short code, IP, device, referrer, geo) consumed asynchronously, decoupling the redirect path from analytics writes so peak traffic never blocks the user.',
            'React + TypeScript dashboard with Chart.js — real-time time-series click trends, country heatmaps, OS/browser breakdowns, and referrer source tracking, all powered by a Kafka-backed analytics pipeline (MaxMind GeoIP2 + YAUAA).',
            'Multi-layered security: Spring Security + JWT on the API, Jakarta Bean Validation on all DTOs, Spring Mail transactional notifications, and a clean layered architecture (Controller → Service → Repository) following SOLID.',
        ],
        tech: [
            /* ---------- Backend ---------- */
            'Java 21',
            'Spring Boot',
            'Spring Security',
            'Spring Data JPA',
            'JWT',
            'MySQL',
            'Redis (Redisson + Lettuce)',
            'Apache Kafka',
            'Thymeleaf',
            /* ---------- Frontend ---------- */
            'React.js',
            'TypeScript',
            'Tailwind CSS',
            'Chart.js',
            /* ---------- Libraries & Infra ---------- */
            'ZXing QR',
            'MaxMind GeoIP2',
        ],
        featured: true,
        accent: 'from-indigo-500 to-purple-600',
        repoUrl: 'https://github.com/Subhash-Patel-108',
        year: '2024–2025',
        role: 'Solo Developer',
        status: 'Active',
        metrics: [
            { label: 'Domain', value: 'URL + Analytics' },
            { label: 'Stack', value: 'Full-stack' },
            { label: 'Latency', value: 'Sub-ms' },
        ],
    },
    {
        id: 'auth-platform',
        title: 'Enterprise Auth Platform',
        tagline: 'Full-Stack Authentication System',
        description:
            'A complete full-stack authentication platform covering the entire auth lifecycle — registration, email verification, JWT login, protected routing, forgot-password, and secure reset — replicating patterns used in enterprise SPA applications.',
        highlights: [
            'Production-quality React + TypeScript frontend with full form validation, real-time error feedback, and JWT interceptors that auto-inject the Authorization header on every API call.',
            'Protected routing with React Router guards — unauthenticated users redirected to login; client-side JWT expiry checks with silent token refresh.',
            'Advanced backend security: SHA-256 reset-token hashing, email enumeration prevention (silent 200 on unknown emails), per-email rate limiting via Bucket4j, geo-IP anomaly detection with automated alerts.',
            'TransactionSynchronization-based post-commit email dispatch — no ghost notifications on DB rollback. BCrypt strength-12, OWASP-aligned password storage with @Pattern/@Size validation on all DTOs.',
        ],
        tech: [
            'Java',
            'Spring Boot',
            'Spring Security',
            'JWT',
            'BCrypt',
            'Bucket4j',
            'MySQL',
            'Thymeleaf',
            'React.js',
            'TypeScript',
            'Tailwind CSS',
            'React Router',
        ],
        featured: true,
        accent: 'from-emerald-500 to-teal-600',
        repoUrl: 'https://github.com/Subhash-Patel-108',
        year: '2024',
        role: 'Solo Developer',
        status: 'Complete',
        metrics: [
            { label: 'Domain', value: 'Authentication' },
            { label: 'Stack', value: 'Full-stack' },
            { label: 'Security', value: 'OWASP aligned' },
        ],
    },
];

/* -------------------------------------------------------------------------- */
/*                                 Experience                                 */
/* -------------------------------------------------------------------------- */

export const experience: ExperienceItem[] = [
    {
        role: 'Full Stack Web Development Intern',
        company: 'Codtech IT Solutions Pvt. Ltd.',
        location: 'Remote',
        start: 'Aug 2025',
        end: 'Sep 2025',
        highlights: [
            '6-week intensive Full Stack — end-to-end from UI design to backend API integration and database management on real-world client-facing projects.',
            'Designed and developed a fully responsive multi-section portfolio using HTML5/CSS3/JavaScript — smooth scroll, mobile-first, project showcases, and validated contact form; deployed the static site on AWS S3.',
            'Collaborated in an agile workflow with code reviews and iterative delivery — strengthened clean, maintainable, documented code under professional deadlines.',
        ],
        tech: ['HTML5', 'CSS3', 'JavaScript', 'AWS S3', 'Git', 'Agile'],
    },
];

/* -------------------------------------------------------------------------- */
/*                                 Education                                  */
/* -------------------------------------------------------------------------- */

export const education: EducationItem[] = [
    {
        degree: 'Secondary School Certificate Examination (MPBSE)',
        institution: 'MPBSE',
        location: 'Madhya Pradesh',
        start: '2020',
        end: '2021',
        details: '83%',
    },
    {
        degree: 'Senior School Certificate Examination (MPBSE) — Mathematics',
        institution: 'MPBSE',
        location: 'Madhya Pradesh',
        start: '2022',
        end: '2023',
        details: '86.4%',
    },
    {
        degree: 'B.Tech in Computer Science & Engineering',
        institution: 'Amity University Madhya Pradesh',
        location: 'Gwalior, India',
        start: '2023',
        end: '2027',
        details: 'CGPA 8.83 — Pursuing. Focus: Distributed Systems, Cloud Computing, DSA. Coding community active.',
    },
];

/* -------------------------------------------------------------------------- */
/*                              Awards & Honors                               */
/* -------------------------------------------------------------------------- */

export const awards: AwardItem[] = [
    {
        title: 'First Rank — GeeksforGeeks Coding Leaderboard',
        issuer: 'Amity University',
        year: '2025',
        description: 'Ranked #1 out of 800+ students on the university-wide GeeksforGeeks coding leaderboard.',
    },
];

/* -------------------------------------------------------------------------- */
/*                                Certifications                              */
/* -------------------------------------------------------------------------- */

export const certifications: Certification[] = [
    {
        title: 'AWS Academy Graduate — Cloud Foundations',
        issuer: 'Amazon Web Services',
        year: 'Apr 2026',
        link: 'https://www.credly.com/go/jH1gaVab',
        verify: 'Credly Verified — 20 Hours',
    },
    {
        title: 'JavaScript Algorithms and Data Structures',
        issuer: 'freeCodeCamp',
        year: 'Jun 2025 – Present',
    },
];

/* -------------------------------------------------------------------------- */
/*                                Misc facts                                  */
/* -------------------------------------------------------------------------- */

export const stats = [
    { label: 'GFG Rank at Amity', value: '#1 / 800+', icon: Trophy },
    { label: 'B.Tech CGPA', value: '8.78', icon: GraduationCap },
    { label: 'Flagship Projects', value: '3', icon: Boxes },
    { label: 'AWS Services Used', value: '10+', icon: Cloud },
];

export const quickFacts = [
    { label: 'Education', value: 'B.Tech CSE, Amity • 8.78 CGPA', icon: GraduationCap },
    { label: 'Award', value: '#1 on GFG at Amity (800+)', icon: Award },
    { label: 'Focus', value: 'Java 21 • Spring Boot • AWS', icon: Zap },
    { label: 'Currently', value: 'Open to SDE / Full Stack roles', icon: Sparkles },
];

/* -------------------------------------------------------------------------- */
/*                             Coding Profiles                                */
/* -------------------------------------------------------------------------- */

export const codingProfiles = [
    { label: 'LeetCode', href: 'https://leetcode.com/u/Su_bh_as_h_07', icon: LeetCodeIcon },
    { label: 'GeeksforGeeks', href: 'https://geeksforgeeks.org/profile/subhash108', icon: GeeksforGeeksIcon },
    { label: 'GitHub', href: 'https://github.com/Subhash-Patel-108', icon: GithubIcon },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/subhash-patidar-b358042b7', icon: LinkedinIcon },
];

/* -------------------------------------------------------------------------- */
/*                            Navbar-related extras                           */
/* -------------------------------------------------------------------------- */

export const funFact = {
    label: 'Favorite quote',
    value: 'Simplicity is the ultimate sophistication.',
} as const;

// Back-compat for older imports that expect `skills` object
export const skills = {
    languages: ['Java', 'JavaScript', 'TypeScript', 'C++', 'C'],
    frontend: ['React.js', 'HTML5', 'CSS3', 'Tailwind CSS', 'Chart.js', 'GSAP', 'React Router', 'Vite'],
    backend: [
        'Spring Boot',
        'Spring Security',
        'Spring Data JPA',
        'JWT',
        'Bucket4j',
        'REST API Design',
        'Thymeleaf',
        'Lombok',
        'Microservices',
    ],
    data: ['MySQL', 'Redis (Distributed Caching)', 'RDS', 'DynamoDB'],
    streaming: ['Apache Kafka', 'Event-Driven Architecture'],
    cloud: ['AWS EC2', 'S3', 'IAM', 'Lambda', 'RDS', 'DynamoDB', 'VPC', 'CloudWatch', 'CodePipeline + CodeDeploy', 'Billing'],
    devops: ['CI/CD', 'Linux', 'Git', 'GitHub', 'Postman'],
    ai: ['GenAI', 'LLM Integration', 'Prompt Engineering', 'RAG'],
    tools: ['MaxMind GeoIP2', 'YAUAA', 'ZXing', 'Jsoup', 'Playwright', 'Apache Commons'],
    principles: ['LLD', 'HLD', 'SOLID', 'OOPs', 'DBMS', 'OS', 'CN'],
};