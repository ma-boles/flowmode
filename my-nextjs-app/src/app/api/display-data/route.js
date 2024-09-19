import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/app/lib/utils/getAuthenticatedUser";


export async function GET(req) {
    try {
        // Use the utility function to get the authenticated user 
        const { user, error, status } = await getAuthenticatedUser(req);

        // Handle errors
        if(error) {
            return NextResponse.json({ error }, { status });
        }

        // Return user-specific data
            return NextResponse.json({
                flowTitle: user.mostRecentlyPlayed[0]?.flow?.title,
                restTitle: user.mostRecentlyPlayed[0]?.rest?.title,
            }, { status: 200 });
        } catch (error) {
            return NextResponse.json({ error: 'Something went wrong '}, { status: 500 });
        }
}