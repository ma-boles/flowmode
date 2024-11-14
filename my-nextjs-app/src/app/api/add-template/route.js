import { NextResponse } from "next/server";
import User from "@/app/lib/models/User";
import { getToken } from "next-auth/jwt";
import dbConnect from "@/app/lib/utils/dbConnect";

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

        // Extract flow playlist name, rest playlist name, template title from request body
        const { flowPlaylistName, restPlaylistName, title } = await req.json();

        if(!flowPlaylistName && !restPlaylistName) {
            return NextResponse.json({ error: 'Flow and Rest titles required' }, { status: 400 });
        }

        // Log received data for debugging
        console.log('Flow + Rest titles:', flowPlaylistName, restPlaylistName);

        // Determine the default title if title is missing
        const templateCount = user.templates.length;
        const templateTitle = title || `Template #${templateCount + 1}`;

        // Update the flow and rest titles within the templates array
        await User.updateOne(
            { $or: [{ spotifyId: user.spotifyId }, { email: user.email }] }, // Match spotifyId or email to update
            {
                $push: {
                    templates: {
                        title: templateTitle,
                        flow: flowPlaylistName,
                        rest: restPlaylistName
                    },
                    $set: {
                        templates: {
                            $slice: 10
                        } // Keeps up to 10 templates
                    }
                }
            }
        );
        return NextResponse.json({ message: 'Update succesful'});
    } catch (error) {
        console.error('Error updating templates:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}