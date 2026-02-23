import { Github, Linkedin, Instagram } from 'lucide-react';
import { developerInfo } from '@/data/developer';
import { DownloadResumeButton } from '@/components/ui/DownloadResumeButton';

/**
 * Minimal footer component with social links, resume CTA, and copyright
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center gap-8">
          {/* Resume CTA */}
          <div className="text-center space-y-3">
            <p className="text-sm text-muted-foreground font-light tracking-wide">
              Interested in working together?
            </p>
            <DownloadResumeButton variant="footer" />
          </div>

          <div className="w-full flex flex-col md:flex-row justify-between items-center gap-6 pt-4 border-t border-border">
            {/* Copyright */}
            <p className="text-sm text-muted-foreground font-light tracking-wide">
              © {currentYear} {developerInfo.name}. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-6">
              {developerInfo.socialLinks.github && (
                <a
                  href={developerInfo.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
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
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="size-5" />
                </a>
              )}
              {developerInfo.socialLinks.instagram && (
                <a
                  href={developerInfo.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="size-5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
