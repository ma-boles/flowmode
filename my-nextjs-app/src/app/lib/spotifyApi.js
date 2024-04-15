import { getTokens } from "../api/auth/[...nextauth]/options";
import axios from "axios";

const makeApiRequest = async(url, account) => {
    try {
        const tokens = await getTokens(account);

        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${tokens.accessToken}`,
                'Content-Type': 'application/json',
            },
        });

        // Check response status
        if(response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Error making API request: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error during API request:', error.message);

        // Handle 401 Unauthorized errors specifically
        if(error.response && error.response.status === 401) {
            console.log('Token expired or invalid, attempting to refresh...');
            const tokens = await getTokens(account);

            // Retry the request with new token
            const retryResponse = await axios.get(url, {
                headers: {
                        'Authorization': `Bearer ${tokens.accessToken}`,
                        'Content-Type': 'application/json',
                    },
                });

                // Check rety response and return data
                if(retryResponse.status === 200) {
                    return retryResponse.data;
                } else {
                    throw new Error(`Error after token refresh: ${retryResponse.statusText}`);
                }
        }

        //Rethrow the original error if it is not related invalid token
        throw error;
    }
};

export default makeApiRequest;