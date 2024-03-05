'use client'
import React from "react";
import UserProfile from "@/components/UserProfile";
import Link from "next/link";
import '../styles/styles.css';
import SearchBar from "@/components/SearchBar";
import Shelf from "../shelf/page";


const Browse = () => {

return(
    <div>
        {/*<UserProfile />*/}
        <div className="mt-6 flex justify-around">
                <Link href="./shelf">
                    <button className="font-semibold">Dashboard</button>
                </Link>
                <button className="font-semibold">Music</button>
                <button className="font-semibold">Podcasts</button>
                <button className="font-semibold">Books</button>
            </div>
        <section className="mx-auto w-full max-w-6xl  min-h-screen h-auto flex items-center justify-center">
        <div className="p-20 border-solid border-slate-100 border-2">
            <h2 className="pb-12 font-semibold text-center text-xl">What would you like to listen to?</h2>
        
                <SearchBar />
            </div>
        </section>
    </div>
    );
};

export default Browse;

/*className="mx-auto w-full max-w-6xl  min-h-screen h-auto flex items-center justify-center"*/

/*<img src="/Browse2.jpg" alt="stack of books" className="w-full h-auto"></img>*/
            