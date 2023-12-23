import React from "react";
import Layout from "../components/Layout";
import '../styles/styles.css';
import HeadComponent from "../components/HeadComponent";
import BrowseContent from "../components/BrowseContent";

export default function Browse () {

    const browseMetadata = {
        title: 'Browse | Spotify Reads',
        description: 'Choose from thousands of titles in the Spotify audiobook collection.'
    }

    return (
        <Layout metadata={browseMetadata}>
            <HeadComponent metadata={browseMetadata}/>
            <BrowseContent />
        </Layout>
    );
};