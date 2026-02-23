import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import type { Project } from '@/types';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
  aspectRatio?: 'portrait' | 'landscape' | 'square';
  showCategory?: boolean;
  index?: number;
}

/**
 * Project card component with image, hover overlay, and smooth animations.
 * Used in homepage featured projects and portfolio grid.
 */
export function ProjectCard({
  project,
  aspectRatio,
  showCategory = true,
  index = 0,
}: ProjectCardProps) {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [hasImageError, setHasImageError] = React.useState(false);
  const imageRef = React.useRef<HTMLImageElement>(null);
  const navigate = useNavigate();
  const ratio = aspectRatio || 'landscape';

  const aspectRatioClasses = {
    portrait: 'aspect-[3/4]',
    landscape: 'aspect-[3/2]',
    square: 'aspect-square',
  };

  const handleExternalLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('a')) return;
    navigate(`/project/${project.slug}`);
  };

  const handleCardKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    e.preventDefault();
    navigate(`/project/${project.slug}`);
  };

  React.useEffect(() => {
    setIsLoaded(false);
    setHasImageError(false);
    const imageEl = imageRef.current;
    if (!imageEl) return;
    if (imageEl.complete) {
      setIsLoaded(true);
      if (imageEl.naturalWidth === 0) setHasImageError(true);
    }
  }, [project.coverImage]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div
        role="link"
        tabIndex={0}
        aria-label={`Open project: ${project.title}`}
        onClick={handleCardClick}
        onKeyDown={handleCardKeyDown}
        className="group block relative overflow-hidden rounded-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <div className={cn('relative overflow-hidden bg-muted', aspectRatioClasses[ratio])}>
          {!isLoaded && <div className="absolute inset-0 bg-muted animate-pulse" />}

          <img
            ref={imageRef}
            src={project.coverImage}
            alt={project.title}
            className={cn(
              'absolute inset-0 h-full w-full object-cover transition-all duration-700',
              isLoaded ? 'opacity-100' : 'opacity-0',
              hasImageError && 'opacity-0',
              'group-hover:scale-110'
            )}
            loading={index < 2 ? 'eager' : 'lazy'}
            decoding="async"
            onLoad={() => {
              setHasImageError(false);
              setIsLoaded(true);
            }}
            onError={() => {
              setHasImageError(true);
              setIsLoaded(true);
            }}
          />

          {hasImageError && (
            <div className="absolute inset-0 flex items-center justify-center bg-muted px-4 text-center text-sm font-light tracking-wide text-muted-foreground">
              Image unavailable
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute bottom-0 left-0 right-0 space-y-3 p-6">
              <h3 className="text-xl md:text-2xl font-light tracking-wide text-white">
                {project.title}
              </h3>
              {showCategory && (
                <div className="flex items-center gap-3 text-sm font-light tracking-wide text-white/80">
                  <span className="capitalize">{project.category}</span>
                  <span>&middot;</span>
                  <span>{project.year}</span>
                </div>
              )}

              {(project.liveUrl || project.githubUrl) && (
                <div className="flex items-center gap-3 pt-2">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleExternalLinkClick}
                      className="flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/30"
                    >
                      <ExternalLink className="size-3.5" />
                      Live Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleExternalLinkClick}
                      className="flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/30"
                    >
                      <Github className="size-3.5" />
                      Code
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="absolute inset-0 border-2 border-white/0 transition-colors duration-500 group-hover:border-white/10" />
        </div>
      </div>
    </motion.div>
  );
}
