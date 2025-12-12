import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { testimonials } from '@/data/testimonials';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

/**
 * Testimonials section showcasing quotes from colleagues and clients
 */
export function TestimonialsSection() {
  return (
    <section className="py-24 md:py-32 px-6 lg:px-8 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-light tracking-wide">
              What People Say
            </h2>
            <p className="text-lg text-muted-foreground font-light tracking-wide">
              Feedback from colleagues and collaborators
            </p>
          </div>
        </ScrollReveal>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <ScrollReveal key={testimonial.id} delay={index * 0.1}>
              <motion.div
                className="relative h-full p-8 rounded-2xl bg-card border border-border shadow-sm"
                whileHover={{ y: -4, boxShadow: '0 20px 40px -20px rgba(0,0,0,0.1)' }}
                transition={{ duration: 0.3 }}
              >
                {/* Quote Icon */}
                <div className="absolute -top-4 left-8">
                  <div className="size-8 rounded-full bg-brand-accent flex items-center justify-center">
                    <Quote className="size-4 text-brand-accent-foreground" />
                  </div>
                </div>

                {/* Quote Text */}
                <p className="mt-4 text-base font-light leading-relaxed text-muted-foreground italic">
                  "{testimonial.quote}"
                </p>

                {/* Author */}
                <div className="mt-6 pt-6 border-t border-border">
                  <div className="flex items-center gap-4">
                    {/* Avatar Placeholder */}
                    <div className="size-12 rounded-full bg-brand-accent/10 flex items-center justify-center">
                      <span className="text-lg font-medium text-brand-accent">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}, {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
