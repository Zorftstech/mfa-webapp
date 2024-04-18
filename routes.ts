import { Route } from './types';

export const Routes: Route[] = [
  { id: 1, href: '/', title: 'Home' },
  {
    id: 2,
    href: '/shop',
    title: 'Shop',
    components: [
      {
        title: 'Alert Dialog',
        href: '/docs/primitives/alert-dialog',
        description: 'A modal dialog that interrupts the user with important content and expects a response.',
      },
      {
        title: 'Hover Card',
        href: '/docs/primitives/hover-card',
        description: 'For sighted users to preview content available behind a link.',
      },
      {
        title: 'Progress',
        href: '/docs/primitives/progress',
        description:
          'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.',
      },
    ],
  },
  { id: 3, href: '/flash-sales', title: 'Flash Sales' },
  { id: 4, href: '/about-us', title: 'About Us' },
  { id: 5, href: '/contact-us', title: 'Contact Us' },
  { id: 6, href: '/faq', title: 'FAQs' },
  { id: 7, href: '/blog', title: 'Blog' },
];
