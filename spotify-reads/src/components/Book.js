import React from "react";
import "../styles/Book.css"

import ellipsis from "../images/ellipsis-solid.svg";
import cover from "../images/image-solid.svg";
import plus from "../images/plus-solid.svg";
import remove from "../images/trash-solid.svg"

export default function Book() {

    function handleEllipsisClick () {
        var bookAdd = document.getElementById("book--add");
        bookAdd.style.display = (bookAdd.style.display === 'none') ? 'block' : 'none'
    };

    function add (){
        var addOptions = document.getElementById("addlist--add--options");
        addOptions.style.display = (addOptions.style.display === 'none') ? 'block' : 'none'
    }
    
    return (
        <>
        <div className="book--container">

            <div className="book--card">
                <img src={cover} alt="book cover" className="book--cover"></img>

                
                <div className="book--info">
                
                    book title<br/>
                    author<br/><br/>
                    <strong><p className="book--p--time">10hr 25min</p></strong>

                </div>

            </div>

            <img src={ellipsis} alt="ellipsis" className="book--ellipsis" onClick={handleEllipsisClick}></img><br/>

            <div className="book--add" id="book--add">

                <ul className="addlist">
                    <li className="addlist--add">
                        <button className="addlist--button" onClick={add}>
                            <img src={plus} className="book--icon"></img>
                            Add</button>
                    </li>

                    <li className="addlist--remove">
                        <button className="addlist--button">
                            <img src={remove} className="book--icon"></img>Remove</button>
                    </li>

                </ul>
            </div> 

            <div className="addlist--add--options" id="addlist--add--options">
                <li className="addlist--li">
                    <button className="addlist--button">Add to Bookshelf</button>
                </li>
                <li className="addlist--li">
                    <button className="addlist--button">Add to Queue</button>
                </li>
                <li className="addlist--li">
                    <button className="addlist--button">Add to Reading List</button>
                </li>
            </div>
                
        </div>
            
        </>
    )
}