import { motion } from 'framer-motion';
import { lazy, Suspense } from 'react';
import { developerInfo } from '@/data/developer';
import { getFeaturedProjects } from '@/data/projects';
import { ProjectCard } from '@/components/portfolio/ProjectCard';
import { ScrollIndicator } from '@/components/ui/ScrollIndicator';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SEOHead } from '@/components/seo/SEOHead';
import { DownloadResumeButton } from '@/components/ui/DownloadResumeButton';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import portraitImage from '@/assets/portrait.jpg';

const LazySkillsSection = lazy(() =>
  import('@/components/skills/SkillsSection').then((mod) => ({ default: mod.SkillsSection }))
);
const LazyTestimonialsSection = lazy(() =>
  import('@/components/testimonials/TestimonialsSection').then((mod) => ({ default: mod.TestimonialsSection }))
);
const LazyGallerySection = lazy(() =>
  import('@/components/gallery/GallerySection').then((mod) => ({ default: mod.GallerySection }))
);

/**
 * Homepage with clean hero section and featured projects grid
 * Showcases developer's best work with minimal, elegant design
 */
export default function Home() {
  const featuredProjects = getFeaturedProjects();

  return (
    <>
      <SEOHead />
      
      <div className="min-h-screen">
        {/* Hero Section - Full viewport without background effects */}
        <section className="relative min-h-screen w-full bg-background pt-16">
          {/* Hero Content */}
          <div className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-6 py-8">
            <motion.div
              className="text-center space-y-6 max-w-4xl"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-extralight tracking-widest text-foreground">
                {developerInfo.name.toUpperCase()}
              </h1>
              
              <p className="text-xl md:text-2xl font-light tracking-wide text-muted-foreground">
                {developerInfo.tagline}
              </p>

              <p className="text-base md:text-lg font-light leading-relaxed text-muted-foreground max-w-2xl mx-auto">
                {developerInfo.heroIntroduction}
              </p>

              {/* Skills Pills */}
              <div className="flex flex-wrap justify-center gap-2 pt-4">
                {developerInfo.skills.slice(0, 6).map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 text-sm font-light tracking-wide text-foreground border border-border rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Download CV Button */}
              <div className="pt-4">
                <DownloadResumeButton variant="footer" />
              </div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              className="absolute bottom-12"
              initial={{ opacity: 0.7 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35 }}
            >
              <ScrollIndicator />
            </motion.div>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="py-24 md:py-32 px-6 lg:px-8 bg-background">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                {/* Portrait Image */}
                <motion.div
                  className="relative flex-shrink-0"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative size-64 md:size-80 rounded-2xl overflow-hidden shadow-2xl">
                    <img
                      src={portraitImage}
                      alt={developerInfo.name}
                      className="w-full h-full object-cover"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                  {/* Decorative accent */}
                  <div className="absolute -bottom-4 -right-4 size-24 bg-brand-accent/20 rounded-2xl -z-10" />
                  <div className="absolute -top-4 -left-4 size-16 border-2 border-brand-accent/30 rounded-2xl -z-10" />
                </motion.div>

                {/* Text Content */}
                <div className="flex-1 text-center lg:text-left space-y-6">
                  <h2 className="text-3xl md:text-4xl font-light tracking-wide">
                    About My Work
                  </h2>
                  <div className="space-y-4 text-lg font-light leading-relaxed text-muted-foreground">
                    <p>
                      {developerInfo.aboutWork.split('\n\n')[0]}
                    </p>
                  </div>
                  <Link
                    to="/about"
                    className="inline-flex items-center gap-2 text-base font-light tracking-wide text-foreground hover:text-muted-foreground transition-colors group"
                  >
                    <span>Learn More About Me</span>
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Skills Section */}
        <Suspense
          fallback={
            <section className="py-24 md:py-32 px-6 lg:px-8 border-t border-border">
              <div className="max-w-6xl mx-auto text-center text-muted-foreground font-light">
                Loading skills...
              </div>
            </section>
          }
        >
          <LazySkillsSection />
        </Suspense>

        {/* Featured Projects Section */}
        <section className="py-24 md:py-32 border-t border-border">
          {/* Section Header */}
          <ScrollReveal>
            <div className="text-center mb-16 space-y-4 px-6">
              <h2 className="text-4xl md:text-5xl font-light tracking-wide">
                Featured Projects
              </h2>
              <p className="text-lg text-muted-foreground font-light tracking-wide">
                A selection of recent work
              </p>
            </div>
          </ScrollReveal>

          {/* Projects Grid - Edge to edge with minimal gaps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
            {featuredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                aspectRatio="landscape"
                showCategory={true}
                index={index}
              />
            ))}
          </div>

          {/* View All Link */}
          <ScrollReveal delay={0.4}>
            <div className="flex justify-center mt-16 px-6">
              <Link
                to="/portfolio"
                className="group inline-flex items-center gap-2 text-lg font-light tracking-wide text-foreground hover:text-muted-foreground transition-colors"
              >
                <span>View All Projects</span>
                <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </ScrollReveal>
        </section>

        {/* Testimonials Section */}
        <Suspense fallback={<section className="py-24 md:py-32 border-t border-border" />}>
          <LazyTestimonialsSection />
        </Suspense>

        {/* Gallery Section */}
        <Suspense fallback={<section className="py-24 md:py-32 border-t border-border" />}>
          <LazyGallerySection />
        </Suspense>
      </div>
    </>
  );
}
