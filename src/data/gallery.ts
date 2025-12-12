import codingSession from '@/assets/gallery/coding-session.jpg';
import teamPhoto from '@/assets/gallery/team-photo.jpg';
import atTheLab from '@/assets/gallery/at-the-lab.jpg';

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption?: string;
}

export const galleryImages: GalleryImage[] = [
  {
    id: '1',
    src: codingSession,
    alt: 'Coding session',
    caption: 'Focused at a coding session'
  },
  {
    id: '2',
    src: teamPhoto,
    alt: 'Team photo',
    caption: 'With the team'
  },
  {
    id: '3',
    src: atTheLab,
    alt: 'At the computer lab',
    caption: 'At the computer lab'
  }
];
