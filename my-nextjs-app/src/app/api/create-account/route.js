import { getSession } from "next-auth/react";
import User from "../../lib/models/User";
import dbConnect from "@/app/lib/utils/dbConnect";
import { NextResponse } from "next/server";


export async function POST(req, res) {
    await dbConnect();


        try {
            const {spotifyId, spotifyName, email } = await req.json();

            if(!spotifyId || !spotifyName || !email) {
                return NextResponse.json({ message: 'All field are required'}, { status: 400 });
            }

            // check if user already exists
            let existingUser = await User.findOne({ email });

            if(existingUser) {
                return NextResponse.json({ message: 'User account already exists'}, { status: 200 });
            }

            // create new user
            const newUser = new User ({
                spotifyId,
                spotifyName,
                email,
            });

            await newUser.save();
            return NextResponse.json({ message: 'User account created successfully' }, { status: 201 });
        } catch(error) {
            console.error('Error creating user account:', error);
            return NextResponse.json({ message: 'Failed to create user account'}, { status: 500 });
        }
};