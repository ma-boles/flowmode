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

        // Extract templateTitle from request body
        const { templateTitle } = await req.json();

        if(!templateTitle) {
            return NextResponse.json({ error: 'Template title required' }, { status: 400 });
        }
        
        // Log received data for debugging
        console.log('Template to delete:', templateTitle);

        // Update the templates array
        await User.updateOne(
            { $or: [{ spotifyId: user.spotifyId }, { email: user.email }] }, // Match spotifyId or email to update
            {
                $pull: {
                    templates: {
                        title: templateTitle,
                    },
                }
            }
        );
        return NextResponse.json({ message: 'Template removed successfully'});
    } catch (error) {
        console.error('Error deleting title from templates:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}