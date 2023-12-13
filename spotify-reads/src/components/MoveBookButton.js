import React from "react";
import { useShelfContext } from "./ShelfContext";

import plus from "../images/plus-solid.svg";
import remove from "../images/trash-solid.svg";

export default function MoveBookButton({ book, shelfName
    , targetShelf, actionType, currentShelf, onMoveBook, onRemove }) {
        const { handleMoveBook } = useShelfContext();
        const { handleRemoveBook } = useShelfContext();

    const handleButtonClick = () => {
        if(actionType === 'move') {
            // add logic for moving a book
            handleMoveBook(book, currentShelf, targetShelf);
        } else if (actionType === 'remove') {
            //logic for removing book
            handleRemoveBook(book, shelfName);
        }
    };

    return(
        <>
            <button onClick={handleButtonClick} className="bg-transparent w-full p-2 cursor-pointer m-0 text-left border-none hover:bg-gray-300">
                {actionType === 'move' ? (<img src={plus} alt="add" className="book--icon"></img>) : (<img src={remove} alt="remove" className="book--icon"></img>)}
                {actionType === 'move' ? `Add to ${targetShelf}`: 'Remove'}
            </button>
        </>
    );
};