'use client'
import React from 'react';
import HeadComponent from '../components/HeadComponent';
import '@/app/styles/globals.css';
import '@/app/styles/styles.css';
import PageWrapper from '@/components/PageWrapper';
import { PlaylistProvider } from './contexts/PlaylistContext';
import { PlayerProvider } from './providers/PlayerProvider';


export default function RootLayout ({ metadata, children, session }) {

  return (
    <>
      <html lang="en">
        <HeadComponent metadata={metadata}/>
          <body>
            <PlaylistProvider>
              <PageWrapper session={session}>
                <PlayerProvider>
                  {children}
                </PlayerProvider>
              </PageWrapper>
            </PlaylistProvider>
          </body>
      </html>
    </>
  );
};