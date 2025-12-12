import { motion } from 'framer-motion';
import { Download, Sparkles } from 'lucide-react';

/**
 * Spectacular animated download resume button
 * Features glowing effects, shimmer animation, and hover interactions
 */
export function DownloadResumeButton() {
  return (
    <motion.a
      href="/NICHOLAS_MAINA_MUREITHI_CV.pdf"
      download="Nicholas_Mureithi_CV.pdf"
      className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full overflow-hidden cursor-pointer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-400"
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{ backgroundSize: '200% 200%' }}
      />

      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-400 blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300" />

      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
        initial={{ x: '-100%' }}
        animate={{ x: '200%' }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 1,
          ease: 'easeInOut',
        }}
      />

      {/* Border glow */}
      <div className="absolute inset-0 rounded-full border border-white/30" />

      {/* Inner content */}
      <span className="relative flex items-center gap-3 text-white font-medium tracking-wide">
        <motion.span
          animate={{ rotate: [0, -10, 10, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
        >
          <Download className="size-5" />
        </motion.span>
        
        <span className="relative">
          Download CV
          {/* Sparkle decoration */}
          <motion.span
            className="absolute -top-1 -right-4"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Sparkles className="size-3 text-yellow-300" />
          </motion.span>
        </span>
      </span>

      {/* Floating particles */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute size-1 bg-white rounded-full"
          initial={{ 
            x: Math.random() * 100, 
            y: 20,
            opacity: 0 
          }}
          animate={{
            y: [-10, -30],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.5,
            ease: 'easeOut',
          }}
          style={{ left: `${20 + i * 30}%` }}
        />
      ))}
    </motion.a>
  );
}
