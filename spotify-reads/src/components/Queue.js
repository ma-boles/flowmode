import React from "react";
import BookSection from "./BookSection";

export default function Queue() {
    const books = [
        
    ]

    return (
        <>
            <div className="queue--container">
                <BookSection books={books}/>
            </div>
        </>
    )
}
