import React, { useState } from "react";
import ellipsis from "../images/ellipsis-solid.svg";
import MoveBookButton from "./MoveBookButton";


export default function EllipsisButton({ id, book, shelfName, onMoveBook, onRemove, currentShelf, targetShelf, children, onEllipsisClick, handleMoveClick, handleRemoveClick }) {
    
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
        className="mx-auto h-6 filter invert cursor-pointer" 
        onClick={handleEllipsisClick}
        />

        {isEllipsisVisible && (
             <div className="absolute z-10 w-40 ml-8 hidden ronded-md book--add" id={`book--add ${id}`} style={ellipsisStyles}>

             <ul className="p-0 m-0">
                 <li className="m-0 w-full text-sm font-normal">
                     <MoveBookButton 
                     book={book} 
                     targetShelf="bookshelf" 
                     currentShelf={shelfName}
                     actionType="move" 
                     handleMoveBook={handleMoveClick}/>
                 </li>
                 <li className="m-0 w-full text-sm font-normal">
                     <MoveBookButton 
                     book={book} 
                     targetShelf="queue" 
                     currentShelf={shelfName}
                     actionType="move" 
                     handleMoveBook={handleMoveClick}/>
                 </li>
                 <li className="m-0 w-full text-sm font-normal">
                     <MoveBookButton 
                     book={book} 
                     targetShelf="readingList"
                     currentShelf={shelfName} 
                     actionType="move" 
                     handleMoveBook={handleMoveClick}/>
                 </li>

                 <li className="m-0 w-full text-sm font-normal">
                     <MoveBookButton 
                     book={book} 
                     id={id}
                     actionType="remove" 
                     handleRemoveBook={handleRemoveClick} 
                     shelfName={shelfName}/>
                 </li>

             </ul>
         </div> 
        )}
        </>
    )
}