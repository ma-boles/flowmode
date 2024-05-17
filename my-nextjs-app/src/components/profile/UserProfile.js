import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
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
        <div className="flex px-2 justify-between w-full items-center">
            <img src={session.user.picture} alt="User" className="w-20 h-20 p-4 object-cover rounded-full"></img>

            {currentPath === '/browse' && (
                <Link href='/dashboard'>
                    <button className="px-4 py-2 mr-2 w-28 border border-solid border-white rounded-md hover:bg-green-600 transition duration-300 ease-in-out">Dashboard</button>
                </Link>
            )}

            {currentPath === '/dashboard' && (
                <Link href='/browse'>
                    <button className="px-4 py-2 mr-2 w-28 border border-solid border-white rounded-md hover:bg-green-600 transition duration-300 ease-in-out">Search</button>
                </Link>
            )}
        </div>
    );
};


export default UserProfile;
{/*<Link href="/shelf"><button className=" p-2 px-4 text-white font-semibold rounded-md hover:bg-green-600  transition duration-300 ease-in-out" >Dashboard</button></Link>*/}
            {/*<p className="mx-4 my-4 font-semibold">Welcome, {session.user.sub}!</p>*/}

            {/*  <div className="dropdown">
                <div className="relative inline-block spx-2 py-1 border border-single bg-transparent rounded-md">
                    <button className="bg-gray-600">nav</button>
                    <li className="bg-gray-600" value="dashboard">Dashboard</li>

                    <li className="bg-gray-600" value="browse">
                        <Link href="/browse">Browse</Link></li>
                    
                    <li className="bg-gray-600" value="music">Music</li>
                    <li className="bg-gray-600" value="podcasts">Podcasts</li>

                    <Link href="/shelf">
                    <li className="bg-gray-600 rounded-md" value="books">Books</li>
                    </Link>

                </div>
                
    </div>*/}