import { motion } from 'framer-motion';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SpiderWeb3D } from './SpiderWeb3D';

const categoryColors = {
  frontend: '#3b82f6',
  backend: '#a855f7',
  mobile: '#f97316',
  ai: '#22c55e',
};

function CategoryLegend() {
  const categories = [
    { key: 'frontend', label: 'Frontend', color: categoryColors.frontend },
    { key: 'backend', label: 'Backend', color: categoryColors.backend },
    { key: 'mobile', label: 'Mobile', color: categoryColors.mobile },
    { key: 'ai', label: 'AI/ML', color: categoryColors.ai },
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

        {/* 3D Spider Web */}
        <div className="relative">
          <SpiderWeb3D />
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
