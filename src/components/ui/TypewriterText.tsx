import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';

interface TypewriterTextProps {
  text: string;
  delay?: number;
  className?: string;
}

/**
 * Typewriter animation component that types out text character by character
 */
export function TypewriterText({ text, delay = 0, className = '' }: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const cursorControls = useAnimation();

  useEffect(() => {
    const startTyping = async () => {
      // Wait for initial delay
      await new Promise(resolve => setTimeout(resolve, delay * 1000));
      setIsTyping(true);
      
      // Type each character
      for (let i = 0; i <= text.length; i++) {
        setDisplayedText(text.slice(0, i));
        await new Promise(resolve => setTimeout(resolve, 50 + Math.random() * 30));
      }
      
      setIsTyping(false);
    };

    startTyping();
  }, [text, delay]);

  useEffect(() => {
    // Blinking cursor animation
    cursorControls.start({
      opacity: [1, 0],
      transition: {
        duration: 0.6,
        repeat: Infinity,
        repeatType: 'reverse',
      },
    });
  }, [cursorControls]);

  return (
    <span className={className}>
      {displayedText}
      <motion.span
        animate={cursorControls}
        className="inline-block w-[3px] h-[1em] bg-current ml-1 align-middle"
        style={{ display: isTyping || displayedText.length < text.length ? 'inline-block' : 'none' }}
      />
    </span>
  );
}
