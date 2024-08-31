import React from "react";
import '@/app/styles/styles.css';
import Link from "next/link";

const DropdownMenu = () => {
    return (
      <>
        <div className="border border-solid rounded-sm dropdown-content">
            <button className="flex w-full text-left border-b border-solid border-gray-600 hover:bg-blue-600 transition duration-300 ease-in-out dropdown-link" onClick={() => setIsOpen(true)}>
                <div className="transparent">
                      <img src="caret-left-solid.svg" className="m-auto mr-2 w-5 h-5 invert"></img>
                </div>
                  Account
            </button>

          <div className="relative flex border-b border-solid border-gray-600 hover:bg-blue-600 transition duration-300 ease-in-out aboutBtn">
            <div className="transparent">
              <img src="caret-left-solid.svg" className="m-auto mr-4 w-5 h-5 invert" alt="icon" />
            </div>
            About
                {/* Submenu for About */}
                <div className=" top-0 right-8">
                          <Link href="/get-started">
                            <div className="flex border-b border-solid border-gray-600 hover:bg-blue-600 transition duration-300 ease-in-out dropdown-link">
                              Get Started
                            </div>
                          </Link>
                          <Link href="/about">
                            <div className="flex border-b border-solid border-gray-600 hover:bg-blue-600 transition duration-300 ease-in-out dropdown-link">
                              Mission・Story
                            </div>
                          </Link>
                        </div>
                </div>      
                    <button onClick={() => signOut('spotify')} className="flex w-full text-left hover:bg-red-600 transition duration-300 ease-in-out dropdown-link">
                        <div className="transparent">
                            <img src="right-from-bracket-solid.svg" className="m-auto mr-2 w-6 h-6 invert"></img>
                        </div>
                        Log Out
                    </button>
                </div>
      </>
    )
  }
  export default DropdownMenu;




 /* mini about menus conditionally rendered 
 {currentPath ===  '/profile' && (
    <div /* mini menu about/start *//* className="aboutMenu">
        <Link href="/get-started">
            <div className="flex border-b border-solid border-gray-600 hover:bg-blue-600 transition duration-300 ease-in-out dropdown-link">
                Get Started
            </div>
        </Link>
        <Link href="/about">
            <div className="flex border-b border-solid border-gray-600 hover:bg-blue-600 transition duration-300 ease-in-out dropdown-link">
                Mission・Story
            </div>
        </Link>
    </div>
)}*//*}
{currentPath === '/search' && (
    <div /* mini menu about/start *//* className="aboutMenu">
        <Link href="/get-started">
            <div className="flex border-b border-solid border-gray-600 hover:bg-blue-600 transition duration-300 ease-in-out dropdown-link">
                Get Started
            </div>
        </Link>
        <Link href="/about">
            <div className="flex border-b border-solid border-gray-600 hover:bg-blue-600 transition duration-300 ease-in-out dropdown-link">
                Mission・Story
            </div>
        </Link>
    </div>
)}

{currentPath === '/about' && (
    <div /* mini menu about/start *//* className="aboutMenu2">
        <Link href="/get-started">
            <div className="flex border-b border-solid border-gray-600 hover:bg-blue-600 transition duration-300 ease-in-out dropdown-link">
                Get Started
            </div>
        </Link>
        <Link href="/about">
            <div className="flex border-b border-solid border-gray-600 hover:bg-blue-600 transition duration-300 ease-in-out dropdown-link">
                Mission・Story
            </div>
        </Link>
    </div>
)}


{/* Opt In modal *//*}
<div className="centered">
    {isOpen && <Modal setIsOpen={setIsOpen} />}
</div>


{/* navigation buttons *//* }
{currentPath === '/get-started' && (
    <div className="text-center rounded-md dropdown-nav">
        <button className="border border-solid border-green-600 font-semibold dropdown-nav-btn">Nav</button>
        <div className="border border-solid border-green-600 dropdown-nav-content">
            <Link href='/search'>
                <p className="p-2 border-b border-solid border-gray-400 font-semibold  hover:bg-green-600 transition duration-300 ease-in-out">Search</p>
            </Link>
            <a href="/profile">
                <p className="p-2 border-t border-solid border-gray-400 font-semibold hover:bg-green-600 transition duration-300 ease-in-out">Profile</p>
            </a>
        </div>
       
    </div>
    
)}





/*<div className="dropdown-container">
      {/* Button to trigger dropdown *//*}
      <button className="dropdown-button">Dropdown</button>

{/* Dropdown Menu *//*}
<div className="dropdown-menu">
  <div className="menu-options">
    <a href="#" className="menu-option">Option 1</a>
    
    <div className="submenu-container">
      <a href="#" className="menu-option">Option 2 (with submenu)</a>
      {/* Submenu *//*}
      <div className="submenu">
        <a href="#" className="submenu-option">Submenu Option 1</a>
        <a href="#" className="submenu-option">Submenu Option 2</a>
      </div>
    </div>
    
    <a href="#" className="menu-option">Option 3</a>
  </div>
</div>
</div>
);
};*/


{/* {currentPath === '/search' && (
                        <>
                        <Link href='/profile'>
                            <div className="flex border-b border-solid border-gray-600 hover:bg-blue-600 transition duration-300 ease-in-out dropdown-link">
                                <div className="transparent">
                                    <img src="user-regular.svg" className="m-auto mr-4 w-4 h-4 invert"></img>
                                </div>
                                Profile
                            </div>
                        </Link>
                    </>
                        )}

                    {currentPath === '/profile' && (
                        <>
                        <Link href='/search'>
                            <div className="flex border-b border-solid border-gray-600 hover:bg-blue-600 transition duration-300 ease-in-out dropdown-link">
                                <div className="transparent">
                                    <img src="magnifying-glass-solid.svg" className="m-auto mr-4 w-4 h-4 invert"></img>
                                </div>
                                Search
                            </div>
                        </Link>
                        </>
                    )}

                    {currentPath === '/about' && (
                        <>
                            <Link href="/profile">
                                <div className="flex border-b border-solid border-gray-600 hover:bg-blue-600 transition duration-300 ease-in-out dropdown-link">
                                    <div className="transparent">
                                        <img src="user-regular.svg" className="m-auto mr-4 w-4 h-4 invert"></img>
                                    </div>
                                    Profile
                                </div>
                            </Link>
                            <Link href='/search'>
                                <div className="flex border-b border-solid border-gray-600 hover:bg-blue-600 transition duration-300 ease-in-out dropdown-link">
                                    <div className="transparent">
                                        <img src="magnifying-glass-solid.svg" className="m-auto mr-4 w-4 h-4 invert"></img>
                                    </div>
                                    Search
                                </div>
                            </Link>
                        </>
                    )}*/}