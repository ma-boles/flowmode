import dbConnect from "@/app/lib/utils/dbConnect";
import User from "@/app/lib/models/User";

export default async function handler(req, res) {
    if(req.methoed === 'POST') {
        const { spotifyId, email } = req.body;

        try {
            await dbConnect();

            // Query MongoDB to find the user by Spotify ID or email
            const user = await User.findOne({
                $or: [{ spotifyId }, { email }],
            });

            if(user) {
                return res.status(200).json({ isUser: true, user});
            } else {
                return res.status(200).json({ isUser: false});
            }
        } catch(error) {
            return res.status(500).json({ message: 'Error checking user', error});
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}