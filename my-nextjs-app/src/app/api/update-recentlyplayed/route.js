import dbConnect from "@/app/lib/utils/dbConnect";
import User from "@/app/lib/models/User";

export async function POST(req) {
    try {
        const { userId, flowTitle, restTitle } = await req.json(); // Get values from request values

        await dbConnect(); // Connect to database

        const user = await User.findById(userId);
        if(!user) {
            return new Response(JSON.stringify({ error: 'User not found '}),{
                status: 404,
            });
        }
        // Get the current date and time
        const currentTimestamp = new Date();

        // Find the user by ID and update the flow n rest titles within the mostRecentlyPlayed array
        await User.updateOne(
            {_id: userId}, // Find the user by unique ID
            {
                $set:{
                    'mostRecentlyPlayed.0.flow.title': flowTitle, // Update the flow title
                    'mostRecentlyPlayer.0.flow.lastUpdated': currentTimestamp, // Update timestamp
                    'mostRecentlyPlayed.0.restTitle': restTitle, // Update the rest title
                    'mostRecentlyPlayer.0.rest.lastUpdated': currentTimestamp, // Update timestamp
                },
            }
        );
        return new Response(JSON.stringify({ message: 'Updated successfully' }), {
            status: 200,
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to update' }), {
            status: 500,
        });
    }
}