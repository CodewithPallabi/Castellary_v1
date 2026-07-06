import type { Metadata } from 'next';
import {
  fontBody,
  fontMedieval,
  fontRoman,
  fontCyberpunk,
  fontSamurai,
  fontRobo,
  fontBlockcraft
} from '@/lib/fonts';
import { RealmThemeProvider } from '@/context/RealmThemeContext';
import { HeroSessionProvider } from '@/context/HeroSessionContext';
import { KingdomCampaignProvider } from '@/context/KingdomCampaignContext';
import { BoardDragProvider } from '@/context/BoardDragContext';
import './globals.css';

export const metadata: Metadata = {
  title: 'Castellary | Every Project is an Adventure',
  description: 'A cinematic, immersive, multiplayer productivity platform that transforms collaborative work into an epic role-playing experience.',
  icons: {
    icon: '/logo/crest.png',
    shortcut: '/logo/crest.png',
    apple: '/logo/crest.png',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fontVariables = [
    fontBody.variable,
    fontMedieval.variable,
    fontRoman.variable,
    fontCyberpunk.variable,
    fontSamurai.variable,
    fontRobo.variable,
    fontBlockcraft.variable
  ].join(' ');

  return (
    <html lang="en" className={fontVariables}>
      <body className="antialiased font-keep-body text-keep-foreground bg-keep-background transition-colors duration-500">
        <RealmThemeProvider>
          <HeroSessionProvider>
            <KingdomCampaignProvider>
              <BoardDragProvider>
                {children}
              </BoardDragProvider>
            </KingdomCampaignProvider>
          </HeroSessionProvider>
        </RealmThemeProvider>
      </body>
    </html>
  );
}
