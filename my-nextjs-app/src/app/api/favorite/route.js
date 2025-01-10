import { NextResponse } from "next/server";
import User from "@/app/lib/models/User";
import { getToken } from "next-auth/jwt";
import dbConnect from "@/app/lib/utils/dbConnect";

export async function handler(req) {

    //Handle POST request (Add Favorite)
    if(req.method === 'POST') {
        try {
            // Retrieve the JWT from the request
            const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

            if (!token) {
                return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
            }

            const { spotifyId, email } = token;

            await dbConnect(); // Connect to database

            // Find user based on spotifyId or email
            const user = await User.findOne({
                $or: [{ spotifyId }, { email }],
            });

            if(!user)  {
                return NextResponse.json({ error: 'User not found'}, { status: 404 });
            }

            // Extract favoritesTitle from request body
            const { favoritesTitle } = await req.json();

            if(!favoritesTitle) {
                return NextResponse.json({ error: 'Favorites title required' }, { status: 400 });
            }

            // Log received data for debugging
            console.log('Favorites title:', favoritesTitle);

            // Update the flow and rest titles within the mostRecentlyPlayed array
            await User.updateOne(
                { $or: [{ spotifyId: user.spotifyId }, { email: user.email }] }, // Match spotifyId or email to update
                {
                    $push: {
                        favorites: {
                            title: favoritesTitle,
                        },
                        $set: {
                            favorites: {
                                $slice: 5
                            } // Keeps up to 5 titles
                        }
                    }
                }
            );
            return NextResponse.json({ message: 'Update succesful'});
        } catch (error) {
            console.error('Error updating recently played:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
    }


    // Handle DELETE request (Remove Favorite)
    if(req.method === 'DELETE') {
        try {
            // Retrieve the JWT from the request
            const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

            if (!token) {
                return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
            }

            const { spotifyId, email } = token;

            await dbConnect(); // Connect to database

            // Find user based on spotifyId or email
            const user = await User.findOne({
                $or: [{ spotifyId }, { email }],
            });

            if(!user)  {
                return NextResponse.json({ error: 'User not found'}, { status: 404 });
            }

            // Extract favoritesId from request body
            const { favoritesId } =  req.jquery;

            if(!favoritesId) {
                return NextResponse.json({ error: 'Favorites ID required' }, { status: 400 });
            }

            // Log received data for debugging
            console.log('Favorite to delete:', favoritesId);

            // Update the flow and rest titles within the mostRecentlyPlayed array
            const result = await User.updateOne(
                { $or: [{ spotifyId: user.spotifyId }, { email: user.email }] }, // Match spotifyId or email to update
                {
                    $pull: {
                        favorites: {
                            _id: favoritesId,
                        },
                    }
                }
            );

            if(result.nModified === 0) {
                return NextResponse.json({ error: 'Favorite not found or deleted' }, { status: 400 });
            }
            return NextResponse.json({ message: 'Favorite removed successfully'});
        } catch (error) {
            console.error('Error deleting title from favorites:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
    }
}

