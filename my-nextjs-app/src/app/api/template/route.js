import { NextResponse } from "next/server";
import User from "@/app/lib/models/User";
import { getToken } from "next-auth/jwt";
import dbConnect from "@/app/lib/utils/dbConnect";

export async function handler(req) {
    // Handle POST request (Add Template)
    if(req.method === 'POST') {
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
    
            // Extract flow playlist name, rest playlist name, template title from request body
            const { flowPlaylistName, flowPlaylistId, restPlaylistName, restPlaylistId, title } = await req.json();
    
            if(!flowPlaylistName && !restPlaylistName) {
                return NextResponse.json({ error: 'Flow and Rest titles required' }, { status: 400 });
            }
    
            // Log received data for debugging
            console.log('Flow + Rest titles:', flowPlaylistName, restPlaylistName);
    
            // Determine the default title if title is missing
            const templateCount = user.templates.length;
            const templateTitle = title || `Template #${templateCount + 1}`;
    
            // Update the flow and rest titles within the templates array
            await User.updateOne(
                { $or: [{ spotifyId: user.spotifyId }, { email: user.email }] }, // Match spotifyId or email to update
                {
                    $push: {
                        templates: {
                            title: templateTitle,
                            flow: flowPlaylistName,
                            flowId: flowPlaylistId,
                            rest: restPlaylistName,
                            restId: restPlaylistId
                        },
                        $set: {
                            templates: {
                                $slice: 10
                            } // Keeps up to 10 templates
                        }
                    }
                }
            );
            return NextResponse.json({ message: 'Update succesful'});
        } catch (error) {
            console.error('Error updating templates:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
    }

    // Handle PUT request (Update Template Title)
    if(req.method === 'PUT') {
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

              // Extract templateId and newTitle from reuqest body
              const { templateId, newTitle } = await req.body();

              if(!templateId || !newTitle) {
                return NextResponse.json({ error: 'Template ID and new title are required' }, { status: 400 });
              }

              // Find the template by ID within the user's templates array 
              const templateIndex = user.templates.findIndex(template => template._id.toString() === templateId);

              if(templateIndex === -1) {
                return NextResponse.json({ error: 'Template not found' });
              }

              // Update the title of the template
              user.templates[templateIndex].title = newTitle;

              // Save the updated user document
              await user.save();

              return NextResponse.json({ message: 'Template title updated successfully' });
        } catch(error) {
            console.error('Error updating template:', error);
            return NextResponse.jso({ error: 'Failed to update template title' }, { status: 500 });
        }
    }

    // Handle DELETE request (Remove Template)
    if(req.method === 'DELETE') {
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
    
            // Extract templateId from request body
            const { templateId } = req.query;
    
            if(!templateId) {
                return NextResponse.json({ error: 'Template ID required' }, { status: 400 });
            }
            
            // Log received data for debugging
            console.log('Template to delete:', templateId);
    
            // Update the templates array
            const result = await User.updateOne(
                { $or: [{ spotifyId: user.spotifyId }, { email: user.email }] }, // Match spotifyId or email to update
                {
                    $pull: {
                        templates: {
                            _id: templateId,
                        },
                    }
                }
            );

            if(result.modifiedCount === 0) {
                return NextResponse.json({ error: 'Template not found or not deleted' }, { status: 400 });
            }
            
            return NextResponse.json({ message: 'Template removed successfully'});
        } catch (error) {
            console.error('Error deleting title from templates:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
    }
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}