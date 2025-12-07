export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption?: string;
}

export const galleryImages: GalleryImage[] = [
  {
    id: '1',
    src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80',
    alt: 'Tech conference presentation',
    caption: 'Speaking at a tech conference'
  },
  {
    id: '2',
    src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80',
    alt: 'Team collaboration',
    caption: 'Collaborating with the team'
  },
  {
    id: '3',
    src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80',
    alt: 'Hackathon winning moment',
    caption: 'Hackathon victory celebration'
  },
  {
    id: '4',
    src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80',
    alt: 'Workshop session',
    caption: 'Leading a coding workshop'
  },
  {
    id: '5',
    src: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80',
    alt: 'Award ceremony',
    caption: 'Receiving recognition'
  },
  {
    id: '6',
    src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80',
    alt: 'Project launch',
    caption: 'Successful project launch'
  }
];
