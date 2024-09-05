'use client'
import React from "react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";

export default function Login () {
    const { data: session, status } = useSession();
    const isLoggedIn = status === 'authenticated' && session;

    return(
        <>
        <section className='text-center mx-auto w-full max-w-6xl min-h-screen h-auto flex items-center justify-center landing--header'>
            <div>
                <h1 className="p-0 m-0 text-8xl">
                    <span className="font-bold  text-green-500">flow</span><span className="font-light">mode</span>
                </h1>

                {!isLoggedIn && (
                    <div>
                        <button onClick={() => signIn('spotify')} className="py-2 px-20 mt-10 mb-6 bg-transparent border-2 border-double border-white rounded-full hover:bg-green-600 transition duration-300 ease-in-out"> Log In </button>
                    </div>
                )}

                {isLoggedIn && (
                    <div className="mt-8 flex justify-evenly">
                        <Link href={'/dashboard'}>
                            <button className="px-12 py-4 text-lg border-2 border-green-600 font-semibold rounded-full hover:bg-green-600"> &lt;&lt; Dashboard </button>
                        </Link>
                        <Link href={'/search'}>
                            <button className="px-14 py-4 text-lg border-2 border-green-600 font-semibold rounded-full hover:bg-green-600">
                        Search &gt;&gt;</button>
                        </Link>
                    </div>
                    )}

            </div>
        </section>
        </>
    )
}