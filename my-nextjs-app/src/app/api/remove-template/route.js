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

        // Extract templateTitle from request body
        const { templateTitle } = await req.json();

        if(!templateTitle) {
            return NextResponse.json({ error: 'Template title required' }, { status: 400 });
        }

        // Log received data for debugging
        console.log('Template to delete:', templateTitle);

        // Update the templates array
        const result = await User.updateOne(
            { $or: [{ spotifyId }, { email }] }, // Match spotifyId or email to update
            {
                $pull: {
                    templates: {
                        title: templateTitle,
                    },
                }
            }
        );

        // Check if a document was matched and updated
        if(result.matchedCount === 0) {
            return NextResponse.json({ error: 'User not found'}, { status: 404 });
        }

        if(result.modifiedCount === 0) {
            return NextResponse.json({ message: 'Template not found or already removed'}, { status: 404 });
        }

        return NextResponse.json({ message: 'Template removed successfully'});
    } catch (error) {
        console.error('Error deleting title from templates:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}