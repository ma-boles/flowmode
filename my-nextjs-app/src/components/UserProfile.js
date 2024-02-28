import React from "react";
import { useSession } from "next-auth/react";

const UserProfile = () => {
    const { data: session } = useSession();

    if (!session) {
        return <p>Please log in</p>;
    }

    return(
        <div>
            <p>Welcome, {session.user.sub}!</p>
            <img src={session.user.picture} alt="User"></img>
        </div>
    );
};

export default UserProfile;