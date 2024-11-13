'use client'
import React, { useState } from "react";
import NavBar from "@/components/nav/NavBar";
import '../styles/styles.css';
import SearchComponent from "@/components/search/SearchComponent";
import { useSession } from "next-auth/react";
import Player from "@/components/player/Player";
import { playSong } from "../lib/playerApi";


const Search = ({ playlist }) => {

    const { data: session } = useSession();
    const accessToken = session?.accessToken;
    const [previewId, setPreviewId] = useState(null);
    const [addedType, setAddedType] = useState(null);

    // State store search results data
    const [searchResults, setSearchResults] = useState([]);

    // Function to handle search results data
    const handleSearchResults = (results) => {
        console.log('Search results:', results);
        setSearchResults(results);
    };

    //const [isPlayerOpen, setIsPlayerOpen] = useState(false);

    const handleSetPreview = (id, name) => {
        setPreviewId(id);
        console.log('On Select Preview:', id, name);
    };

    const onSelectPreview = (id, name) => {
        handleSetPreview(id, name);
        console.log('On select preview:', id, name);
    };


return(
    <div>
        <nav className="flex justify-around w-full browse--nav">
            <NavBar />
        </nav>

        <section className="flex items-center justify-center mx-auto max-w-6xl min-h-screen h-auto">
            <div className="w-full border-none">
                <h2 className="pb-4 mt-8 font-semibold text-center text-5xl">What <span className="font-extrabold text-green-500">would </span> you like <br/>to <span className="font-extrabold text-green-500">listen </span> to?
                </h2>
                <SearchComponent 
                    accessToken={accessToken} 
                    onSearchResults={handleSearchResults} 
                    playlist={playlist}
                    playSong={playSong}
                    onSelectPreview={onSelectPreview}
                    setAddedType={setAddedType}
                    previewId={previewId}
                    handleSetPreview={handleSetPreview}
                />
            </div>
        </section>
        
        <Player accessToken={accessToken}/>

    </div>
    );
};

export default Search;