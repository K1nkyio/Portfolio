import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  Code2, 
  Database, 
  Smartphone, 
  Brain, 
  Server, 
  Globe,
  Layers,
  Cpu
} from 'lucide-react';
import { developerInfo } from '@/data/developer';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

interface SkillData {
  name: string;
  level: number;
  icon: React.ElementType;
  category: 'frontend' | 'backend' | 'mobile' | 'ai';
}

const skillsData: SkillData[] = [
  { name: 'React', level: 95, icon: Code2, category: 'frontend' },
  { name: 'TypeScript', level: 90, icon: Code2, category: 'frontend' },
  { name: 'Next.js', level: 88, icon: Globe, category: 'frontend' },
  { name: 'Node.js', level: 85, icon: Server, category: 'backend' },
  { name: 'Python', level: 85, icon: Cpu, category: 'backend' },
  { name: 'Kotlin', level: 80, icon: Smartphone, category: 'mobile' },
  { name: 'PostgreSQL', level: 82, icon: Database, category: 'backend' },
  { name: 'MongoDB', level: 78, icon: Database, category: 'backend' },
  { name: 'Machine Learning', level: 75, icon: Brain, category: 'ai' },
  { name: 'NLP', level: 72, icon: Brain, category: 'ai' },
  { name: 'Firebase', level: 85, icon: Layers, category: 'backend' },
  { name: 'REST APIs', level: 92, icon: Server, category: 'backend' },
];

const categoryColors = {
  frontend: 'from-blue-500 to-cyan-400',
  backend: 'from-purple-500 to-pink-400',
  mobile: 'from-orange-500 to-yellow-400',
  ai: 'from-green-500 to-emerald-400',
};

const categoryLabels = {
  frontend: 'Frontend',
  backend: 'Backend',
  mobile: 'Mobile',
  ai: 'AI/ML',
};

function SkillBar({ skill, index }: { skill: SkillData; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const Icon = skill.icon;

  return (
    <motion.div
      ref={ref}
      className="group relative"
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="flex items-center gap-4 mb-2">
        <motion.div
          className="p-2 rounded-lg bg-secondary/50 group-hover:bg-secondary transition-colors"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 400 }}
        >
          <Icon className="size-5 text-foreground" />
        </motion.div>
        <span className="text-sm font-medium text-foreground flex-1">{skill.name}</span>
        <span className="text-sm text-muted-foreground">{skill.level}%</span>
      </div>
      
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${categoryColors[skill.category]}`}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1, delay: index * 0.1 + 0.3, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  );
}

function FloatingSkillIcon({ skill, index }: { skill: string; index: number }) {
  const getRandomPosition = () => ({
    x: Math.random() * 20 - 10,
    y: Math.random() * 20 - 10,
  });

  return (
    <motion.div
      className="px-4 py-2 rounded-full bg-secondary/80 backdrop-blur-sm border border-border/50 text-sm font-medium text-foreground shadow-lg"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        ...getRandomPosition()
      }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.08,
        type: 'spring',
        stiffness: 200
      }}
      whileHover={{ 
        scale: 1.1, 
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
        y: -5
      }}
    >
      {skill}
    </motion.div>
  );
}

function AnimatedCircle({ category, count }: { category: keyof typeof categoryLabels; count: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const percentage = (count / skillsData.length) * 100;

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center gap-3"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative size-20 md:size-24">
        <svg className="size-full -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            strokeWidth="8"
            className="stroke-secondary"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            strokeWidth="8"
            strokeLinecap="round"
            className={`stroke-current`}
            style={{ 
              color: category === 'frontend' ? '#3b82f6' : 
                     category === 'backend' ? '#a855f7' : 
                     category === 'mobile' ? '#f97316' : '#22c55e' 
            }}
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: percentage / 100 } : { pathLength: 0 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            strokeDasharray="251.2"
            strokeDashoffset="0"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg md:text-xl font-bold text-foreground">{count}</span>
        </div>
      </div>
      <span className="text-sm font-medium text-muted-foreground">{categoryLabels[category]}</span>
    </motion.div>
  );
}

export function SkillsSection() {
  const categoryCounts = {
    frontend: skillsData.filter(s => s.category === 'frontend').length,
    backend: skillsData.filter(s => s.category === 'backend').length,
    mobile: skillsData.filter(s => s.category === 'mobile').length,
    ai: skillsData.filter(s => s.category === 'ai').length,
  };

  return (
    <section className="py-24 md:py-32 px-6 lg:px-8 bg-background border-t border-border overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16 space-y-4">
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

        {/* Category Overview Circles */}
        <motion.div 
          className="flex justify-center gap-8 md:gap-16 mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <AnimatedCircle category="frontend" count={categoryCounts.frontend} />
          <AnimatedCircle category="backend" count={categoryCounts.backend} />
          <AnimatedCircle category="mobile" count={categoryCounts.mobile} />
          <AnimatedCircle category="ai" count={categoryCounts.ai} />
        </motion.div>

        {/* Skills Progress Bars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-16">
          {skillsData.map((skill, index) => (
            <SkillBar key={skill.name} skill={skill} index={index} />
          ))}
        </div>

        {/* Floating Skills Cloud */}
        <ScrollReveal>
          <div className="pt-8 border-t border-border/50">
            <motion.p 
              className="text-center text-sm text-muted-foreground mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Also experienced with
            </motion.p>
            <div className="flex flex-wrap justify-center gap-3">
              {['Git', 'Docker', 'AWS', 'GraphQL', 'Redux', 'Tailwind CSS', 'Figma', 'CI/CD'].map((skill, index) => (
                <FloatingSkillIcon key={skill} skill={skill} index={index} />
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
