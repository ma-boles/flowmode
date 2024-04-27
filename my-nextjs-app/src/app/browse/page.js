'use client'
import React, { useState } from "react";
import UserProfile from "@/components/profile/UserProfile";
import '../styles/styles.css';
import SearchComponent from "@/components/browse/SearchComponent";
import { useSession } from "next-auth/react";
import Player from "@/components/Player";


const Browse = () => {

    const { data: session } = useSession();
    const accessToken = session?.accessToken;

    // State store search results data
    const [searchResults, setSearchResults] = useState([]);

    // Function to handle search results data
    const handleSearchResults = (results) => {
        console.log('Search results:', results);
        setSearchResults(results);
    };

    const [isPlayerOpen, setIsPlayerOpen] = useState(false);

    const handleButtonClick = () => {
        setIsPlayerOpen(true); // Open Player when button is clicked
    };


return(
    <div>
        <nav className="flex justify-around w-full browse--nav">
            <UserProfile />
        </nav>

        <section className="flex items-center justify-center mx-auto max-w-6xl min-h-screen h-auto ">
            <div className="w-full border-none">
                <h2 className="pb-4 font-semibold text-center text-5xl">What <span className="font-extrabold text-green-500">would </span> you like <br/>to <span className="font-extrabold text-green-500">listen </span> to?
                </h2>
                <SearchComponent accessToken={accessToken} onSearchResults={handleSearchResults} />
            </div>
        </section>
        <Player accessToken={accessToken}/>
{/*
        <button className="m-8 p-8 bg-green-600" onClick={handleButtonClick}>Open Player</button>
        {isPlayerOpen && (
            <Player accessToken={accessToken}/>
        )}*/}
    </div>
    );
};

export default Browse;