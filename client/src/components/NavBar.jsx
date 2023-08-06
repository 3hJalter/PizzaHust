import React from "react";
import { Link } from "react-router-dom";
const NavBar = () => {
    return (
        <div className="flex items-center gap-3 m-5 text-red-500 font-bold">
            <button className='flex bg-white '>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 ">
                    <path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                </svg>
                <p className=''>Categories</p>
            </button>
            <Link to='/'>Home</Link>
            <div>About us</div>
            <div>Contact</div>
        </div>
    );

}

export default NavBar;