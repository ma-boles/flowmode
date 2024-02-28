'use client'
import React from "react";
import Link from "next/link";
import UserProfile from "@/components/UserProfile";
import '../styles/styles.css';


const Browse = () => {

return(
    <div>
        <Link href="/shelf"><li>Back</li></Link>
        <section className="mx-auto w-full max-w-6xl  min-h-screen h-auto flex items-center justify-center">
            <img src="/Browse2.jpg" alt="stack of books" className="w-full h-auto"></img>

            <UserProfile />

        </section>
    </div>
    );
};

export default Browse;