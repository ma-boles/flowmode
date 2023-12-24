{/*import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/styles.css';
import App from 'next/app';
import reportWebVitals from './reportWebVitals';
import { ShelfProvider } from './contexts/ShelfContext';
import Layout from './Layout';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ShelfProvider>
      <Layout>
        <App />
      </Layout>
    </ShelfProvider>
  </React.StrictMode>
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();*/}

import React from 'react';
import { ShelfProvider } from './contexts/ShelfContext';
import HeadComponent from '../components/HeadComponent';
import Layout from './Layout';
import HomeContent from '../components/HomeContent'

export default function Home() {

  const homeMetadata = {
    title: 'Home | Spotify Reads',
    description: 'Welcome to Spotify Reads - Keep track of your monthly Spotify audiobooks.'
  };

  return (
    <>
      <Layout metadata={homeMetadata}>
        <HeadComponent metadata={homeMetadata} />
        <HomeContent />
      </Layout>
    </>
  );
};



