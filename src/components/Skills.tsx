import { motion, useReducedMotion } from 'framer-motion';
import {
    Brain,
    Cloud,
    Database,
    Network,
    RefreshCw,
    Server,
    Workflow,
    type LucideIcon,
} from 'lucide-react';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import type { IconType } from 'react-icons';

/* Matter.js is loaded dynamically — see IconPlayground below.
   Type-only import keeps TypeScript happy without pulling the bundle. */
type MatterModule = typeof import('matter-js');

/* ----------------------------- Theme context ---------------------------- */
import { useTheme } from '@/contexts/ThemeToggle';

/* ------------------------- Font Awesome 6 (fa6) ------------------------- */
import { FaAws, FaJava } from 'react-icons/fa6';

/* ------------------------- Font Awesome 5 (fa) -------------------------- */
import {
    FaCode,
    FaCss3Alt,
    FaDatabase,
    FaDocker,
    FaGitAlt,
    FaGithub,
    FaHtml5,
    FaJs,
    FaLinux,
    FaNodeJs,
    FaNpm,
    FaReact,
    FaServer,
    FaTerminal,
} from 'react-icons/fa';

/* --------------------------- Simple Icons (si) -------------------------- */
import {
    SiApachekafka,
    SiApachemaven,
    SiC,
    SiCplusplus,
    SiEclipseide,
    SiExpress,
    SiGeeksforgeeks,
    SiGithubactions,
    SiGnubash,
    SiGradle,
    SiGrafana,
    SiGraphql,
    SiIntellijidea,
    SiJenkins,
    SiJira,
    SiJson,
    SiJsonwebtokens,
    SiKubernetes,
    SiLeetcode,
    SiMongodb,
    SiMysql,
    SiNginx,
    SiPostman,
    SiPrometheus,
    SiPython,
    SiRedis,
    SiRedux,
    SiSelenium,
    SiSocketdotio,
    SiSpring,
    SiSpringboot,
    SiSwagger,
    SiTailwindcss,
    SiTerraform,
    SiThymeleaf,
    SiTypescript,
    SiVite,
} from 'react-icons/si';

/* --------------------- Runtime lookup for tricky icons ------------------ */
import * as ReactIconsSi from 'react-icons/si';

const siLookup = ReactIconsSi as Record<string, IconType | undefined>;

const VisualStudioCode: IconType | null = siLookup.SiVisualstudiocode ?? null;

import { useReveal } from '../hooks/useReveal';
import { DynamoDBIcon, EC2Icon } from './icons/BrandIcons';
import Section from './ui/Section';

/* -------------------------------------------------------------------------- */
/*                    Custom SVGs for removed / missing icons                 */
/* -------------------------------------------------------------------------- */

function OpenAIMark({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
            <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
        </svg>
    );
}

function VSCodeMark({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
            <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z" />
        </svg>
    );
}

/* -------------------------------------------------------------------------- */
/*                        Module-level stable tokens                          */
/* -------------------------------------------------------------------------- */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const GRAVITY_SCALE = 0.0011;
const BODY_RESTITUTION = 0.38;
const BODY_FRICTION = 0.1;
const BODY_FRICTION_AIR = 0.02;
const BODY_DENSITY = 0.0018;

const DARK_FALLBACK = '#E5E7EB';

/* -------------------------------------------------------------------------- */
/*                          Custom cursors (SVG data URLs)                    */
/* -------------------------------------------------------------------------- */

const CUSTOM_CURSOR = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><circle cx='12' cy='12' r='2.5' fill='%236366f1'/><circle cx='12' cy='12' r='8' fill='none' stroke='%236366f1' stroke-width='1.15' opacity='0.55'/><circle cx='12' cy='12' r='11' fill='none' stroke='%236366f1' stroke-width='0.6' opacity='0.22'/></svg>") 12 12, crosshair`;

const CURSOR_CARD = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><path d='M4 3 L4 17.5 L8.2 13.6 L11.2 19.6 L13.2 18.6 L10.2 12.8 L15.4 12.8 Z' fill='%231c1917' stroke='%23fdfbf7' stroke-width='1' stroke-linejoin='round'/><circle cx='4.4' cy='3.4' r='1.9' fill='%23f59e0b'/><circle cx='4.4' cy='3.4' r='0.7' fill='%23fdfbf7'/></svg>") 4 3, pointer`;

/* -------------------------------------------------------------------------- */
/*                          Responsive sizing hooks                           */
/* -------------------------------------------------------------------------- */

interface PlaygroundSize {
    tile: number;
    band: number;
    repulsion: number;
    impulse: number;
}

function getSizeFromWidth(w: number): PlaygroundSize {
    if (w < 640) return { tile: 44, band: 320, repulsion: 100, impulse: 180 };
    if (w < 1024) return { tile: 52, band: 380, repulsion: 118, impulse: 210 };
    return { tile: 56, band: 420, repulsion: 130, impulse: 240 };
}

/**
 * Throttled with requestAnimationFrame so rapid resize drags don't
 * fire dozens of state updates. Only updates when the tile size
 * actually changes (i.e. crossing a breakpoint).
 */
function usePlaygroundSize(): PlaygroundSize {
    const [size, setSize] = useState<PlaygroundSize>(() =>
        typeof window === 'undefined'
            ? { tile: 56, band: 420, repulsion: 130, impulse: 240 }
            : getSizeFromWidth(window.innerWidth),
    );

    useEffect(() => {
        if (typeof window === 'undefined') return;

        let raf = 0;
        const onResize = () => {
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(() => {
                const next = getSizeFromWidth(window.innerWidth);
                setSize((prev) => (prev.tile === next.tile ? prev : next));
            });
        };

        window.addEventListener('resize', onResize, { passive: true });
        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('resize', onResize);
        };
    }, []);

    return size;
}

