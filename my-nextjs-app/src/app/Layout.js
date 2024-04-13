import React from 'react';
import HeadComponent from '../components/HeadComponent';
import Footer from '../components/footer/Footer';
import '@/app/styles/globals.css';
import '@/app/styles/styles.css';
import { ShelfProvider } from './contexts/ShelfContext';
import PageWrapper from '@/components/PageWrapper';


export default function RootLayout ({ metadata, children, session }) {

  return (
    <>
      <html lang="en">
        <HeadComponent metadata={metadata}/>
        <body>
              <ShelfProvider>
                <PageWrapper session={session}>
                  {children}
                </PageWrapper>
              </ShelfProvider>
          <Footer />
        </body>
      </html>
    </>
  );
};