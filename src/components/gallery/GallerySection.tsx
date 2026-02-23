import { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { galleryImages, type GalleryImage } from '@/data/gallery';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';

/**
 * Gallery section showcasing successful moments
 * Features masonry-style grid with full-screen lightbox preview
 */
export function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  return (
    <section className="border-t border-border bg-accent/30 px-6 py-24 md:py-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal>
          <div className="mb-16 space-y-4 text-center">
            <h2 className="text-4xl font-light tracking-wide md:text-5xl">Moments & Milestones</h2>
            <p className="mx-auto max-w-2xl text-lg font-light tracking-wide text-muted-foreground">
              A glimpse into the journey - conferences, collaborations, and celebrations
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {galleryImages.map((image, index) => (
            <ScrollReveal key={image.id} delay={index * 0.1}>
              <motion.div
                className={cn(
                  'group relative cursor-pointer overflow-hidden rounded-sm',
                  index === 0 && 'md:col-span-2 md:row-span-2',
                  index === 3 && 'md:col-span-2'
                )}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedImage(image)}
              >
                <div className={cn('relative bg-muted', index === 0 ? 'aspect-square md:aspect-[4/3]' : 'aspect-square')}>
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading={index < 4 ? 'eager' : 'lazy'}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                      <p className="text-sm font-light tracking-wide text-white md:text-base">{image.caption}</p>
                    </div>
                  </div>

                  <div className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full bg-white/10 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                    <svg
                      className="size-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                      />
                    </svg>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <Dialog
        open={Boolean(selectedImage)}
        onOpenChange={(open) => {
          if (!open) setSelectedImage(null);
        }}
      >
        <DialogContent className="h-screen max-h-screen w-screen max-w-screen border-none bg-black/95 p-0 [&>button]:hidden">
          <DialogTitle className="sr-only">Gallery Image</DialogTitle>
          <DialogDescription className="sr-only">
            Full-screen image preview for moments and milestones.
          </DialogDescription>

          <div
            className="relative flex h-full w-full items-center justify-center p-4 md:p-8"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute right-4 top-4 z-50 flex size-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              onClick={() => setSelectedImage(null)}
              aria-label="Close"
            >
              <X className="size-6" />
            </button>

            {selectedImage && (
              <motion.div
                className="relative flex h-full w-full items-center justify-center"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.25 }}
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="max-h-[88vh] max-w-full rounded-sm object-contain"
                />

                {selectedImage.caption && (
                  <p className="absolute bottom-4 left-0 right-0 px-4 text-center text-base font-light tracking-wide text-white/80 md:text-lg">
                    {selectedImage.caption}
                  </p>
                )}
              </motion.div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
