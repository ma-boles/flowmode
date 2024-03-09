'use client'
import React from "react";
import UserProfile from "@/components/UserProfile";
import Link from "next/link";
import '../styles/styles.css';
import SearchComponent from "@/components/SearchComponent";
import Results from "@/components/shelf/Results";
import Shelf from "../shelf/page";


const Browse = () => {

return(
    <div>
        <nav className="mb-16 flex justify-around w-full browse--nav">
            <UserProfile />
        </nav>

        <section className="mx-auto max-w-6xl min-h-screen h-auto">

        <div className="flex items-center justify-center">
            <div className="p-20 border-none ">
                <h2 className="pb-4 font-semibold text-center text-5xl">What <span className="font-extrabold text-green-500">would </span> you like <br/>to <span className="font-extrabold text-green-500">listen </span> to?</h2>
                <SearchComponent />
            </div>
        </div>
        </section>
           {/* <Results /> */}

    </div>
    );
};

export default Browse;

/*className="mx-auto w-full max-w-6xl  min-h-screen h-auto flex items-center justify-center"*/

/*<img src="/Browse2.jpg" alt="stack of books" className="w-full h-auto"></img>*/
            
/*className="p-20 border-solid border-slate-100 border-2"*/
/*<button className="p-2 px-4 rounded-md hover:bg-green-600 transition duration-300 ease-in-out">Music</button>
                <button className="p-2 px-4 rounded-md hover:bg-green-600 transition duration-300 ease-in-out">Podcasts</button>
                <button className="p-2 px-4 rounded-md hover:bg-green-600 transition duration-300 ease-in-out">Books</button>*/
                /*<Link href="./shelf">
                    <button className="p-2 px-4 text-white font-semibold rounded-md hover:bg-green-600  transition duration-300 ease-in-out">Dashboard</button>
</Link>*/