import { useEffect, useState } from "react";
import makeApiRequest from "@/app/lib/spotifyApi";
import { getTokens } from "@/app/api/auth/[...nextauth]/options";

const UserProfile =  () => {
    // Stores user data from Api
    const [userData, setUserData] = useState(null);

    const accessToken =  getTokens(account);

    // Fetches user profile data component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const accessToken = await makeApiRequest();

                // Specify endpoint
                const apiUrl = 'https://api.spotify.com/v1/me';
                // Make api request using custom function
                const data = await makeApiRequest(apiUrl, accessToken);
                setUserData(data);
            } catch(error) {
                console.error('Error fetching user profile:', error);
            }
    };

            // Triggers fetchUserProfile function if access token is available
            if(accessToken) {
                fetchData();
            }
        }, [accessToken]);


        return (
            <div>
            {userData && (
                <>
                <h2> Welcome {userData.display_name}</h2>
                {userData.images && userData.images.length > 0 && (
                    <img src={userData.images[0].url} alt="Profile" />
                )}
                </>
            )}
            </div>
        );
};

export default UserProfile;



/*

import makeApiRequest from "@/app/lib/spotifyApi";

const fetchDataFromSpotify = async () => {
    try {
        const apiUrl = 'https://api.spotify.com/v1/me';
        const accont =;
        const data = await mak
    }
}*/

// GET requst to Spotify Api's /me endpoint
                /*const response = await fetch('https://api.spotify.com/v1/me', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                // Checks if response is successful
                if(response.ok) {
                    // Parse JSON response
                    const data = await response.json();
                    setUserData(data);
                } else {
                    console.error('Failed to fetch user profile');
                }*/