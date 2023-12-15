import React from "react";

import cover from "../images/image-solid.svg";


export default function Book({ book, isEllipsisVisible }) {

    const ellipsisStyles = {
        display: isEllipsisVisible ? 'block' : 'none',
    };

    return (
        <>
        <div className="inline text-center">

            <div className="mt-4 mr-4 ml-4 text-center w-48 h-72 rounded-lg book--card">
                <img src={cover} alt="book cover" className="mx-auto h-40"></img>

                <div className="text-left mx-4">
                    {book.title}<br/>
                    {book.author}<br/><br/>
                    <strong><p className="book--p--time">{book.book_time}</p></strong>
                </div>
            </div>
            <br/>
        </div>
        </>
    )
}