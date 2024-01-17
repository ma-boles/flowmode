import React from 'react';
import HeadComponent from '../components/HeadComponent';
import Footer from '../components/footer/Footer';
import './styles/globals.css';
import { Inter } from 'next/font/google';
import { ShelfProvider } from './contexts/ShelfContext';


const inter = Inter({ subsets: ['latin'] });

export default function RootLayout ({ metadata, children }) {

  return (
    <>
      <html lang="en">
        <HeadComponent metadata={metadata}/>
        <body className={inter.className}>
          <ShelfProvider>
            {children}
          </ShelfProvider>
          <Footer />
        </body>  
      </html>
    </>


  );
};