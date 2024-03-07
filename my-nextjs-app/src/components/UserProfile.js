import React from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";


const UserProfile = () => {
    const { data: session } = useSession();

    if (!session) {
        return <p>Please log in</p>;
    }

    return(
        <div className="flex px-2 justify-between w-full items-center">
            <Link href="/shelf"><button className=" p-2 px-4 text-white font-semibold rounded-md hover:bg-green-600  transition duration-300 ease-in-out" >Dashboard</button></Link>
            <p className="mx-4 my-4 font-semibold">Welcome, {session.user.sub}!</p>
            <img src={session.user.picture} alt="User" className="w-20 h-20 p-4 object-cover rounded-full"></img>
        </div>
    );
};

export default UserProfile;