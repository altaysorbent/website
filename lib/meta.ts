import type { Metadata } from 'next';

interface Props {
  title: string;
  description?: string;
}

export function getMeta({ description, title }: Props): Metadata {
  const pageTitle = `${title} | Алтайсорбент`;
  const metaDescription =
    description ||
    'Алтайсорбент - 100% натуральный кремнесодержащий энтеросорбент с широким спектром действия';

  return {
    title: pageTitle,
    description: metaDescription,
    openGraph: {
      title: pageTitle,
      description: metaDescription,
    },
    twitter: {
      card: 'summary',
      title: pageTitle,
      description: metaDescription,
    },
    manifest: '/site.webmanifest',
    icons: {
      apple: '/apple-touch-icon.png',
      icon: '/favicon-32x32.png',
    },
    other: {
      rel: 'mask-icon',
      href: '/safari-pinned-tab.svg',
      color: '#5bbad5',
    },
  };
}
