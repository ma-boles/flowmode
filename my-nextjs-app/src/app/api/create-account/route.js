import { getSession } from "next-auth/react";
import User from "../../lib/models/User";
import dbConnect from "@/app/lib/utils/dbConnect";

/*export async function handler(req, res) {
    console.log('Request method:', req.method);

    if(req.method === 'POST') {
        await handlePost(req, res);
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} not allowed`);
    }
}*/

export async function POST(req, res) {
    await dbConnect();


    if(req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} not allowed`);
    }

        try {
            const {spotifyId, spotifyName, email } = req.body;

            // check if user already exists
            let existingUser = await User.findOne({ email });

            if(existingUser) {
                return res.status(200).json({ message: 'User account already exists' });
            }

            // create new user
            const newUser = new User ({
                spotifyId,
                spotifyName,
                email,
            });

            await newUser.save();
            return res.status(201).json({ message: 'User account created successfully'});
        } catch(error) {
            console.error('Error creating user account:', error);
            return res.status(500).json({ message: 'Failed to create user account', error: error.message});
        }
};
/*
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
        console.error('Error creating user account:', error.message);
        return res.status(500).json({ message: 'Error creating user account' });
    }
};

*/