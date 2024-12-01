'use client'
import React, { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import DropdownMenu from "./DropdownMenu";
import { usePathname } from "next/navigation";


const NavBar = () => {
    const pathname = usePathname();
    const { data: session } = useSession();
    const [isClient, setIsClient] = useState(false);
    const [currentPath, setCurrentPath] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const isProfile = pathname === '/profile';

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
            <Link href="/login">
                <span className="cursor-pointer underline hover:text-green-500">log in</span>
            </Link>
            </h2>
    }


    return(
        <>
       <div className={`${
        isProfile ? 'fixed top-0 left-0 h-screen flex flex-col bg-black'
        :'flex px-8 justify-between w-full items-center navbar'
        }`}
        >

            {/*<div className="dropdown">*/}
                <button className={`${isProfile ? 'mb-2 bg-gray-500 ' : 'p-0.5 my-2 bg-gray-400 profile-img'} cursor-pointer profile-img`}
                 >
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

            <div /* center logo */ className={`${isProfile ? 'hidden': ''}`}>
                <button className=" hover:bg-gray-600">
                    <h1 className="p-1 text-5xl"><span className="font-bold text-green-500">f</span><span className="font-normal">m</span></h1>
                </button>
            </div>

            <div /*dropdown content */ className={`${isProfile ? 'flex flex-col' : 'hidden'}`}>
                <ul className="flex flex-col">
                    <button className="flex w-full text-left justify-between border-t border-gray-400 hover:bg-green-600 transition duration-300 ease-in-out dropdown-link" onClick={() => setIsOpen(true)}>
                        Create Profile
                        <div className="transparent">
                            <img src="caret-left-solid.svg" className="m-auto ml-2 w-5 h-5 invert rotate-180"></img>
                        </div>
                    </button>
                    <Link href='/search'>
                        <div className="flex justify-between hover:bg-green-600 transition duration-300 ease-in-out dropdown-link">
                        Search
                            <div className="transparent">
                                <img src="magnifying-glass-solid.svg" className="m-auto ml-4 mt-1 w-4 h-4 invert"></img>
                            </div>
                        </div>
                    </Link>
                    <Link href="/get-started">
                        <div className="flex justify-between hover:bg-green-600 transition duration-300 ease-in-out dropdown-link">
                        Get Started
                            <div className="transparent">
                                <img src="circle-info-solid (1).svg" className="m-auto ml-4 mt-1 w-4 h-4 invert"></img>
                            </div>
                        </div>
                    </Link>
                    <Link href="/about">
                        <div className="flex justify-between hover:bg-green-600 transition duration-300 ease-in-out dropdown-link">
                        Mission・Story
                            <div className="transparent">
                                <img src="pen-to-square-regular (1).svg" className="m-auto ml-4 mt-1 w-4 h-4 invert"></img>
                            </div>
                        </div>
                    </Link>
                    <button onClick={() => signOut('spotify')} className="flex justify-between bg-red-600 w-full text-left hover:bg-gray-600 transition duration-300 ease-in-out dropdown-link">
                    Log Out

                        <div className="transparent">
                            <img src="right-from-bracket-solid.svg" className="m-auto ml-2 w-5 h-5 invert"></img>
                        </div>
                    </button>
                    <div className="flex justify-between hover:bg-gray-600 transition duration-300 ease-in-out dropdown-link">
                        Settings
                            <div className="transparent">
                                <img src="pen-to-square-regular (1).svg" className="m-auto ml-4 mt-1 w-4 h-4 invert"></img>
                            </div>
                        </div>
                </ul>
            </div>
            {/* Account modal */}
            <div className="centered">
                {isOpen && <Account setIsOpen={setIsOpen} />}
            </div>

            <div className="dropdown">
                {/* dropdown nav icon */}
                <button className={`${ isProfile ? 'hidden' : 
                'dropdown-btn'}`}>
                    <div className="bar1"></div>
                    <div className="bar2"></div>
                    <div className="bar3"></div>
                </button>

                <DropdownMenu />

            </div>
        </div>
        </>
    );
};


export default NavBar;

{/*className="flex px-8 justify-between w-full items-center navbar"*/}