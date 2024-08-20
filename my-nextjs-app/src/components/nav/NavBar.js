import React, { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Modal from "../Modal";


const NavBar = () => {
    const { data: session } = useSession();
    const [isClient, setIsClient] = useState(false);
    const [currentPath, setCurrentPath] = useState('');
    const [isOpen, setIsOpen] = useState(false);

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
                <span className="bg-green-600 tooltip">
                    Spotify
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

                <div className="border border-solid rounded-sm dropdown-content">
                   {/* <Link href='/get-started'>
                        <p className="hover:bg-blue-600 transition duration-300 ease-in-out dropdown-link">Get Started</p>
                    </Link>*/}
                    <button className="flex w-full text-left border-b border-solid border-gray-600 hover:bg-blue-600 transition duration-300 ease-in-out dropdown-link" onClick={() => setIsOpen(true)}>
                        <div className="transparent">
                            <img src="caret-left-solid.svg" className="m-auto mr-2 w-5 h-5 invert"></img>
                        </div>
                        Account
                    </button>
                    {currentPath === '/search' && (
                        <>
                        <Link href='/profile'>
                            <div className="flex border-b border-solid border-gray-600 hover:bg-blue-600 transition duration-300 ease-in-out dropdown-link">
                                <div className="transparent">
                                    <img src="user-regular.svg" className="m-auto mr-4 w-4 h-4 invert"></img>
                                </div>
                                Profile
                            </div>
                        </Link>
                    </>
                        )}

                    {currentPath === '/profile' && (
                        <>
                        <Link href='/search'>
                            <div className="flex border-b border-solid border-gray-600 hover:bg-blue-600 transition duration-300 ease-in-out dropdown-link">
                                <div className="transparent">
                                    <img src="magnifying-glass-solid.svg" className="m-auto mr-4 w-4 h-4 invert"></img>
                                </div>
                                Search
                            </div>
                        </Link>
                        </>
                    )}

                    {currentPath === '/about' && (
                        <>
                            <Link href="/profile">
                                <div className="flex border-b border-solid border-gray-600 hover:bg-blue-600 transition duration-300 ease-in-out dropdown-link">
                                    <div className="transparent">
                                        <img src="user-regular.svg" className="m-auto mr-4 w-4 h-4 invert"></img>
                                    </div>
                                    Profile
                                </div>
                            </Link>
                            <Link href='/search'>
                                <div className="flex border-b border-solid border-gray-600 hover:bg-blue-600 transition duration-300 ease-in-out dropdown-link">
                                    <div className="transparent">
                                        <img src="magnifying-glass-solid.svg" className="m-auto mr-4 w-4 h-4 invert"></img>
                                    </div>
                                    Search
                                </div>
                            </Link>
                        </>
                    )}

                            
                    <Link href='/about'>
                        <div className="flex border-b border-solid border-gray-600 hover:bg-blue-600 transition duration-300 ease-in-out dropdown-link">
                            <div className="transparent">
                                <img src="caret-left-solid.svg" className="m-auto mr-4 w-5 h-5 invert"></img>
                            </div>
                            About
                        </div>
                    </Link>
                    
                    <button onClick={() => signOut('spotify')} className="flex w-full text-left hover:bg-red-600 transition duration-300 ease-in-out dropdown-link">
                        <div className="transparent">
                            <img src="right-from-bracket-solid.svg" className="m-auto mr-2 w-6 h-6 invert"></img>
                        </div>
                        Log Out
                    </button>
                </div>
            </div>

            {/* mini about menus conditionally rendered */}
            {currentPath ===  '/profile' && (
                <div /* mini menu about/start */ className="aboutMenu">
                    <div className="flex border-b border-solid border-gray-600 hover:bg-blue-600 transition duration-300 ease-in-out dropdown-link">
                        Mission・Story
                    </div>
                    <div className="flex border-b border-solid border-gray-600 hover:bg-blue-600 transition duration-300 ease-in-out dropdown-link">
                        Get Started
                    </div>
                </div>
            )}
            {currentPath === '/search' && (
                <div /* mini menu about/start */ className="aboutMenu">
                    <div className="flex border-b border-solid border-gray-600 hover:bg-blue-600 transition duration-300 ease-in-out dropdown-link">
                        Mission・Story
                    </div>
                    <div className="flex border-b border-solid border-gray-600 hover:bg-blue-600 transition duration-300 ease-in-out dropdown-link">
                        Get Started
                    </div>
                </div>
            )}

            {currentPath === '/about' && (
                <div /* mini menu about/start */ className="aboutMenu2">
                    <div className="flex border-b border-solid border-gray-600 hover:bg-blue-600 transition duration-300 ease-in-out dropdown-link">
                        Mission・Story
                    </div>
                    <div className="flex border-b border-solid border-gray-600 hover:bg-blue-600 transition duration-300 ease-in-out dropdown-link">
                        Get Started
                    </div>
                </div>
            )}


            {/* Opt In modal */}
            <div className="centered">
                {isOpen && <Modal setIsOpen={setIsOpen} />}
            </div>


            {/* navigation buttons */}
            {currentPath === '/get-started' && (
                <div className="text-center rounded-md dropdown-nav">
                    <button className="border border-solid border-green-600 font-semibold dropdown-nav-btn">Nav</button>
                    <div className="border border-solid border-green-600 dropdown-nav-content">
                        <Link href='/search'>
                            <p className="p-2 border-b border-solid border-gray-400 font-semibold  hover:bg-green-600 transition duration-300 ease-in-out">Search</p>
                        </Link>
                        <a href="/profile">
                            <p className="p-2 border-t border-solid border-gray-400 font-semibold hover:bg-green-600 transition duration-300 ease-in-out">Profile</p>
                        </a>
                    </div>
                   
                </div>
                
            )}
        </div>
    );
};


export default NavBar;