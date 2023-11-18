import React from "react";
import Book from "./Book";

export default function BookShelf() {
    return (
        <>
            <div className="bookshelf--container">
                <Book />
                <Book />
                <Book />
                <Book />
                <Book />
            </div>
        </>
    )
}
