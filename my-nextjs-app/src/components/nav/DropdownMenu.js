import React, { useState } from "react";
import '@/app/styles/styles.css';
import Link from "next/link";
import Modal from "../Modal";
import { signOut } from "next-auth/react";

const DropdownMenu = () => {

    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <div /*dropdown content */ className="flex absolute right-0 dropdown-content">
            <div /* submenu left */ className="flex flex-col ">
                <ul classname="flex flex-col">
                    <button className="flex w-full text-left hover:bg-blue-600 transition duration-300 ease-in-out dropdown-link" onClick={() => setIsOpen(true)}>
                        <div className="transparent">
                            <img src="caret-left-solid.svg" className="m-auto mr-2 w-5 h-5 invert"></img>
                        </div>
                        Account
                    </button>
                    <Link href="/get-started">
                        <div className="flex hover:bg-blue-600 transition duration-300 ease-in-out dropdown-link">
                            <div className="transparent">
                                <img src="circle-info-solid (1).svg" className="m-auto mr-2 w-5 h-5 invert"></img>
                            </div>
                            Get Started
                        </div>
                    </Link>
                    <Link href="/about">
                        <div className="flex hover:bg-blue-600 transition duration-300 ease-in-out dropdown-link">
                            Mission・Story
                        </div>
                    </Link>
                </ul>
            </div>
            <div /* submenu right */>
                <ul className="flex flex-col">
                    <Link href='/profile'>
                        <div className="flex hover:bg-blue-600 transition duration-300 ease-in-out dropdown-link">
                            <div className="transparent">
                                <img src="user-regular.svg" className="m-auto mr-4 w-4 h-4 invert"></img>
                            </div>
                        Profile
                        </div>
                    </Link>
                    <Link href='/search'>
                        <div className="flex hover:bg-blue-600 transition duration-300 ease-in-out dropdown-link">
                            <div className="transparent">
                                <img src="magnifying-glass-solid.svg" className="m-auto mr-4 w-4 h-4 invert"></img>
                            </div>
                            Search
                        </div>
                    </Link>
                    <button onClick={() => signOut('spotify')} className="flex w-full text-left hover:bg-red-600 transition duration-300 ease-in-out dropdown-link">
                        <div className="transparent">
                            <img src="right-from-bracket-solid.svg" className="m-auto mr-2 w-6 h-6 invert"></img>
                        </div>
                        Log Out
                    </button>
                </ul>
            </div>
        </div>
             {/* Opt In modal */}
                <div className="centered">
                    {isOpen && <Modal setIsOpen={setIsOpen} />}
                </div>
      </>
    )
  }
  export default DropdownMenu;