'use client'
import React, { useState } from "react";
import UserProfile from "@/components/UserProfile";
import '../styles/styles.css';
import SearchComponent from "@/components/browse/SearchComponent";
import { useSession } from "next-auth/react";


const Browse = () => {

    const { data: session } = useSession();
    const accessToken = session?.accessToken;

    // State store search results data
    const [searchResults, setSearchResults] = useState([]);

    // State to store search results for different types

    // Function to handle search results data
    const handleSearchResults = (results) => {
        console.log('Search results:', results);
        setSearchResults(results);
    };


return(
    <div>
        <nav className="mb-6 flex justify-around w-full browse--nav">
            <UserProfile />
        </nav>

        <section className="flex items-center justify-center mx-auto max-w-6xl min-h-screen h-auto ">
            <div className="w-full border-none">
                <h2 className="pb-4 font-semibold text-center text-5xl">What <span className="font-extrabold text-green-500">would </span> you like <br/>to <span className="font-extrabold text-green-500">listen </span> to?
                </h2>
                <SearchComponent accessToken={accessToken} onSearchResults={handleSearchResults} />
            </div>
        </section>
    </div>
    );
};

export default Browse;

/*className="mx-auto w-full max-w-6xl  min-h-screen h-auto flex items-center justify-center"*/

/*<img src="/Browse2.jpg" alt="stack of books" className="w-full h-auto"></img>*/