import React, { useState } from "react";
import '@/app/styles/styles.css';
import Link from "next/link";
import Account from "../modals/AccountModal";
import { signOut } from "next-auth/react";

const DropdownMenu = () => {

    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <div /*dropdown content */ className="flex absolute right-0 dropdown-content flex-col">
                <ul className="flex flex-col">
                    <button className="flex w-full text-left hover:bg-green-600 transition duration-300 ease-in-out dropdown-link" onClick={() => setIsOpen(true)}>
                        <div className="transparent">
                            <img src="caret-left-solid.svg" className="m-auto mr-2 w-5 h-5 invert"></img>
                        </div>
                        Create Profile
                    </button>
                    <Link href='/profile'>
                        <div className="flex hover:bg-green-600 transition duration-300 ease-in-out dropdown-link">
                            <div className="transparent">
                                <img src="user-regular.svg" className="m-auto mr-4 mt-1 w-4 h-4 invert"></img>
                            </div>
                        Profile
                        </div>
                    </Link>
                    {/*<Link href='/search'>
                        <div className="flex hover:bg-green-600 transition duration-300 ease-in-out dropdown-link">
                            <div className="transparent">
                                <img src="magnifying-glass-solid.svg" className="m-auto mr-4 mt-1 w-4 h-4 invert"></img>
                            </div>
                            Search
                        </div>
                    </Link>*/}
                    <Link href="/get-started">
                        <div className="flex hover:bg-green-600 transition duration-300 ease-in-out dropdown-link">
                            <div className="transparent">
                                <img src="circle-info-solid (1).svg" className="m-auto mr-4 mt-1 w-4 h-4 invert"></img>
                            </div>
                            Get Started
                        </div>
                    </Link>
                    <Link href="/about">
                        <div className="flex hover:bg-green-600 transition duration-300 ease-in-out dropdown-link">
                            <div className="transparent">
                                <img src="pen-to-square-regular (1).svg" className="m-auto mr-4 mt-1 w-4 h-4 invert"></img>
                            </div>
                            Mission・Story
                        </div>
                    </Link>
                    <button onClick={() => signOut('spotify')} className="flex bg-red-600 w-full text-left hover:bg-gray-600 transition duration-300 ease-in-out dropdown-link">
                        <div className="transparent">
                            <img src="right-from-bracket-solid.svg" className="m-auto mr-2 w-6 h-6 invert"></img>
                        </div>
                        Log Out
                    </button>
                </ul>
            </div>
            {/* Account modal */}
            <div className="centered">
                {isOpen && <Account setIsOpen={setIsOpen} />}
            </div>
      </>
    )
  }
  export default DropdownMenu;

/*
 <div /*dropdown content *//* className="flex absolute right-0 dropdown-content flex-col">
 <div className="w-full">
 <button>Create Profile</button>
</div>
 <div /* submenu left *//* className="flex flex-row ">
     <ul className="flex flex-col">
         <button className="flex w-full text-left border-t border-l border-white hover:bg-green-600 transition duration-300 ease-in-out dropdown-link" onClick={() => setIsOpen(true)}>
             <div className="transparent">
                 <img src="caret-left-solid.svg" className="m-auto mr-2 w-5 h-5 invert"></img>
             </div>
             Account
         </button>
         <Link href="/get-started">
             <div className="flex border-l border-white hover:bg-green-600 transition duration-300 ease-in-out dropdown-link">
                 <div className="transparent">
                     <img src="circle-info-solid (1).svg" className="m-auto mr-2 w-5 h-5 invert"></img>
                 </div>
                 Get Started
             </div>
         </Link>
         <Link href="/about">
             <div className="flex border-b border-l border-white hover:bg-green-600 transition duration-300 ease-in-out dropdown-link">
                 Mission・Story
             </div>
         </Link>
     </ul>
 </div>
 <div /* submenu right *//* className="flex flex-row">
     <ul className="flex flex-col">
         <Link href='/profile'>
             <div className="flex border-t border-r border-white hover:bg-green-600 transition duration-300 ease-in-out dropdown-link">
                 <div className="transparent">
                     <img src="user-regular.svg" className="m-auto mr-4 w-4 h-4 invert"></img>
                 </div>
             Profile
             </div>
         </Link>
         <Link href='/search'>
             <div className="flex border-r border-white hover:bg-green-600 transition duration-300 ease-in-out dropdown-link">
                 <div className="transparent">
                     <img src="magnifying-glass-solid.svg" className="m-auto mr-4 w-4 h-4 invert"></img>
                 </div>
                 Search
             </div>
         </Link>
         <button onClick={() => signOut('spotify')} className="flex bg-red-600 border-b border-r border-white w-full text-left hover:bg-gray-600 transition duration-300 ease-in-out dropdown-link">
             <div className="transparent">
                 <img src="right-from-bracket-solid.svg" className="m-auto mr-2 w-6 h-6 invert"></img>
             </div>
             Log Out
         </button>
     </ul>
 </div>
<div className="flex flex-col">
 <button>Log Out</button>
</div>
</div>

*/