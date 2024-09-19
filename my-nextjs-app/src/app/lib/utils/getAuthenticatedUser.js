import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import dbConnect from "./dbConnect";
import User from "../models/User";


export async function getAuthenticatedUser (req) {
    // Retrieve the JWT from the request
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Extract spotifyId and email from the token
    const { spotifyId, email } = token; 

    await dbConnect(); // Connect to database

    // Query the database to find the user based on spotifyId or email
    const user = await User.findOne({
        $or: [{ spotifyId }, { email }]
    });

    // If user is not found, return an error
    if(!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Return the user object if found
    return { user };
}