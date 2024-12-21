import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/AuthProvider';

const Navbar = () => {

    const { user, signOutUser } = useContext(AuthContext);
    const navigate = useNavigate()

    const handleSignOut = () => {
        signOutUser()
            .then(() => {
                console.log("User sign out successfull")
                navigate("/login")
            })
    }

    const links =
        <div className='flex gap-5 items-center'>
            <Link to="/">Home</Link>
            <Link to="/add-car">Add Car</Link>
            <Link to="/my-cars">My Cars</Link>
            <Link to="/available-cars">AvailableCars</Link>
            {
                user ? <button className='btn btn-sm btn-neutral' onClick={handleSignOut}>SignOut</button>
                    : <button className='btn btn-sm btn-neutral'><Link to="/login">Login</Link></button>
            }
        </div>

    return (
        <div>
            <div className="navbar bg-gray-700 md:text-white text-black">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {links}
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">Pro Cars</a>
                </div>
                <div className="navbar-end hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {links}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;