import React, { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import DropdownMenu from "./DropdownMenu";


const NavBar = () => {
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
        return <h2 className="m-4 text-center text-2xl font-semibold">Please{' '}
            <Link href="/">
                <span className="cursor-pointer underline hover:text-green-500">log in</span>
            </Link></h2>
    }


    return(
        <div className="flex px-8 justify-between w-full items-center navbar">
            {/*<div className="dropdown">*/}
                <button className="p-0.5 my-2 bg-gray-400 cursor-pointer profile-img">
                    {session.user.image ? (
                        <a rel="noopener noreferrer" href="https://open.spotify.com/" target="_blank">
                            <img src={session.user.image} alt="Spotify Profile" className="m-auto w-14 h-14 object-cover rounded-full"></img>
                        </a>
                    ) : (
                        <a rel="noopener noreferrer" href="https://open.spotify.com/" target="_blank">
                            <img src="user-regular.svg" alt="Spotify Profile" className="m-auto w-14 h-14 object-cover"></img>
                        </a>
                    )}
                </button>
                <span className="bg-white text-black tooltip">
                    Open Spotify
                </span>

            <div /* center logo */>
                <button className=" hover:bg-gray-600">
                    <h1 className="p-1 text-5xl"><span className="font-bold text-green-500">f</span><span className="font-normal">m</span></h1>
                </button>
            </div>

            <div className="dropdown">
                {/* dropdown nav icon */}
                <button className="dropdown-btn">
                    <div className="bar1"></div>
                    <div className="bar2"></div>
                    <div className="bar3"></div>
                </button>

                <DropdownMenu />
            </div>
        </div>
    );
};


export default NavBar;