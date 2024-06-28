/*import React, { useState } from "react";
import BookSection from "./BookSection";

export default function ShelfSection({ title, books, onAddToBookshelf, onAddToQueue, onAddToReadingList }) {

    const [ bookStates, setBookStates ] = useState(
        books.reduce((acc, book) => {
            acc[book.id] = { isEllipsisVisible: false, isAddOptionsVisible: false };
            return acc;
        }, {})
    );

    const handleEllipsisClick = (bookId) => {
        setBookStates((prevStates) => ({
            ...prevStates,
            [bookId]: {...prevStates[bookId], isEllipsisVisible: !prevStates[bookId].isEllipsisVisible },
        }));
    };

    const toggleAddOptions = (bookId) => {
        setBookStates((prevStates) => ({
            ...prevStates,
            [bookId]: {...prevStates[bookId], isAddOptionsVisible: !prevStates[bookId].isAddOptionsVisible },
        }));
    };


    // add logic 
    const handleAddToBookshelf = (book) => {
        //check if the book is already in shelf
        if(!bookshelfBooks.some((b) => b.id === book.id)) {
            //add book to shelf 
            setBookshelfBooks((prevBooks) => [...prevBooks, book]);
            console.log('Book added to bookshelf:', book);
        } else {
            console.log('Book is already in bookshelf:', book);
        }
    };

    const handleAddToQueue = (book) => {
        if(!queueBooks.some((b) => b.id === book.id)) {
            setQueueBooks((prevBooks) => [...prevBooks, book]);
            console.log('Book added to queue:', book);
        } else {
            console.log('Book already in queue:', book);
        }
    };

    const handleAddToReadingList = (book) => {
        if(!readingListBooks.some((b) => b.id === book.id)) {
            setReadingListBooks((prevBooks) => [...prevBooks, book]);
            console.log('Book added to reading list:', book);
        } else {
            console.log('Book already in reading list:', book);
        }
    };
    

    // remove logic
    const handleRemoveFromBookshelf = (book) => {
        setBookshelfBooks((prevBooks) => prevBooks.filter((b) => b.id !== book.id));
        console.log('Book removed from shelf:', book);
    };

    const handleRemoveFromQueue = (book) => {
        setQueueBooks((prevBooks) => prevBooks.filter((b) => b.id !== book.id ));
        console.log('Book removed from queue:', book);
    };

    const handleRemoveFromReadingList = (book) => {
        setReadingListBooks((prevBooks) => prevBooks.filter((b) => b.id !== book.id));
        console.log('Book removed from reading list:', book);
    };

    return(
        <>
        <BookSection
        title={title}
        books={books}
        bookStates={bookStates}
        handleEllipsisClick={handleEllipsisClick}
        toggleAddOptions={toggleAddOptions}
        onAddToBookshelf={onAddToBookshelf}
        onAddToQueue={onAddToQueue}
        onAddToReadingList={onAddToReadingList}/>
        </>
    )
}*/

/*import { encodeVerifier, encodeChallenge } from 'pkce-challenge';
import { providers } from 'next-auth/providers';


const generatePkcePair = () => {
    const verifier = encodeVerifier();
    const challenge = encodeChallenge(verifier);
    return { verifier, challenge };
};

const spotifyProvider = providers.Spotify({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    state: true,
    pkce: true,
    authorizationUrl: 'https://accounts.spotify.com/authorize',
    pkceMethod: 'S256',
    getAuthorizationUrl: (params) => {
        const pkcePair = generatePkcePair();

        // log the generated pcke pair
        console.log('Generated PKCE pair:', pkcePair);

        return {
            ...params,
            code_challenge: pkcePair.challenge,
            code_challenge_method: 'S256',
            code_verifier: pkcePair.verifier,
        };
    },
});

export default spotifyProvider;*/



/*import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import { NextAuth } from "next-auth";
import { generatePkcePair } from "./spotify";
import axios from "axios";


export default async function Callback({ query }) {
    const router = useRouter();
    const session = await getSession();

    console.log('Starting authentication callback...')

    if(session) {
        // user is authenticated, redirect them to shelf page
        console.log('User is authenticated. Redirecting to /shelf/page');
        router.push('/shelf');
        return null;
    }

    const { code } = query;

    if(!code) {
        // handle error: authorization code not found in query parameters
        console.error('Error: Athorization code not found in quey parameters');
        return <>Error: Authorization code not found</>;
    }

    // use the imported generatePkePair function 
    const pkcePair = generatePkcePair();

    console.log('Generated PCKE pair:', pkcePair);

    // exchange authorization code for access token
    try {
        console.log('Exhanging authorization code fora access token...');

        const response = await axios.post(
            'https://accounts.spotify.com/api/token',
            {
                code,
                grant_type: 'authorization_code',
                redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
                client_id: process.env.SPOTIFY_CLIENT_ID,
                client_secret: process.env.SPOTIFY_CLIENT_SECRET,
                code_verifier: pkcePair.verifier,
            },
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );

        const { access_token, refresh_token, expires_in } = response.data;

        console.log('Authentication seccessful');

        // handle the obtained token as needed

        return <>Authentication successful</>;

    } catch (error) {
        console.error('Error exchanging authorization code for access token:', error);
        return <>Error exchanging authorization code for access token</>;
    }
}*/


/*import NextAuth from "next-auth/next";
import SpotifyProvider from "next-auth/providers/spotify";

export const {
    handlers,
    auth, 
    signIn,
    signOut
} = NextAuth({
    providers: [
        SpotifyProvider({
            clientId: process.env.SPOTIFY_CLIENT_ID,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async redirect(url, baseUrl) {
            return '/shelf';
        },
    },
});


export default NextAuth ({
    providers: [
        SpotifyProvider({
            clientId: process.env.SPOTIFY_CLIENT_ID,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async redirect(url, baseUrl) {
            return '/shelf';
        },
    },
});*/