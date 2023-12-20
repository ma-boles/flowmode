import React from 'react';
import HeadComponent from '../components/HeadComponent';
import Layout from '../components/Layout';
import HomeContent from '../components/HomeContent'

export default function Home() {

  const homeMetadata = {
    title: 'Home | Spotify Reads',
    description: 'Welcome to Spotify Reads - Keep track of your monthly Spotify audiobooks.'
  }

  return (
    <Layout metadata={homeMetadata}>
      <HeadComponent metadata={homeMetadata} />
     <HomeContent />
    </Layout>
  );
};
