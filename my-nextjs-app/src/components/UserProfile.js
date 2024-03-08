import React from "react";
import { useSession } from "next-auth/react";
import DropdownMenu from "./DropdownMenu";
import Link from "next/link";


const UserProfile = () => {
    const { data: session } = useSession();

    if (!session) {
        return <p>Please log in</p>;
    }
  

    return(
        <div className="flex px-2 justify-between w-full items-center">
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
            
            <img src={session.user.picture} alt="User" className="w-20 h-20 p-4 object-cover rounded-full"></img>
            <DropdownMenu />
        </div>
    );
};


export default UserProfile;
{/*<Link href="/shelf"><button className=" p-2 px-4 text-white font-semibold rounded-md hover:bg-green-600  transition duration-300 ease-in-out" >Dashboard</button></Link>*/}
            {/*<p className="mx-4 my-4 font-semibold">Welcome, {session.user.sub}!</p>*/}