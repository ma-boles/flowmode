import React from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";


const UserProfile = () => {
    const { data: session } = useSession();

    if (!session) {
        return <p>Please log in</p>;
    }

    return(
        <div className="flex justify-between mx-4">
            <Link href="/shelf"><li>Back</li></Link>

            <p className="mx-4 my-4 font-semibold">Welcome, {session.user.sub}!</p>
            <img src={session.user.picture} alt="User" className="w-20 h-20 p-4 object-cover rounded-full"></img>
        </div>
    );
};

export default UserProfile;