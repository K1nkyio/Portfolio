import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

interface DownloadResumeButtonProps {
  variant?: 'hero' | 'footer';
}

/**
 * High-contrast pill-shaped resume download button
 * Features micro-interactions, confident wording, and brand accent color
 */
export function DownloadResumeButton({ variant = 'hero' }: DownloadResumeButtonProps) {
  const isHero = variant === 'hero';
  
  return (
    <motion.a
      href="/NICHOLAS_MAINA_MUREITHI_CV.pdf"
      download="Nicholas_Mureithi_CV.pdf"
      className={`
        group relative inline-flex items-center gap-3 px-6 py-3 rounded-full font-medium tracking-wide
        transition-all duration-300 ease-out overflow-hidden
        ${isHero 
          ? 'bg-brand-accent text-brand-accent-foreground shadow-lg shadow-brand-accent/25' 
          : 'bg-brand-accent text-brand-accent-foreground'
        }
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Hover glow effect */}
      <motion.div
        className="absolute inset-0 bg-brand-accent-hover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />
      
      {/* Shimmer effect on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"
      />

      {/* Content */}
      <span className="relative flex items-center gap-2.5">
        <motion.span
          className="flex"
          whileHover={{ rotate: [0, -5, 5, 0] }}
          transition={{ duration: 0.4 }}
        >
          <FileText className="size-5" />
        </motion.span>
        <span className="font-semibold">Grab My Resume</span>
      </span>
    </motion.a>
  );
}