function useHasHover() {
    const [hasHover, setHasHover] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
            return;
        }
        const query = window.matchMedia('(any-hover: hover)');
        const update = () => setHasHover(query.matches);
        update();
        if (typeof query.addEventListener === 'function') {
            query.addEventListener('change', update);
            return () => query.removeEventListener('change', update);
        }
    }, []);

    return hasHover;
}

/* -------------------------------------------------------------------------- */
/*                              Tech icon data                                */
/* -------------------------------------------------------------------------- */

interface TechIcon {
    name: string;
    icon: IconType;
    color: string;
    darkColor?: string;
}

const TECH_ICONS: TechIcon[] = [
    { name: 'Java', icon: FaJava, color: '#E76F00' },
    { name: 'C', icon: SiC, color: '#A8B9CC' },
    { name: 'C++', icon: SiCplusplus, color: '#00599C' },
    { name: 'Python', icon: SiPython, color: '#3776AB' },
    { name: 'JavaScript', icon: FaJs, color: '#F7DF1E' },
    { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
    { name: 'React.js', icon: FaReact, color: '#61DAFB' },
    { name: 'HTML5', icon: FaHtml5, color: '#E34F26' },
    { name: 'CSS3', icon: FaCss3Alt, color: '#1572B6' },
    { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
    { name: 'Redux', icon: SiRedux, color: '#764ABC' },
    { name: 'Vite', icon: SiVite, color: '#646CFF' },
    { name: 'Spring Boot', icon: SiSpringboot, color: '#6DB33F' },
    { name: 'Spring Security', icon: SiSpring, color: '#6DB33F' },
    { name: 'Node.js', icon: FaNodeJs, color: '#339933' },
    { name: 'Express.js', icon: SiExpress, color: '#000000', darkColor: DARK_FALLBACK },
    { name: 'Thymeleaf', icon: SiThymeleaf, color: '#005F0F', darkColor: '#22C55E' },
    { name: 'REST API', icon: FaServer, color: '#6366F1' },
    { name: 'GraphQL', icon: SiGraphql, color: '#E10098' },
    { name: 'WebSocket', icon: SiSocketdotio, color: '#010101', darkColor: DARK_FALLBACK },
    { name: 'MySQL', icon: SiMysql, color: '#4479A1' },
    { name: 'Redis', icon: SiRedis, color: '#DC382D' },
    { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
    { name: 'DynamoDB', icon: DynamoDBIcon, color: '#4053D6' },
    { name: 'Database', icon: FaDatabase, color: '#6366F1' },
    { name: 'Apache Kafka', icon: SiApachekafka, color: '#231F20', darkColor: '#F59E0B' },
    { name: 'JWT', icon: SiJsonwebtokens, color: '#D63AFF' },
    { name: 'JSON', icon: SiJson, color: '#000000', darkColor: DARK_FALLBACK },
    { name: 'Swagger', icon: SiSwagger, color: '#85EA2D' },
    { name: 'Selenium', icon: SiSelenium, color: '#43B02A' },
    { name: 'AWS', icon: FaAws, color: '#FF9900' },
    { name: 'Amazon EC2', icon: EC2Icon, color: '#FF9900' },
    { name: 'Docker', icon: FaDocker, color: '#2496ED' },
    { name: 'Kubernetes', icon: SiKubernetes, color: '#326CE5' },
    { name: 'Linux', icon: FaLinux, color: '#FCC624' },
    { name: 'Bash', icon: SiGnubash, color: '#4EAA25' },
    { name: 'Nginx', icon: SiNginx, color: '#009639' },
    { name: 'Jenkins', icon: SiJenkins, color: '#D24939' },
    { name: 'GitHub Actions', icon: SiGithubactions, color: '#2088FF' },
    { name: 'Terraform', icon: SiTerraform, color: '#7B42BC' },
    { name: 'Git', icon: FaGitAlt, color: '#F05032' },
    { name: 'GitHub', icon: FaGithub, color: '#181717', darkColor: DARK_FALLBACK },
    { name: 'npm', icon: FaNpm, color: '#CB3837' },
    { name: 'Maven', icon: SiApachemaven, color: '#C71A36' },
    { name: 'Gradle', icon: SiGradle, color: '#02303A', darkColor: '#22C55E' },
    { name: 'Postman', icon: SiPostman, color: '#FF6C37' },
    { name: 'IntelliJ IDEA', icon: SiIntellijidea, color: '#000000', darkColor: DARK_FALLBACK },
    { name: 'VS Code', icon: VisualStudioCode ?? VSCodeMark, color: '#007ACC' },
    { name: 'Eclipse', icon: SiEclipseide, color: '#2C2255', darkColor: '#A78BFA' },
    { name: 'Generative AI', icon: OpenAIMark, color: '#412991', darkColor: '#A78BFA' },
    { name: 'Prometheus', icon: SiPrometheus, color: '#E6522C' },
    { name: 'Grafana', icon: SiGrafana, color: '#F46800' },
    { name: 'LeetCode', icon: SiLeetcode, color: '#FFA116' },
    { name: 'GeeksforGeeks', icon: SiGeeksforgeeks, color: '#2F8D46' },
    { name: 'Jira', icon: SiJira, color: '#0052CC' },
    { name: 'Terminal', icon: FaTerminal, color: '#1C1917', darkColor: DARK_FALLBACK },
    { name: 'Programming', icon: FaCode, color: '#6366F1' },
];

/* -------------------------------------------------------------------------- */
/*                              Competency data                               */
/* -------------------------------------------------------------------------- */

interface CompetencyRow {
    id: string;
    index: string;
    title: string;
    caption: string;
    icon: LucideIcon;
    items: string[];
}

const COMPETENCY_ROWS: CompetencyRow[] = [
    {
        id: 'backend',
        index: '01',
        title: 'Backend Development',
        caption: 'APIs & services',
        icon: Server,
        items: [
            'Java 21',
            'Spring Boot & Spring Security',
            'REST API Design',
            'JWT & BCrypt',
            'Bucket4j & Lombok',
        ],
    },
    {
        id: 'microservices',
        index: '02',
        title: 'Microservices & Architecture',
        caption: 'Distributed systems',
        icon: Network,
        items: [
            'Microservices',
            'Apache Kafka (Producer/Consumer)',
            'Event-Driven Architecture',
            'High-Level (HLD) & Low-Level Design (LLD)',
            'SOLID Principles & OOPS',
        ],
    },
    {
        id: 'databases',
        index: '03',
        title: 'Databases & Caching',
        caption: 'Storage & speed',
        icon: Database,
        items: [
            'MySQL & Spring Data JPA',
            'Redis (Redisson & Lettuce)',
            'Distributed Caching',
            'AWS DynamoDB (NoSQL)',
            'AWS RDS',
        ],
    },
    {
        id: 'cloud',
        index: '04',
        title: 'Cloud & DevOps',
        caption: 'Infrastructure',
        icon: Cloud,
        items: [
            'Amazon Web Services (AWS)',
            'EC2, S3 & Lambda',
            'IAM & VPC',
            'CloudWatch Monitoring',
            'Serverless Functions',
        ],
    },
    {
        id: 'cicd',
        index: '05',
        title: 'CI/CD & Linux',
        caption: 'Ship & operate',
        icon: Workflow,
        items: [
            'CI/CD Pipelines',
            'AWS CodePipeline & CodeDeploy',
            'Git & GitHub',
            'Linux / Operating Systems',
            'Agile Workflow',
        ],
    },
    {
        id: 'frontend-ai',
        index: '06',
        title: 'Frontend & Generative AI',
        caption: 'UI & intelligence',
        icon: Brain,
        items: [
            'React.js & TypeScript',
            'Tailwind CSS & GSAP',
            'HTML5, CSS3 & JavaScript',
            'Chart.js',
            'Generative AI',
        ],
    },
];

/* -------------------------------------------------------------------------- */
/*                               Static fallback                              */
/*  Memoized — only re-renders when theme or tile size changes.               */
/* -------------------------------------------------------------------------- */

interface StaticIconGridProps {
    isDark: boolean;
    tileSize: number;
    iconClass: string;
}

const StaticIconGrid = memo(function StaticIconGrid({
    isDark,
    tileSize,
    iconClass,
}: StaticIconGridProps) {
    return (
        <div className="flex flex-wrap content-start gap-2 p-4 sm:gap-3 sm:p-5 lg:gap-3.5 lg:p-6">
            {TECH_ICONS.map((item) => {
                const Icon = item.icon;
                const c = isDark ? item.darkColor ?? item.color : item.color;
                return (
                    <div
                        key={item.name}
                        title={item.name}
                        aria-label={item.name}
                        role="img"
                        style={{ width: tileSize, height: tileSize }}
                        className={[
                            'flex shrink-0 items-center justify-center rounded-xl sm:rounded-2xl',
                            'border border-stone-200/90 bg-white',
                            'shadow-[0_1px_2px_rgba(15,23,42,0.04),0_4px_12px_-6px_rgba(15,23,42,0.12)]',
                            'dark:border-slate-700/80 dark:bg-slate-950',
                            'dark:shadow-[0_1px_2px_rgba(0,0,0,0.35),0_4px_12px_-6px_rgba(0,0,0,0.55)]',
                        ].join(' ')}
                    >
                        <Icon className={iconClass} style={{ color: c }} />
                    </div>
                );
            })}
        </div>
    );
});

/* -------------------------------------------------------------------------- */
/*                             Icon Playground                                */
/* -------------------------------------------------------------------------- */

interface IconPlaygroundProps {
    visible: boolean;
}

function IconPlayground({ visible }: IconPlaygroundProps) {
    const shouldReduceMotion = useReducedMotion();
    const reduced = shouldReduceMotion ?? false;
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const hasHover = useHasHover();

    const { tile, band, repulsion, impulse } = usePlaygroundSize();
    const tileRadius = tile / 2;

    const iconClass = tile <= 44 ? 'h-5 w-5' : tile <= 52 ? 'h-6 w-6' : 'h-7 w-7';

    const containerRef = useRef<HTMLDivElement>(null);
    const iconRefs = useRef<Array<HTMLDivElement | null>>([]);
    const bodiesRef = useRef<any[]>([]);
    const mouseRef = useRef({ x: 0, y: 0, active: false });
    const engineRef = useRef<any>(null);
    const runnerRef = useRef<any>(null);

    // ---- Viewport gate: Matter.js never loads until this flips true ----
    const [inViewport, setInViewport] = useState(false);
    const [matter, setMatter] = useState<MatterModule | null>(null);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const io = new IntersectionObserver(
            ([entry]) => setInViewport(entry?.isIntersecting ?? false),
            // Start loading 600px before the section appears so the
            // physics engine is ready by the time the user scrolls in.
            { rootMargin: '600px 0px' },
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    // ---- Lazy-load matter-js — biggest bundle win ----
    useEffect(() => {
        if (!inViewport) return;
        if (matter) return;

        let cancelled = false;
        // Dynamic import: matter-js (~50KB gzipped) moves out of the
        // initial bundle and only downloads when the user approaches
        // the Skills section.
        import('matter-js')
            .then((mod) => {
                if (cancelled) return;
                setMatter((mod.default ?? mod) as MatterModule);
            })
            .catch((err) => {
                // eslint-disable-next-line no-console
                console.error('[Skills] Failed to load matter-js:', err);
            });

        return () => {
            cancelled = true;
        };
    }, [inViewport, matter]);

    const reset = useCallback(() => {
        if (reduced || !matter) return;
        const container = containerRef.current;
        if (!container) return;
        const { width } = container.getBoundingClientRect();
        if (width < 50) return;

        const { Body } = matter;
        bodiesRef.current.forEach((body, i) => {
            const x = tileRadius + Math.random() * (width - tileRadius * 2);
            const y = -tileRadius - Math.random() * 400 - i * 26;
            Body.setPosition(body, { x, y });
            Body.setVelocity(body, { x: 0, y: 0 });
            Body.setAngularVelocity(body, 0);
        });
    }, [reduced, matter, tileRadius]);

    // ---- Physics setup — runs once matter is loaded AND near viewport ----
    useEffect(() => {
        if (reduced) return;
        if (!matter) return;
        const container = containerRef.current;
        if (!container) return;

        let raf = 0;
        let cancelled = false;

        const setup = (): (() => void) | undefined => {
            if (cancelled) return;
            const rect = container.getBoundingClientRect();
            const width = rect.width;
            const height = rect.height;
            if (width < 50 || height < 50) {
                raf = requestAnimationFrame(setup);
                return;
            }

            const {
                Engine,
                Runner,
                Bodies,
                Composite,
                Events,
                Body,
            } = matter;

            const engine = Engine.create({
                gravity: { x: 0, y: 1, scale: GRAVITY_SCALE },
                enableSleeping: false,
            });
            engineRef.current = engine;

            const WALL_T = 400;
            const wallOpts = {
                isStatic: true,
                friction: 0.4,
                restitution: 0.05,
            };

            const floor = Bodies.rectangle(
                width / 2,
                height + WALL_T / 2,
                width + 2 * WALL_T,
                WALL_T,
                wallOpts,
            );
            const leftWall = Bodies.rectangle(
                -WALL_T / 2,
                height / 2,
                WALL_T,
                height * 3,
                wallOpts,
            );
            const rightWall = Bodies.rectangle(
                width + WALL_T / 2,
                height / 2,
                WALL_T,
                height * 3,
                wallOpts,
            );
            Composite.add(engine.world, [floor, leftWall, rightWall]);

            const bodies = TECH_ICONS.map((_, i) => {
                const x =
                    tileRadius + Math.random() * Math.max(1, width - tileRadius * 2);
                const y = -tileRadius - Math.random() * 800 - i * 24;
                return Bodies.circle(x, y, tileRadius, {
                    restitution: BODY_RESTITUTION,
                    friction: BODY_FRICTION,
                    frictionAir: BODY_FRICTION_AIR,
                    density: BODY_DENSITY,
                });
            });
            bodiesRef.current = bodies;
            Composite.add(engine.world, bodies);

            const onBeforeUpdate = () => {
                const mouse = mouseRef.current;
                if (!mouse.active) return;
                const r2 = repulsion * repulsion;
                for (const body of bodies) {
                    const dx = body.position.x - mouse.x;
                    const dy = body.position.y - mouse.y;
                    const d2 = dx * dx + dy * dy;
                    if (d2 < 0.25 || d2 > r2) continue;
                    const d = Math.sqrt(d2);
                    const falloff = 1 - d / repulsion;
                    const strength = falloff * falloff * 0.34;
                    const f = strength * body.mass;
                    Body.applyForce(body, body.position, {
                        x: (dx / d) * f,
                        y: (dy / d) * f,
                    });
                }
            };
            Events.on(engine, 'beforeUpdate', onBeforeUpdate);

            const onAfterUpdate = () => {
                for (let i = 0; i < bodies.length; i++) {
                    const el = iconRefs.current[i];
                    if (!el) continue;
                    const p = bodies[i].position;
                    el.style.transform = `translate3d(${p.x - tileRadius}px, ${p.y - tileRadius}px, 0)`;
                }
            };
            Events.on(engine, 'afterUpdate', onAfterUpdate);

            const runner = Runner.create({
                delta: 1000 / 60,
            });
            runner.enabled = false;
            runnerRef.current = runner;
            // Start enabled only if the section is currently visible.
            runner.enabled = inViewport;
            Runner.run(runner, engine);

            const onResize = () => {
                const r = container.getBoundingClientRect();
                Body.setPosition(floor, {
                    x: r.width / 2,
                    y: r.height + WALL_T / 2,
                });
                Body.setPosition(rightWall, {
                    x: r.width + WALL_T / 2,
                    y: r.height / 2,
                });
            };
            const ro = new ResizeObserver(onResize);
            ro.observe(container);

            return () => {
                ro.disconnect();
                Runner.stop(runner);
                Events.off(engine, 'beforeUpdate', onBeforeUpdate);
                Events.off(engine, 'afterUpdate', onAfterUpdate);
                Composite.clear(engine.world, false);
                Engine.clear(engine);
                bodiesRef.current = [];
                engineRef.current = null;
                runnerRef.current = null;
            };
        };

        const cleanup = setup();
        return () => {
            cancelled = true;
            cancelAnimationFrame(raf);
            cleanup?.();
        };
        // `inViewport` is intentionally NOT a dep — we don't want to
        // rebuild the whole physics world when the user scrolls away.
        // The next effect handles pausing.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reduced, matter, tileRadius, repulsion, band]);

    // ---- Pause / resume the physics loop based on viewport ----
    useEffect(() => {
        const runner = runnerRef.current;
        if (!runner) return;
        runner.enabled = inViewport;
    }, [inViewport, matter]);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseRef.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
            active: true,
        };
    }, []);

    const handleMouseLeave = useCallback(() => {
        mouseRef.current.active = false;
    }, []);

    const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
        const t = e.touches[0];
        if (!t) return;
        const rect = e.currentTarget.getBoundingClientRect();
        mouseRef.current = {
            x: t.clientX - rect.left,
            y: t.clientY - rect.top,
            active: true,
        };
    }, []);

    const handleTouchEnd = useCallback(() => {
        mouseRef.current.active = false;
    }, []);

    const handleClick = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            if (reduced || !matter) return;
            const { Body } = matter;
            const rect = e.currentTarget.getBoundingClientRect();
            const cx = e.clientX - rect.left;
            const cy = e.clientY - rect.top;
            const r2 = impulse * impulse;

            for (const body of bodiesRef.current) {
                const dx = body.position.x - cx;
                const dy = body.position.y - cy;
                const d2 = dx * dx + dy * dy;
                if (d2 < 0.25 || d2 > r2) continue;
                const d = Math.sqrt(d2);
                const falloff = 1 - d / impulse;
                const strength = falloff * 2.2;
                Body.setVelocity(body, {
                    x: body.velocity.x + (dx / d) * strength,
                    y: body.velocity.y + (dy / d) * strength,
                });
            }
        },
        [reduced, matter, impulse],
    );

    const iconCount = String(TECH_ICONS.length).padStart(2, '0');

    // Physics mode is active only when matter is loaded and reduced
    // motion is off.
    const physicsActive = !!matter && !reduced;
    const orbsActive = physicsActive && inViewport;

    return (
        <motion.div
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.15, ease: EASE }}
            className="group/playground relative"
        >
            <div
                aria-hidden="true"
                className="h-px w-full bg-gradient-to-r from-transparent via-stone-300 to-transparent dark:via-slate-700"
            />

            <div
                ref={containerRef}
                onMouseMove={physicsActive ? handleMouseMove : undefined}
                onMouseLeave={physicsActive ? handleMouseLeave : undefined}
                onTouchMove={physicsActive ? handleTouchMove : undefined}
                onTouchEnd={physicsActive ? handleTouchEnd : undefined}
                onClick={physicsActive ? handleClick : undefined}
                style={{
                    height: band,
                    cursor:
                        !physicsActive || !hasHover ? 'default' : CUSTOM_CURSOR,
                }}
                className={[
                    'relative w-full overflow-hidden',
                    'select-none',
                    'bg-[#FFFCF8]',
                    'dark:bg-slate-950',
                ].join(' ')}
            >
                <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_20%_20%,rgba(99,102,241,0.10),transparent_55%),radial-gradient(70%_50%_at_90%_85%,rgba(245,158,11,0.10),transparent_55%)] dark:bg-[radial-gradient(80%_60%_at_20%_20%,rgba(99,102,241,0.14),transparent_55%),radial-gradient(70%_50%_at_90%_85%,rgba(245,158,11,0.10),transparent_55%)]" />

                {/* Background orbs — only animate while the section is
                    actually on screen. On page load with Skills far below
                    the fold, these do zero work. */}
                {physicsActive && (
                    <>
                        <motion.div
                            aria-hidden="true"
                            animate={
                                orbsActive
                                    ? {
                                        x: [0, 90, -40, 0],
                                        y: [0, -50, 40, 0],
                                        scale: [1, 1.15, 0.92, 1],
                                    }
                                    : {}
                            }
                            transition={{
                                duration: 24,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                            className="pointer-events-none absolute left-[2%] top-[8%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(closest-side,rgba(99,102,241,0.30),rgba(99,102,241,0.04),transparent)] blur-[80px] dark:bg-[radial-gradient(closest-side,rgba(99,102,241,0.40),rgba(99,102,241,0.06),transparent)]"
                        />

                        <motion.div
                            aria-hidden="true"
                            animate={
                                orbsActive
                                    ? {
                                        x: [0, -80, 50, 0],
                                        y: [0, 50, -30, 0],
                                        scale: [1, 0.94, 1.12, 1],
                                    }
                                    : {}
                            }
                            transition={{
                                duration: 28,
                                repeat: Infinity,
                                ease: 'easeInOut',
                                delay: 1,
                            }}
                            className="pointer-events-none absolute bottom-[5%] right-[2%] h-[480px] w-[480px] rounded-full bg-[radial-gradient(closest-side,rgba(245,158,11,0.26),rgba(245,158,11,0.04),transparent)] blur-[80px] dark:bg-[radial-gradient(closest-side,rgba(245,158,11,0.24),rgba(245,158,11,0.05),transparent)]"
                        />

                        <motion.div
                            aria-hidden="true"
                            animate={
                                orbsActive
                                    ? {
                                        x: [0, 60, -30, 0],
                                        y: [0, -30, 30, 0],
                                        scale: [1, 1.1, 0.95, 1],
                                    }
                                    : {}
                            }
                            transition={{
                                duration: 20,
                                repeat: Infinity,
                                ease: 'easeInOut',
                                delay: 0.5,
                            }}
                            className="pointer-events-none absolute left-[45%] top-[55%] h-[360px] w-[360px] rounded-full bg-[radial-gradient(closest-side,rgba(20,184,166,0.16),transparent)] blur-[70px] dark:bg-[radial-gradient(closest-side,rgba(20,184,166,0.18),transparent)]"
                        />
                    </>
                )}

                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-[0.04] dark:opacity-[0.06]"
                    style={{
                        backgroundImage:
                            'linear-gradient(to right, #1C1917 1px, transparent 1px), linear-gradient(to bottom, #1C1917 1px, transparent 1px)',
                        backgroundSize: '64px 64px',
                        maskImage:
                            'radial-gradient(ellipse at center top, black 45%, transparent 82%)',
                        WebkitMaskImage:
                            'radial-gradient(ellipse at center top, black 45%, transparent 82%)',
                    }}
                />

                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#FFFCF8] to-transparent dark:from-slate-950"
                />

                <div className="pointer-events-none absolute left-3 top-2.5 z-20 flex items-center gap-1.5 font-mono text-[9px] font-medium uppercase tracking-[0.14em] text-stone-500 sm:left-5 sm:top-4 sm:gap-2 sm:text-[10px] sm:tracking-[0.16em] dark:text-slate-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                    <span>tech-stack.yml</span>
                    <span className="hidden h-3 w-px bg-stone-300 sm:inline-block dark:bg-slate-700" />
                    <span className="hidden sm:inline">{iconCount} icons</span>
                </div>

                {physicsActive && hasHover && (
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            reset();
                        }}
                        aria-label="Reset icon positions"
                        className="absolute right-3 top-2.5 z-20 flex h-6 items-center gap-1 rounded-md border border-stone-200 bg-white/80 px-2 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-stone-500 backdrop-blur-md transition-all duration-200 hover:border-amber-300 hover:bg-amber-50/70 hover:text-amber-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFCF8] sm:right-5 sm:top-4 sm:h-7 sm:gap-1.5 sm:px-2.5 sm:text-[9.5px] sm:tracking-[0.14em] dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-400 dark:hover:border-amber-500/40 dark:hover:bg-amber-500/[0.08] dark:hover:text-amber-300 dark:focus-visible:ring-offset-slate-950"
                    >
                        <RefreshCw className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                        reset
                    </button>
                )}

                {physicsActive && hasHover && (
                    <div className="pointer-events-none absolute bottom-2.5 right-3 z-20 flex items-center gap-1.5 font-mono text-[9px] font-medium uppercase tracking-[0.12em] text-stone-400 sm:bottom-4 sm:right-5 sm:text-[9.5px] sm:tracking-[0.14em] dark:text-slate-500">
                        <span className="h-1 w-1 rounded-full bg-amber-500/70" />
                        <span>hover · click · push</span>
                    </div>
                )}

                {/* Static grid shows during idle + loading states.
                    Physics icons only render once matter.js is ready. */}
                {!physicsActive && (
                    <StaticIconGrid
                        isDark={isDark}
                        tileSize={tile}
                        iconClass={iconClass}
                    />
                )}

                {physicsActive &&
                    TECH_ICONS.map((item, i) => {
                        const Icon = item.icon;
                        const c = isDark ? item.darkColor ?? item.color : item.color;
                        return (
                            <div
                                key={item.name}
                                ref={(el) => {
                                    iconRefs.current[i] = el;
                                }}
                                title={item.name}
                                aria-label={item.name}
                                role="img"
                                style={{
                                    width: tile,
                                    height: tile,
                                    transform: 'translate3d(-300px, -300px, 0)',
                                    willChange: 'transform',
                                }}
                                className={[
                                    'pointer-events-none absolute left-0 top-0 flex items-center justify-center rounded-xl sm:rounded-2xl',
                                    'border border-stone-200/90 bg-white',
                                    'shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_1px_2px_rgba(15,23,42,0.04),0_8px_20px_-10px_rgba(15,23,42,0.14)]',
                                    'dark:border-slate-700/80 dark:bg-slate-950',
                                    'dark:shadow-[0_1px_0_rgba(255,255,255,0.03)_inset,0_1px_2px_rgba(0,0,0,0.4),0_8px_20px_-10px_rgba(0,0,0,0.6)]',
                                ].join(' ')}
                            >
                                <Icon className={iconClass} style={{ color: c }} />
                            </div>
                        );
                    })}
            </div>

            <div
                aria-hidden="true"
                className="h-px w-full bg-gradient-to-r from-transparent via-stone-300 to-transparent dark:via-slate-700"
            />
        </motion.div>
    );
}

