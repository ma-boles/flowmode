import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/utils/dbConnect";
import { getToken } from "next-auth/jwt";
import User from "@/app/lib/models/User";
//import { getAuthenticatedUser } from "@/app/lib/utils/getAuthenticatedUser";


export async function GET(req) {
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

        // Return user-specific data
            return NextResponse.json({
                mostRecentlyPlayed: user.mostRecentlyPlayed,
                // add time data
                // add favorites data
            }, { status: 200 });
        } catch (error) {
            return NextResponse.json({ error: 'Something went wrong'}, { status: 500 });
        }
}