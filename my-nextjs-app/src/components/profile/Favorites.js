import React from "react";
import ProfilePlaylistCard from "./ProfilePlaylistCard";

export default function Favorites() {
    return (
        <div className="ml-2 text-center bg-black bg-opacity-20">
            <h2 className="my-2 text-xl font-bold">Favorites</h2>
            <ProfilePlaylistCard />
        </div>
    )
}
