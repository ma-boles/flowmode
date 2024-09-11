import dbConnect from "@/app/lib/utils/dbConnect";
import User from "@/app/lib/models/User";

export async function POST(req) {

        try {
            const { spotifyId, email } = await req.json();

            await dbConnect();

            // Query MongoDB to find the user by Spotify ID or email
            const user = await User.findOne({
                $or: [{ spotifyId }, { email }],
            });

            if(user) {
                return new Response(JSON.stringify({isUser:true, user}), {
                    status: 200,
                    headers: { 'Content-Type': 'application/json '}
                });
            } else {
                return new Response(JSON.stringify({ isUser: false }), {
                    status: 200,
                    headers: { 'Content-Type': 'application/json '}
                });
            }
        } catch(error) {
            return new Response(JSON.stringify({ message: 'Error checking user', error}), {
                status: 500,
                headers: { 'Content-Type': 'application/json '}
            });
        }
}