import { motion } from 'framer-motion';
import { Download } from 'lucide-react';

/**
 * Spectacular animated download resume icon button
 * Features glowing effects, shimmer animation, and hover interactions
 */
export function DownloadResumeButton() {
  return (
    <motion.a
      href="/NICHOLAS_MAINA_MUREITHI_CV.pdf"
      download="Nicholas_Mureithi_CV.pdf"
      className="group relative inline-flex items-center justify-center size-14 rounded-full overflow-hidden cursor-pointer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      title="Download CV"
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

      {/* Icon */}
      <motion.span
        className="relative text-white"
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Download className="size-6" />
      </motion.span>
    </motion.a>
  );
}
