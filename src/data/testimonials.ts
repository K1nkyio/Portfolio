export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'David Kimani',
    role: 'Project Lead',
    company: 'ZetechVerse',
    quote: 'Nicholas brought exceptional technical skills and a collaborative spirit to our team. His ability to solve complex problems while keeping the user experience in mind is remarkable.'
  },
  {
    id: '2',
    name: 'Sarah Wanjiku',
    role: 'Senior Developer',
    company: 'Tech Innovations Kenya',
    quote: 'Working with Nicholas was a great experience. He consistently delivered high-quality code and was always willing to go the extra mile to ensure project success.'
  },
  {
    id: '3',
    name: 'James Ochieng',
    role: 'Product Manager',
    company: 'StartupHub Africa',
    quote: 'Nicholas has a rare combination of technical expertise and product thinking. He doesn\'t just write code — he builds solutions that truly address user needs.'
  }
];
