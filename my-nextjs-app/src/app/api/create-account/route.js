import User from "../../lib/models/User";
import dbConnect from "@/app/lib/utils/dbConnect";
import { NextResponse } from "next/server";


export async function POST(req) {
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

export async function DELETE(req) {
    await dbConnect();


        try {
            const { email } = await req.json();

            // find and delete user by email
            const user = await User.findOneAndDelete({ email });
            if(!user) {
                return NextResponse.json({ message: 'User not found'}, { status: 404 });
            }

            return NextResponse.json({ message: 'User account deleted successfully' }, { status: 200 });
        } catch(error) {
            console.error('Error deleting user account:', error);
            return NextResponse.json({ message: 'Failed to delete user account', error: error.message}, { status: 500 });
        }
}