/* -------------------------------------------------------------------------- */
/*                        Competency row (editorial)                          */
/* -------------------------------------------------------------------------- */

interface CompetencyRowViewProps {
    row: CompetencyRow;
    index: number;
    visible: boolean;
    hasHover: boolean;
}

function CompetencyRowView({
    row,
    index,
    visible,
    hasHover,
}: CompetencyRowViewProps) {
    const shouldReduceMotion = useReducedMotion();
    const Icon = row.icon;

    return (
        <motion.article
            initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{
                duration: 0.5,
                // Cascade starts at 0.3 — walk back to 0.15 since the
                // section already animated in by the time rows appear.
                delay: 0.15 + index * 0.04,
                ease: EASE,
            }}
            style={{ cursor: hasHover ? CURSOR_CARD : 'auto' }}
            className={[
                'group/row relative grid grid-cols-[32px_1fr] gap-x-3 py-5 sm:grid-cols-[64px_1fr] sm:gap-x-8 sm:py-7 lg:py-8',
                'transition-colors duration-300',
                'lg:hover:bg-amber-50/40 lg:dark:hover:bg-amber-500/[0.04]',
            ].join(' ')}
        >
            <div className="relative flex flex-col items-center">
                <span
                    className={[
                        'mt-1 font-mono text-[10px] font-medium tracking-[0.14em] transition-colors duration-300 sm:text-[11px]',
                        'max-lg:text-amber-600 max-lg:dark:text-amber-400',
                        'lg:text-stone-300 lg:group-hover/row:text-amber-500',
                        'lg:dark:text-slate-600 lg:dark:group-hover/row:text-amber-400',
                    ].join(' ')}
                >
                    {row.index}
                </span>

                <span
                    aria-hidden="true"
                    className={[
                        'mt-3 w-px flex-1 rounded-full transition-colors duration-500 sm:mt-4',
                        'bg-stone-200 dark:bg-slate-800',
                        'group-hover/row:bg-amber-300 dark:group-hover/row:bg-amber-500/50',
                    ].join(' ')}
                />
            </div>

            <div className="min-w-0">
                <div className="flex flex-wrap items-start gap-x-6 gap-y-2">
                    <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
                        <span
                            className={[
                                'flex h-7 w-7 shrink-0 items-center justify-center rounded-md transition-colors duration-300 sm:h-8 sm:w-8 sm:rounded-lg',
                                'max-lg:border max-lg:border-amber-200/80 max-lg:bg-amber-50 max-lg:text-amber-600',
                                'max-lg:dark:border-amber-500/25 max-lg:dark:bg-amber-500/[0.10] max-lg:dark:text-amber-400',
                                'lg:border lg:border-stone-200 lg:bg-stone-50 lg:text-stone-500',
                                'lg:dark:border-slate-700 lg:dark:bg-slate-900 lg:dark:text-slate-400',
                                'lg:group-hover/row:border-amber-200 lg:group-hover/row:bg-amber-50 lg:group-hover/row:text-amber-600',
                                'lg:dark:group-hover/row:border-amber-500/30 lg:dark:group-hover/row:bg-amber-500/[0.10] lg:dark:group-hover/row:text-amber-400',
                            ].join(' ')}
                        >
                            <Icon
                                className="h-[13px] w-[13px] sm:h-[15px] sm:w-[15px]"
                                strokeWidth={2.2}
                            />
                        </span>

                        <div className="min-w-0">
                            <h3 className="text-[14.5px] font-semibold leading-[1.2] tracking-[-0.02em] text-stone-900 sm:text-[17px] sm:tracking-[-0.022em] dark:text-white">
                                {row.title}
                            </h3>
                            <p className="mt-0.5 font-mono text-[9px] font-medium uppercase tracking-[0.14em] text-stone-400 sm:mt-1 sm:text-[10px] sm:tracking-[0.16em] dark:text-slate-500">
                                {row.caption}
                            </p>
                        </div>
                    </div>
                </div>

                <div
                    aria-hidden="true"
                    className={[
                        'mt-3.5 h-px w-full bg-gradient-to-r transition-colors duration-500 sm:mt-5',
                        'from-stone-200 via-stone-200 to-transparent',
                        'dark:from-slate-700 dark:via-slate-700 dark:to-transparent',
                        'group-hover/row:from-amber-300/60 group-hover/row:via-amber-200/40',
                        'dark:group-hover/row:from-amber-500/40 dark:group-hover/row:via-amber-500/20',
                    ].join(' ')}
                />

                <ul className="mt-3.5 grid grid-cols-1 gap-x-8 gap-y-1.5 sm:mt-5 sm:grid-cols-2 sm:gap-y-2">
                    {row.items.map((item, i) => (
                        <motion.li
                            key={item}
                            initial={shouldReduceMotion ? false : { opacity: 0, x: -4 }}
                            animate={visible ? { opacity: 1, x: 0 } : {}}
                            transition={{
                                duration: 0.35,
                                delay: 0.25 + index * 0.04 + i * 0.02,
                                ease: EASE,
                            }}
                            className="group/item flex items-start gap-2 sm:gap-2.5"
                        >
                            <span
                                aria-hidden="true"
                                className={[
                                    'mt-[8px] h-1 w-1 shrink-0 rounded-full transition-colors duration-200 sm:mt-[9px]',
                                    'bg-stone-400 dark:bg-slate-600',
                                    'group-hover/item:bg-amber-500 dark:group-hover/item:bg-amber-400',
                                ].join(' ')}
                            />
                            <span
                                className={[
                                    'font-mono text-[11.5px] leading-[1.65] tracking-[-0.002em] transition-colors duration-200 sm:text-[12.5px] sm:leading-[1.7]',
                                    'text-stone-700 dark:text-slate-300',
                                    'group-hover/item:text-stone-900 dark:group-hover/item:text-white',
                                ].join(' ')}
                            >
                                {item}
                            </span>
                        </motion.li>
                    ))}
                </ul>
            </div>
        </motion.article>
    );
}

