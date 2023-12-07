import React, { useState } from "react";
import ellipsis from "../images/ellipsis-solid.svg";
import MoveBookButton from "./MoveBookButton";
import "../styles/Book.css"


export default function EllipsisButton({ id, book, shelfName, onMoveBook, onRemove, onEllipsisClick, handleRemoveClick }) {
    
    // ellipsis click logic
    const [ isEllipsisVisible, setIsEllipsis ] = useState(false);
    
    const handleEllipsisClick = () => {
    setIsEllipsis(!isEllipsisVisible);
    onEllipsisClick(!isEllipsisVisible);
    };

    const ellipsisStyles = {
        display: isEllipsisVisible ? 'block' : 'none',
    };
    
    return(
        <>
        <img
        src={ellipsis} 
        alt="ellipsis" 
        className="book--ellipsis" 
        onClick={handleEllipsisClick}
        />

        {isEllipsisVisible && (
             <div className= "book--add" id={`book--add ${id}`} style={ellipsisStyles}>

             <ul className="addlist">

                 <li className="addlist--li">
                     <MoveBookButton book={book} targetShelf="Bookshelf" actionType="move" onMoveBook={onMoveBook}/>
                 </li>
                 <li className="addlist--li">
                     <MoveBookButton book={book} targetShelf="Queue" actionType="move" onMoveBook={onMoveBook}/>
                 </li>
                 <li className="addlist--li">
                     <MoveBookButton book={book} targetShelf="Reading List" actionType="move" onMoveBook={onMoveBook}/>
                 </li>

                 <li className="addlist--remove">
                     <MoveBookButton book={book} actionType="remove" 
                     handleRemoveBook={handleRemoveClick}/>
                 </li>

             </ul>
         </div> 
        )}
        </>
    )
}