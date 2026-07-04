import './globals.css';

export const metadata = {
  metadataBase: new URL('https://riff-app.co.uk'),
  title: {
    default: 'Riff — Meet Like-Minded People & Build Real Connections',
    template: '%s | Riff — Social Connection App',
  },
  description: 'Riff is the social networking app that connects you through questions, voice, and trust. Meet new people, find mentors, build friendships, and grow with like-minded individuals. No profiles, no scrolling — just real conversation.',
  keywords: [
    'make friends app', 'meet new people', 'social networking app', 'friendship app',
    'networking app', 'connect with people', 'find like-minded people',
    'meet people with similar interests', 'social app for adults',
    'meaningful connections app', 'find mentors online', 'build connections',
    'make friends online', 'friend finder app', 'social connection app',
    'meet people near me', 'networking platform', 'friendship networking',
    'voice messaging app', 'trusted social network', 'verified social app',
    'personal growth networking', 'find collaborators', 'mentorship app',
    'group friendship app', 'social circle app', 'make real friends',
    'deep connections', 'friend circle', 'community app', 'meet like-minded people UK',
  ],
  authors: [{ name: 'Riff', url: 'https://riff-app.co.uk' }],
  creator: 'Riff',
  publisher: 'Riff',
  applicationName: 'Riff',
  category: 'Social Networking',
  classification: 'Social Networking, Friendship, Mentorship',

  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://riff-app.co.uk',
    siteName: 'Riff',
    title: 'Riff — Meet Like-Minded People & Build Real Connections',
    description: 'The social app that connects you through questions, voice, and trust. Meet new people, find mentors, and build friendships with people who help you grow.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Riff — Social Connection App — Meet Like-Minded People',
        type: 'image/png',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Riff — Meet Like-Minded People & Build Real Connections',
    description: 'Connect through questions, voice, and trust. Find mentors, collaborators, and real friendships with people who think like you.',
    images: ['/og-image.png'],
    creator: '@riffapp',
    site: '@riffapp',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  alternates: {
    canonical: 'https://riff-app.co.uk',
  },

  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },

  manifest: '/manifest.json',

  verification: {
    // Add your verification codes when ready:
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },

  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': 'Riff',
    'theme-color': '#0A0E18',
  },
};

// JSON-LD Structured Data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Riff',
  applicationCategory: 'SocialNetworkingApplication',
  operatingSystem: 'iOS, Android',
  description: 'Riff is a social networking app that connects people through questions, voice, and trust. Meet like-minded people, find mentors, build friendships, and grow together.',
  url: 'https://riff-app.co.uk',
  image: 'https://riff-app.co.uk/logo.png',
  author: {
    '@type': 'Organization',
    name: 'Riff',
    url: 'https://riff-app.co.uk',
  },
  offers: {
    '@type': 'Offer',
    price: '2.99',
    priceCurrency: 'GBP',
    description: 'Plans from £2.99/month',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '127',
    bestRating: '5',
  },
  featureList: [
    'Meet like-minded people through compatibility matching',
    'Voice messaging and voice scoring',
    'Verified users with government ID and liveness detection',
    'Friend Circle groups of 4 compatible people',
    'AI-powered companions with voice responses',
    'End-to-end encrypted conversations',
    'Trust score system for safety',
    'Compatibility-based matching with 72% minimum threshold',
  ],
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How is Riff different from other social networking apps?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most social apps show you a profile and ask you to judge in seconds. Riff connects you through questions, text, and voice before you ever see a face. By the time the photo reveal happens, you already know if you click.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I use Riff to make friends?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Riff has a Friend Circle mode that matches you with 4 compatible people simultaneously. Group question rounds reveal personalities before faces, making it easy to find genuine friendships.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Riff help you meet new people?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Riff uses 25 compatibility questions to match you with people who share your values and perspectives. You progress through stages of text, voice, and a mutual photo reveal, building trust before meeting.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Riff safe to use for meeting people online?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Every Riff user is verified with government ID and a live selfie with liveness detection. All conversations are end-to-end encrypted, and a Trust Score system helps you assess the authenticity of your connections.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does Riff cost?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Riff plans start from £2.99 per month. The Explorer plan at £5.99/month adds more connections and priority matching. You can try the AI companion demo for free before subscribing.',
      },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
