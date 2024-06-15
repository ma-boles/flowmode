import { getSession } from "next-auth/react";
import User from "../lib/models/User";
import { connectToDB } from "@/app/lib/utils";

export default async (req, res) => {
    await connectToDB();
    const session = await getSession({ req });

    if(!session) {
        return res.status(401).json({ message: 'Not authenticated' });
    }

    const { user } = session;
    try {
        let existingUser = await User.findOne({ spotifyId: user.id });
        if(!existingUser) {
            const newUser = new User ({
                spotifyId: user.id,
                spotifyName: user.name,
                email: user.email,
            });
            await newUser.save();
            return res.status(201).json({ message: 'User account created!' });
        } else {
            return res.status(200).json ({ message: 'User account already exists' });
        }
    } catch(error) {
        return res.status(500).json({ message: 'Error creating user account' });
    }
};

