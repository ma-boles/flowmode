import React from "react";
import { ShelfContext, useShelfContext } from "@/app/contexts/ShelfContext";
import EllipsisButton from "./EllipsisButton";


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
                    <img src="/image-solid.svg" alt="book cover" className="mx-auto h-40"></img>
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

/*return (
    <div>
        <div className="inline text-center">
            <div className="mt-4 mr-4 ml-4 text-center w-48 h-72 rounded-lg book--card">
                <img src="/image-solid.svg" alt="book cover" className="mx-auto h-40"></img>
                <div className="text-left mx-4">
                    {book.title}<br/>
                    {book.author}<br/><br/>
                    <strong><p className="book--p--time">{book.book_time}</p></strong>
                </div>
            </div>
            <br/>
        </div>
    </div>
)
}*/