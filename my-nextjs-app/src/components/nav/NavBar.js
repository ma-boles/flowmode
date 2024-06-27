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
            <div className="dropdown">
            <button className="p-0.5 my-2 bg-gray-400 dropdown-btn">
                {session.user.image ? (
                <img src={session.user.image} alt="User" className="m-auto w-14 h-14 object-cover rounded-full"></img>
                ) : (
                    <img src="user-regular.svg" alt="User" className="m-auto w-14 h-14 object-cover"></img>
                )}
            </button>
                <div className="border border-solid rounded-sm dropdown-content">
                    <Link href='/get-started'>
                        <p className="hover:bg-blue-600 transition duration-300 ease-in-out dropdown-link">Get Started</p>
                    </Link>
                    <button className="w-full text-left border-t border-solid border-gray-600 hover:bg-blue-600 transition duration-300 ease-in-out dropdown-link" onClick={() => setIsOpen(true)}>Account</button>
                    <Link href='/about'>
                        <p className="border-t border-solid border-gray-600 hover:bg-blue-600 transition duration-300 ease-in-out dropdown-link">About</p>
                    </Link>
                    <a rel="noopener noreferrer" href="https://open.spotify.com/" target="_blank">
                        <p className="border-t border-b border-solid border-gray-600 hover:bg-green-600 transition duration-300 ease-in-out dropdown-link">Spotify</p>
                    </a>
                    <button onClick={() => signOut('spotify')} className="w-full text-left hover:bg-red-600 transition duration-300 ease-in-out dropdown-link">Log Out</button>
                </div>
            </div>

            {/* Opt In modal */}
            <div className="centered">
            {isOpen && <Modal setIsOpen={setIsOpen} />}
            </div>

            <div /* center logo */>
                <button className=" hover:bg-gray-600">
                    <h1 className="p-1 text-5xl"><span className="font-bold text-green-500">f</span><span className="font-normal">m</span></h1>
                </button>
            </div>


            {/* navigation buttons */}
            {currentPath === '/search' && (
                <Link href='/dashboard'>
                    <button className="px-4 py-2 w-28 border border-solid border-white rounded-md hover:bg-green-600 transition duration-300 ease-in-out">Dashboard</button>
                </Link>
            )}

            {currentPath === '/dashboard' && (
                <Link href='/search'>
                    <button className="px-4 py-2 w-28 border border-solid border-white rounded-md hover:bg-green-600 transition duration-300 ease-in-out">Search</button>
                </Link>
            )}

            {currentPath === '/about' && (
                <div className="text-center rounded-md dropdown-nav">
                    <button className="border border-solid border-green-600 font-semibold dropdown-nav-btn">Nav</button>
                    <div className="border border-solid border-green-600 dropdown-nav-content">
                        <Link href='/search'>
                            <p className="p-2 border-b border-solid border-gray-400 font-semibold  hover:bg-green-600 transition duration-300 ease-in-out">Search</p>
                        </Link>
                        <a href="/dashboard">
                            <p className="p-2 border-t border-solid border-gray-400 font-semibold hover:bg-green-600 transition duration-300 ease-in-out">Dashboard</p>
                        </a>
                    </div>
                </div>
            )}

            {currentPath === '/get-started' && (
                <div className="text-center rounded-md dropdown-nav">
                    <button className="border border-solid border-green-600 font-semibold dropdown-nav-btn">Nav</button>
                    <div className="border border-solid border-green-600 dropdown-nav-content">
                        <Link href='/search'>
                            <p className="p-2 border-b border-solid border-gray-400 font-semibold  hover:bg-green-600 transition duration-300 ease-in-out">Search</p>
                        </Link>
                        <a href="/dashboard">
                            <p className="p-2 border-t border-solid border-gray-400 font-semibold hover:bg-green-600 transition duration-300 ease-in-out">Dashboard</p>
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
};


export default NavBar;