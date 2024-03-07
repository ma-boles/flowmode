'use client'
import React from "react";
import UserProfile from "@/components/UserProfile";
import Link from "next/link";

export default function Dashboard() {
    return (
        <>
            <nav>
                <UserProfile />
            </nav>
            <header className="mx-6 flex justify-between">
                <h2 className="font-semibold">Dashboard</h2>
                <Link href="/browse" >
                    <button className="p-2 font-semibold border border-solid rounded-md hover:bg-green-600 transition duration-300 ease-in-out">Browse
                    </button>
                </Link>
            </header>
            <div className="flex justify-center">
                <div className="w-3/4 flex justify-between">
                    <button className="px-32 py-28 bg-green-600 rounded-md">Music</button>
                    <button className="px-32 py-28 bg-green-600 rounded-md">Podcasts</button>
                    <Link href="/shelf">
                    <button className="px-32 py-28 bg-green-600 rounded-md">Books</button>
                    </Link>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="flex justify-center m-6 h-80 w-3/4 bg-white rounded-md">
                    <h2 className="text-black font-semibold">All Playlists:</h2>
                </div>
            </div>
        </>
        
    )
}