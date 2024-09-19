import { NextResponse } from "next/server";
import User from "@/app/lib/models/User";
import { getToken } from "next-auth/jwt";
import dbConnect from "@/app/lib/utils/dbConnect";
//import { getAuthenticatedUser } from "@/app/lib/utils/getAuthenticatedUser";

export async function POST(req) {
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

        // Playlist update logic continued
        const { flowPlaylistName, restPlaylistName } = await req.json(); // Get values from request values
        const currentTimestamp = new Date();

        // Log received data for debugging
        console.log('Updating for email or spotifyId:', email, spotifyId);
        console.log('Flow Playlist:', flowPlaylistName);
        console.log('Rest Playlist:', restPlaylistName);

        // Update the flow and rest titles within the mostRecentlyPlayed array
        await User.updateOne(
            { $or: [{ spotifyId: user.spotifyId }, { email: user.email }] }, // Match spotifyId or email to update
            {
                $push: {
                    "mostRecentlyPlayed": {
                        $each: [{
                            flow: {
                                title: flowPlaylistName,
                                lastUpdated: currentTimestamp,
                            },
                            rest: {
                                title: restPlaylistName,
                                lastUpdated: currentTimestamp,
                            }
                        }],
                        $position: 0, // Inserts new value at the beginning
                        $slice: 2, // Keeps up to 2 titles
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

