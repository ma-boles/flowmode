import { useEffect, useState } from "react";

const UserProfile = ({ accessToken }) => {
    // Stores user data from Api
    const [userData, setUserData] = useState(null);

    // Fetches user profile data component mounts
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                // GET requst to Spotify Api's /me endpoint
                const response = await fetch('https://api.spotify.com/v1/me', {
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
                }
            } catch(error) {
                console.error('Error fetching user profile:', error);
            }
    };

            // Triggers fetchUserProfile function if access token is available
            if(accessToken) {
                fetchUserProfile();
            }
        }, [accessToken]);


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