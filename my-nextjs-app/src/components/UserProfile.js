'use client'
import { useEffect, useState } from "react";
import makeApiRequest from "@/app/lib/spotifyApi";

const UserProfile =  ({ account }) => {
    // Stores user data from Api
    const [userData, setUserData] = useState(null);

    // Fetches user profile data component mounts
    useEffect(() => {
        console.log('Effect is running!');
        console.log('Account:', account);

        const fetchUserProfile = async () => {
            try {
                if(account && account.access_token) {
                   console.log('Fetching user profile...');

                // Specify endpoint
                const apiUrl = 'https://api.spotify.com/v1/me';
                // Make api request using custom function
                const data = await makeApiRequest(apiUrl, account);
            
                console.log('User data:',data);
                setUserData(data);
                } else {
                    console.error('Access token is missing in the account object.');
                }
               
            } catch(error) {
                console.error('Error fetching user profile:', error);
            }
    };
            // Triggers fetchUserProfile function if account is available
            if(account) {
                console.log('Account information:', account);
                fetchUserProfile();
            }
        }, [account]);

        return (
            <div>
            {userData && (
                <>
                <h2> Welcome {userData.display_name}</h2>
                    <img src={userData.images[0].url} alt="Profile" />
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
                // const accessToken = await makeApiRequest();
                //const UserProfile = await makeApiRequest('https://api.spotify.com/v1/me', account);