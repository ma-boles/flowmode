import makeApiRequest from "@/app/lib/spotifyApi";
import { useEffect, useState } from "react";

export const useFetchUserData = (token) => {
    console.log('Account in useFetchUserData:', token);

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        console.log('Effect is running!');

        const fetchUserProfile = async() => {
            try {
                const apiUrl = 'https://api.spotify.com/v1/me';
                const data = await makeApiRequest(apiUrl, token);
                setUserData(data);
            } catch(error) {
                console.error('Error fetching user profile:', error);
            }
        };
        if(token) {
            fetchUserProfile();
        }
    }, [token]);

    return userData;
};
