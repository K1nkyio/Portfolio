import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

interface SkillData {
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'mobile' | 'ai';
}

const skillsData: SkillData[] = [
  { name: 'React', level: 95, category: 'frontend' },
  { name: 'TypeScript', level: 90, category: 'frontend' },
  { name: 'Node.js', level: 85, category: 'backend' },
  { name: 'Python', level: 85, category: 'backend' },
  { name: 'Next.js', level: 88, category: 'frontend' },
  { name: 'Machine Learning', level: 75, category: 'ai' },
  { name: 'PostgreSQL', level: 82, category: 'backend' },
  { name: 'Kotlin', level: 80, category: 'mobile' },
];

const categoryColors = {
  frontend: { stroke: '#3b82f6', fill: 'rgba(59, 130, 246, 0.3)' },
  backend: { stroke: '#a855f7', fill: 'rgba(168, 85, 247, 0.3)' },
  mobile: { stroke: '#f97316', fill: 'rgba(249, 115, 22, 0.3)' },
  ai: { stroke: '#22c55e', fill: 'rgba(34, 197, 94, 0.3)' },
};

function SpiderWebChart({ skills, size = 400 }: { skills: SkillData[]; size?: number }) {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  
  const center = size / 2;
  const maxRadius = size * 0.38;
  const levels = 5;
  const angleStep = (2 * Math.PI) / skills.length;

  // Generate points for each skill on the web
  const getPointOnWeb = (index: number, value: number) => {
    const angle = angleStep * index - Math.PI / 2;
    const radius = (value / 100) * maxRadius;
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
    };
  };

  // Generate the skill polygon path
  const skillPath = skills
    .map((skill, i) => {
      const point = getPointOnWeb(i, skill.level);
      return `${i === 0 ? 'M' : 'L'} ${point.x} ${point.y}`;
    })
    .join(' ') + ' Z';

  // Generate web rings
  const webRings = Array.from({ length: levels }, (_, i) => {
    const ringRadius = ((i + 1) / levels) * maxRadius;
    return skills
      .map((_, j) => {
        const angle = angleStep * j - Math.PI / 2;
        return {
          x: center + ringRadius * Math.cos(angle),
          y: center + ringRadius * Math.sin(angle),
        };
      });
  });

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${size} ${size}`}
      className="w-full max-w-lg mx-auto"
      style={{ filter: 'drop-shadow(0 0 20px rgba(0,0,0,0.1))' }}
    >
      {/* Animated background glow */}
      <defs>
        <radialGradient id="webGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.1" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Background circle glow */}
      <motion.circle
        cx={center}
        cy={center}
        r={maxRadius + 20}
        fill="url(#webGlow)"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ duration: 1 }}
      />

      {/* Web rings (concentric polygons) */}
      {webRings.map((ring, ringIndex) => (
        <motion.polygon
          key={`ring-${ringIndex}`}
          points={ring.map(p => `${p.x},${p.y}`).join(' ')}
          fill="none"
          className="stroke-border"
          strokeWidth="1"
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 0.5, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{ duration: 0.6, delay: ringIndex * 0.1 }}
          style={{ transformOrigin: 'center' }}
        />
      ))}

      {/* Web spokes (lines from center to each skill) */}
      {skills.map((_, i) => {
        const angle = angleStep * i - Math.PI / 2;
        const endX = center + maxRadius * Math.cos(angle);
        const endY = center + maxRadius * Math.sin(angle);
        
        return (
          <motion.line
            key={`spoke-${i}`}
            x1={center}
            y1={center}
            x2={endX}
            y2={endY}
            className="stroke-border"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 0.5 } : { pathLength: 0, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.3 + i * 0.05 }}
          />
        );
      })}

      {/* Skill area polygon with gradient fill */}
      <motion.path
        d={skillPath}
        fill="url(#skillGradient)"
        className="stroke-primary"
        strokeWidth="2"
        filter="url(#glow)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 1.5, delay: 0.8, ease: 'easeOut' }}
      />

      {/* Gradient for skill area */}
      <defs>
        <linearGradient id="skillGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.4" />
          <stop offset="50%" stopColor="var(--primary)" stopOpacity="0.2" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.3" />
        </linearGradient>
      </defs>

      {/* Skill points and labels */}
      {skills.map((skill, i) => {
        const point = getPointOnWeb(i, skill.level);
        const labelPoint = getPointOnWeb(i, 115);
        const isHovered = hoveredSkill === skill.name;
        
        return (
          <g key={skill.name}>
            {/* Connection line when hovered */}
            {isHovered && (
              <motion.line
                x1={center}
                y1={center}
                x2={point.x}
                y2={point.y}
                stroke={categoryColors[skill.category].stroke}
                strokeWidth="2"
                strokeDasharray="4 4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />
            )}
            
            {/* Skill point */}
            <motion.circle
              cx={point.x}
              cy={point.y}
              r={isHovered ? 8 : 6}
              fill={categoryColors[skill.category].stroke}
              className="cursor-pointer"
              filter="url(#glow)"
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ duration: 0.4, delay: 1 + i * 0.1, type: 'spring' }}
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
              whileHover={{ scale: 1.3 }}
            />

            {/* Outer ring on hover */}
            {isHovered && (
              <motion.circle
                cx={point.x}
                cy={point.y}
                r={14}
                fill="none"
                stroke={categoryColors[skill.category].stroke}
                strokeWidth="2"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.5 }}
                transition={{ duration: 0.2 }}
              />
            )}

            {/* Skill label */}
            <motion.text
              x={labelPoint.x}
              y={labelPoint.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className={`text-xs font-medium fill-current transition-colors ${
                isHovered ? 'text-foreground' : 'text-muted-foreground'
              }`}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.4, delay: 1.2 + i * 0.05 }}
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
              style={{ cursor: 'pointer' }}
            >
              {skill.name}
            </motion.text>

            {/* Skill level badge on hover */}
            {isHovered && (
              <motion.g
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <rect
                  x={point.x - 20}
                  y={point.y - 35}
                  width="40"
                  height="22"
                  rx="4"
                  fill={categoryColors[skill.category].stroke}
                />
                <text
                  x={point.x}
                  y={point.y - 24}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-xs font-bold fill-white"
                >
                  {skill.level}%
                </text>
              </motion.g>
            )}
          </g>
        );
      })}

      {/* Center decoration */}
      <motion.circle
        cx={center}
        cy={center}
        r={8}
        className="fill-primary"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.5, delay: 0.5, type: 'spring' }}
      />
      <motion.circle
        cx={center}
        cy={center}
        r={4}
        className="fill-background"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.5, delay: 0.6, type: 'spring' }}
      />
    </svg>
  );
}

function CategoryLegend() {
  const categories = [
    { key: 'frontend', label: 'Frontend', color: categoryColors.frontend.stroke },
    { key: 'backend', label: 'Backend', color: categoryColors.backend.stroke },
    { key: 'mobile', label: 'Mobile', color: categoryColors.mobile.stroke },
    { key: 'ai', label: 'AI/ML', color: categoryColors.ai.stroke },
  ];

  return (
    <motion.div 
      className="flex flex-wrap justify-center gap-6 mt-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.5 }}
    >
      {categories.map((cat) => (
        <div key={cat.key} className="flex items-center gap-2">
          <div 
            className="size-3 rounded-full"
            style={{ backgroundColor: cat.color }}
          />
          <span className="text-sm text-muted-foreground">{cat.label}</span>
        </div>
      ))}
    </motion.div>
  );
}

function FloatingSkillPill({ skill, index }: { skill: string; index: number }) {
  return (
    <motion.div
      className="px-4 py-2 rounded-full bg-secondary/80 backdrop-blur-sm border border-border/50 text-sm font-medium text-foreground shadow-lg hover:shadow-xl transition-shadow"
      initial={{ opacity: 0, scale: 0, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.08,
        type: 'spring',
        stiffness: 200
      }}
      whileHover={{ 
        scale: 1.1, 
        y: -5,
      }}
    >
      {skill}
    </motion.div>
  );
}

export function SkillsSection() {
  return (
    <section className="py-24 md:py-32 px-6 lg:px-8 bg-background border-t border-border overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12 space-y-4">
            <motion.h2 
              className="text-4xl md:text-5xl font-light tracking-wide"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Skills & Expertise
            </motion.h2>
            <motion.p 
              className="text-lg text-muted-foreground font-light tracking-wide max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Technologies and tools I use to bring ideas to life
            </motion.p>
          </div>
        </ScrollReveal>

        {/* Spider Web Chart */}
        <div className="relative">
          {/* Decorative background elements */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="size-[500px] rounded-full bg-gradient-radial from-primary/5 to-transparent blur-3xl" />
          </motion.div>
          
          <SpiderWebChart skills={skillsData} size={450} />
          <CategoryLegend />
        </div>

        {/* Additional Skills Cloud */}
        <ScrollReveal>
          <div className="pt-16 mt-16 border-t border-border/50">
            <motion.p 
              className="text-center text-sm text-muted-foreground mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Also experienced with
            </motion.p>
            <div className="flex flex-wrap justify-center gap-3">
              {['Git', 'Docker', 'AWS', 'GraphQL', 'Redux', 'Tailwind CSS', 'Figma', 'CI/CD', 'Firebase', 'REST APIs', 'MongoDB'].map((skill, index) => (
                <FloatingSkillPill key={skill} skill={skill} index={index} />
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
