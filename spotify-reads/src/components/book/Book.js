import React from "react";
import { ShelfContext, useShelfContext } from "../../../../spotify-reads/src/components/ShelfContext";


export default function Book({ isEllipsisVisible, shelfName }) {

    const { shelves } = useShelfContext();

    const shelfBooks = shelves[shelfName] || [];

    
    if(shelfBooks.length === 0) {
        return null;
    };

    const ellipsisStyles = {
        display: isEllipsisVisible ? 'block' : 'none',
    };


    return (
            <div className="inline-flex">
                {shelfBooks.map((book) => (
                    <div key={book.id} className="mt-4 mr-4 ml-4 text-center w-18 h-72 rounded-lg book--card">
                    <img src="/image-solid.svg" alt="book cover" className="mx-auto p-2 h-40"></img>
                    <div className="text-left mx-4">
                    {book.title && <> {book.title}<br/></>}
                    {book.author && <>{book.author}<br/><br/></>}
                    <strong><p className="book--p--time">{book.book_time}</p></strong>
                    </div>
                    </div>
              ))}
                <br/>
            </div>
    );
};