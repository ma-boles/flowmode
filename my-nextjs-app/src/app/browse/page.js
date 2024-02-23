'use client'
import React, { useState, useEffect } from "react";
import Link from "next/link";
import UserProfile from "@/components/UserProfile";
import { getSession } from "next-auth/react";
import '../styles/styles.css';
import makeApiRequest from "../lib/spotifyApi";
import { useFetchUserData } from "@/components/UserProfile";

 // Add the getSession function in getProps
 export async function getProps(context) {
    const session = await getSession(context);
    return {
        props: { session },
    };
}

const Browse = ({ session }) => {
    console.log('Session:', session);
    const [account, setAccount] = useState(null);
    console.log('Account:', account);

    const metadata = {
        title: 'Browse | Spotify Reads',
        description: 'Choose from thousands of titles in the Spotify audiobook collection'
    }
    
    useEffect(() => {
        if(session) {
            setAccount(session.account);
        }
    }, [session]);

    console.log('Session:', session);
    console.log('Account:', account);

return(
    <div>
        <Link href="/shelf"><li>Back</li></Link>
        <section className="mx-auto w-full max-w-6xl  min-h-screen h-auto flex items-center justify-center">
            <img src="/Browse2.jpg" alt="stack of books" className="w-full h-auto"></img>

            <UserProfile account={session?.account}/>

        </section>
    </div>
    );
};

export default Browse;