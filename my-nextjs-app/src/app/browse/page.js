import React from "react";
import Link from "next/link";
import UserProfile from "@/components/UserProfile";
import { getSession } from "next-auth/react";
import '../styles/styles.css';

export default function Browse ({ session }) {

    const { account } = session;

    const metadata = {
        title: 'Browse | Spotify Reads',
        description: 'Choose from thousands of titles in the Spotify audiobook collection'
    }
   
    return(
            <div>
                <Link href="/shelf"><li>Back</li></Link>
                <section className="mx-auto w-full max-w-6xl  min-h-screen h-auto flex items-center justify-center">
                    <img src="/Browse2.jpg" alt="stack of books" className="w-full h-auto"></img>
                    {account && <UserProfile account={account}/>}
                </section>
            </div>
    )
};

export async function getServerSideProps(context) {
    const session = await getSession(context);

    return {
        props: {
            session,
        },
    };
}