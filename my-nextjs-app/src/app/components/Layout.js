import React from 'react';
import HeadComponent from './HeadComponent';
import Footer from './Footer';
import '../styles/globals.css';
import { Inter } from 'next/font/google';


const inter = Inter({ subsets: ['latin'] });

export default function Layout ({ metadata, children }) {

  return (
    /*<html lang="en">*/
    <>
      <HeadComponent metadata={metadata}/>
      <div className={inter.className}>
        {children}
        <Footer />
      </div>
    </>

    /*</html>*/

  );
};