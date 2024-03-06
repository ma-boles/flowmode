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
        <div className="mt-4 flex justify-around">
                <Link href="./shelf">
                    <button className="p-2 px-4 text-white font-semibold  rounded-md hover:bg-blue-700  transition duration-300 ease-in-out">Dashboard</button>
                </Link>
                <button className="p-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out">Music</button>
                <button className="p-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out">Podcasts</button>
                <button className="p-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out">Books</button>
            </div>
        <section className="mx-auto w-full max-w-6xl  min-h-screen h-auto flex items-center justify-center">
        <div className="p-20 border-solid border-transparent border-2">
            <h2 className="pb-12 font-semibold text-center text-5xl">What <span className="font-extrabold text-blue-800">would</span> you like <br/>to <span className="font-extrabold text-blue-800">listen </span> to?</h2>
                <SearchBar />
                </div>
        </section>
    </div>
    );
};

export default Browse;

/*className="mx-auto w-full max-w-6xl  min-h-screen h-auto flex items-center justify-center"*/

/*<img src="/Browse2.jpg" alt="stack of books" className="w-full h-auto"></img>*/
            
/*className="p-20 border-solid border-slate-100 border-2"*/