import React from "react";
import HeadComponent from "../components/HeadComponent";
import Layout from "../components/Layout";
import ShelfContent from "../components/ShelfContent";

export default function Shelf () {
    
    const shelfMetadata = {
        title:'Shelf | Spotify Reads',
        description: 'Organize and place books on to different shelves for easier access while keeping track of monthly listening minutes. '
    }
    return (
        <Layout metadata={shelfMetadata}>
           <HeadComponent metadata={shelfMetadata}/>
           <ShelfContent />
        </Layout>
        
    )
}