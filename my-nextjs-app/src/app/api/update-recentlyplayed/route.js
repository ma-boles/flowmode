import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/utils/dbConnect";
import User from "@/app/lib/models/User";

export async function POST(req) {
    try {
        const { spotifyId, email, flowPlaylistName, restPlaylistName } = await req.json(); // Get values from request values

        await dbConnect(); // Connect to database

        // Find user
        const user = await User.findOne({
            $or: [{ spotifyId }, { email }],
        });

        if(!user)  {
            throw new Error('User not found');
        }

        // Get the current date and time
        const currentTimestamp = new Date();

        // Log received data for debugging
        console.log('Updating for email or spotifyId:', email, spotifyId);
        console.log('Flow Playlist:', flowPlaylistName);
        console.log('Rest Playlist:', restPlaylistName);

        // Update the flow and rest titles within the mostRecentlyPlayed array
        await User.updateOne(
            { $or: [{ spotifyId }, { email }] }, // Match spotifyId or email to update
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
                        $slice: -2, // Keeps most recent 2 titles
                    }
                }
            }
        );

        // Limit the array size to the 2 most recent entries
        /*await User.updateOne(
            { $or: [{ spotifyId }, { email }] },
            {
                $set: {
                    mostRecentlyPlayed: {
                        $slice: -2 // Keeps most recent 2
                    }
                }
            }
        );*/
        return NextResponse.json({ message: 'Update succesful'});
    } catch (error) {
        console.error('Error updating recently played:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}