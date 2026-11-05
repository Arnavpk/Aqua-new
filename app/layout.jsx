import { Outfit, Space_Grotesk } from 'next/font/google';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-outfit',
  display: 'swap',
});

const space = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space',
  display: 'swap',
});

export const metadata = {
  title: "Aqua Imagicaa — India's Premier Water Park",
  description:
    "14 signature rides, 6 restaurants, and millions of smiles. Book your tickets for Aqua Imagicaa.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${outfit.variable} ${space.variable}`}>
      <head><meta name="google-site-verification" content="9vBKzRqKkkndEarA8yCRiyg5yG2bja98w3CyeTN-JXQ" /></head>
      <body>{children}</body>
    </html>
  );
}