/* -------------------------------------------------------------------------- */
/*                                   Skills                                   */
/* -------------------------------------------------------------------------- */

export default function Skills() {
    const { ref, visible } = useReveal<HTMLDivElement>({
        threshold: 0.01,
        rootMargin: '0px 0px 200px 0px',
    });
    const shouldReduceMotion = useReducedMotion();
    const hasHover = useHasHover();

    return (
        <Section
            id="skills"
            className="relative isolate overflow-hidden !py-10 lg:!py-14"
        >
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
            >
                <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_20%_20%,rgba(99,102,241,0.10),transparent_55%),radial-gradient(70%_50%_at_90%_85%,rgba(245,158,11,0.10),transparent_55%)] dark:bg-[radial-gradient(80%_60%_at_20%_20%,rgba(99,102,241,0.14),transparent_55%),radial-gradient(70%_50%_at_90%_85%,rgba(245,158,11,0.10),transparent_55%)]" />

                <motion.div
                    animate={
                        visible && !shouldReduceMotion
                            ? {
                                x: [0, 90, -40, 0],
                                y: [0, -50, 40, 0],
                                scale: [1, 1.15, 0.92, 1],
                            }
                            : {}
                    }
                    transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute left-[2%] top-[8%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(closest-side,rgba(99,102,241,0.30),rgba(99,102,241,0.04),transparent)] blur-[80px] dark:bg-[radial-gradient(closest-side,rgba(99,102,241,0.40),rgba(99,102,241,0.06),transparent)]"
                />

                <motion.div
                    animate={
                        visible && !shouldReduceMotion
                            ? {
                                x: [0, -80, 50, 0],
                                y: [0, 50, -30, 0],
                                scale: [1, 0.94, 1.12, 1],
                            }
                            : {}
                    }
                    transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                    className="absolute bottom-[5%] right-[2%] h-[480px] w-[480px] rounded-full bg-[radial-gradient(closest-side,rgba(245,158,11,0.26),rgba(245,158,11,0.04),transparent)] blur-[80px] dark:bg-[radial-gradient(closest-side,rgba(245,158,11,0.24),rgba(245,158,11,0.05),transparent)]"
                />

                <motion.div
                    animate={
                        visible && !shouldReduceMotion
                            ? {
                                x: [0, 60, -30, 0],
                                y: [0, -30, 30, 0],
                                scale: [1, 1.1, 0.95, 1],
                            }
                            : {}
                    }
                    transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                    className="absolute left-[45%] top-[55%] h-[360px] w-[360px] rounded-full bg-[radial-gradient(closest-side,rgba(20,184,166,0.16),transparent)] blur-[70px] dark:bg-[radial-gradient(closest-side,rgba(20,184,166,0.18),transparent)]"
                />

                <div
                    className="absolute inset-0 opacity-[0.04] dark:opacity-[0.06]"
                    style={{
                        backgroundImage:
                            'linear-gradient(to right, #1C1917 1px, transparent 1px), linear-gradient(to bottom, #1C1917 1px, transparent 1px)',
                        backgroundSize: '64px 64px',
                        maskImage:
                            'radial-gradient(ellipse at center top, black 45%, transparent 82%)',
                        WebkitMaskImage:
                            'radial-gradient(ellipse at center top, black 45%, transparent 82%)',
                    }}
                />

                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-[#FFFCF8] dark:to-slate-950" />
                <div className="absolute inset-x-0 top-0 h-px bg-stone-200 dark:bg-white/10" />
            </div>

            <div ref={ref} className="relative">
                <motion.header
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                    animate={visible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="mx-auto max-w-3xl"
                >
                    <div className="flex items-center gap-3">
                        <span className="h-px w-8 bg-stone-300 dark:bg-slate-700" />
                        <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-stone-500 dark:text-slate-500">
                            Skills
                        </span>
                    </div>

                    <h2 className="mt-4 text-[1.55rem] font-semibold leading-[1.15] tracking-[-0.03em] text-stone-900 sm:text-[2rem] lg:text-[2.25rem] dark:text-white">
                        Tools of{' '}
                        <span className="font-serif font-normal italic text-stone-600 dark:text-slate-400">
                            the trade.
                        </span>
                    </h2>

                    <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-stone-600 sm:text-[14.5px] dark:text-slate-400">
                        The languages, frameworks, and platforms I use daily to
                        ship production software.{' '}
                        <span className="text-stone-500 dark:text-slate-500">
                            Move your cursor near the icons — they'll scatter.
                        </span>
                    </p>
                </motion.header>

                <div className="mt-8 sm:mt-10">
                    <IconPlayground visible={visible} />
                </div>

                <motion.div
                    initial={shouldReduceMotion ? false : { opacity: 0 }}
                    animate={visible ? { opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.3, ease: EASE }}
                    className="mt-10 flex items-baseline gap-3 sm:mt-14"
                >
                    <span className="font-mono text-[10.5px] font-medium uppercase tracking-[0.18em] text-stone-400 dark:text-slate-500">
                        Competencies
                    </span>
                    <span className="h-px flex-1 bg-stone-200 dark:bg-slate-800" />
                    <span className="font-mono text-[10.5px] font-medium uppercase tracking-[0.18em] text-stone-400 dark:text-slate-500">
                        06 areas
                    </span>
                </motion.div>

                <div className="mt-2 divide-y divide-stone-200/80 dark:divide-slate-800/80">
                    {COMPETENCY_ROWS.map((row, idx) => (
                        <CompetencyRowView
                            key={row.id}
                            row={row}
                            index={idx}
                            visible={visible}
                            hasHover={hasHover}
                        />
                    ))}
                </div>
            </div>
        </Section>
    );
}