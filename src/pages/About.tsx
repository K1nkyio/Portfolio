import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { developerInfo } from '@/data/developer';
import { Separator } from '@/components/ui/separator';
import { SEOHead } from '@/components/seo/SEOHead';
import { Badge } from '@/components/ui/badge';

/**
 * About page with developer biography and professional information
 * Features split layout with portrait and comprehensive biography
 */
export default function About() {
  return (
    <>
      <SEOHead
        title="About"
        description={`Learn about ${developerInfo.name}, ${developerInfo.tagline}. ${developerInfo.aboutWork.split('\n\n')[0]}`}
        image={developerInfo.portraitImage}
      />
      
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="py-24 md:py-32 px-6 lg:px-8 border-b border-border">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <motion.div
              initial={{ opacity: 0.8, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-wide mb-4">
                About
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground font-light tracking-wide">
                Full-Stack Developer & ML Enthusiast
              </p>
            </motion.div>
          </div>
        </section>

        {/* Portrait and Biography - Split Layout */}
        <section className="py-16 md:py-24 px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
              {/* Portrait Image */}
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0.8, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                <div className="aspect-[3/4] relative overflow-hidden rounded-sm bg-muted">
                  <img
                    src={developerInfo.portraitImage}
                    alt={developerInfo.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                
                {/* Social Links */}
                <div className="flex items-center gap-4">
                  {developerInfo.socialLinks.github && (
                    <a
                      href={developerInfo.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 border border-border rounded-sm hover:bg-accent transition-colors"
                      aria-label="GitHub"
                    >
                      <Github className="size-5" />
                    </a>
                  )}
                  {developerInfo.socialLinks.linkedin && (
                    <a
                      href={developerInfo.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 border border-border rounded-sm hover:bg-accent transition-colors"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="size-5" />
                    </a>
                  )}
                  {developerInfo.socialLinks.twitter && (
                    <a
                      href={developerInfo.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 border border-border rounded-sm hover:bg-accent transition-colors"
                      aria-label="Twitter"
                    >
                      <Twitter className="size-5" />
                    </a>
                  )}
                </div>
              </motion.div>

              {/* Biography and Info */}
              <motion.div
                className="space-y-8"
                initial={{ opacity: 0.8, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                {/* Name and Tagline */}
                <div className="space-y-3">
                  <h2 className="text-4xl md:text-5xl font-light tracking-wide">
                    {developerInfo.name}
                  </h2>
                  <p className="text-xl text-muted-foreground font-light tracking-wide">
                    {developerInfo.tagline}
                  </p>
                </div>

                <Separator />

                {/* About Work */}
                <div className="space-y-4">
                  {developerInfo.aboutWork.split('\n\n').map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-base md:text-lg font-light leading-relaxed text-muted-foreground"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Skills */}
                <div className="space-y-3">
                  <h3 className="text-sm font-light tracking-wide uppercase text-muted-foreground">
                    Skills & Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {developerInfo.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="font-light">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Contact Info */}
                <div className="pt-4 space-y-2">
                  <div className="text-sm font-light tracking-wide">
                    <span className="text-muted-foreground">Email: </span>
                    <a
                      href={`mailto:${developerInfo.email}`}
                      className="text-foreground hover:text-muted-foreground transition-colors"
                    >
                      {developerInfo.email}
                    </a>
                  </div>
                  <div className="text-sm font-light tracking-wide">
                    <span className="text-muted-foreground">Location: </span>
                    <span className="text-foreground">{developerInfo.location}</span>
                  </div>
                  <div className="text-sm font-light tracking-wide">
                    <span className="text-muted-foreground">Status: </span>
                    <span className="text-foreground">{developerInfo.availability}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Additional Sections */}
        <section className="py-16 md:py-24 px-6 lg:px-8 border-t border-border">
          <div className="max-w-4xl mx-auto space-y-16">
            {/* My Journey */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0.8, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <h3 className="text-2xl font-light tracking-wide">My Journey</h3>
              <p className="text-base md:text-lg font-light leading-relaxed text-muted-foreground">
                {developerInfo.journey}
              </p>
            </motion.div>

            {/* How I Work */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0.8, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <h3 className="text-2xl font-light tracking-wide">How I Work</h3>
              <p className="text-base md:text-lg font-light leading-relaxed text-muted-foreground">
                {developerInfo.howIWork}
              </p>
            </motion.div>

            {/* What Drives Me */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0.8, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <h3 className="text-2xl font-light tracking-wide">What Drives Me</h3>
              <p className="text-base md:text-lg font-light leading-relaxed text-muted-foreground">
                {developerInfo.whatDrivesMe}
              </p>
            </motion.div>

            {/* Beyond Code */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0.8, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <h3 className="text-2xl font-light tracking-wide">Beyond the Code</h3>
              <p className="text-base md:text-lg font-light leading-relaxed text-muted-foreground">
                {developerInfo.beyondCode}
              </p>
            </motion.div>

            {/* Future Goals */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0.8, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <h3 className="text-2xl font-light tracking-wide">Where I'm Heading</h3>
              <p className="text-base md:text-lg font-light leading-relaxed text-muted-foreground">
                {developerInfo.futureGoals}
              </p>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
