import React, { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";


const UserProfile = () => {
    const { data: session } = useSession();
    const [isClient, setIsClient] = useState(false);
    const [currentPath, setCurrentPath] = useState('');

    useEffect(() => {
        setIsClient(true);
        if(typeof window !== 'undefined') {
            setCurrentPath(window.location.pathname);
        }
    }, []);

    if(!isClient) {
        return null;// Loading state
    };

    if (!session) {
        return <p>Please log in</p>;
    }


    return(
        <div className="flex px-8 justify-between w-full bg-neutral-800 items-center">
            <div className="dropdown">
            <button className="bg-gray-400 dropdown-btn">
                <img src={session.user.picture} alt="User" className="m-auto w-14 h-14 object-cover rounded-full z-20"></img>
            </button>
                <div className="border border-solid rounded-md dropdown-content">
                    <p className="pb-2 text-center font-extrabold cursor-default bg-transparent">---</p>
                    <a rel="noopener noreferrer" href="https://open.spotify.com/" target="_blank">
                        <p className="border-t border-solid border-gray-600 hover:bg-green-600 transition duration-300 ease-in-out dropdown-link">Spotify</p>
                    </a>
                    <button onClick={() => signOut('spotify')} className="border-t border-solid border-gray-600 hover:bg-red-600 transition duration-300 ease-in-out dropdown-link">Log Out</button>
                </div>
            </div>

            <div /* center logo */>
                <h1 className="p-1 text-5xl"><span className="font-bold text-green-500">f</span><span className="font-normal">m</span></h1>
            </div>


            {/* navigation buttons */}
            {currentPath === '/browse' && (
                <Link href='/dashboard'>
                    <button className="px-4 py-2 w-28 border border-solid border-white rounded-md hover:bg-green-600 transition duration-300 ease-in-out">Dashboard</button>
                </Link>
            )}

            {currentPath === '/dashboard' && (
                <Link href='/browse'>
                    <button className="px-4 py-2 w-28 border border-solid border-white rounded-md hover:bg-green-600 transition duration-300 ease-in-out">Search</button>
                </Link>
            )}
        </div>
    );
};


export default UserProfile;