import { Link, NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Navbar = () => {

    const { user, signOutUser } = useAuth();
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
            <NavLink className={({ isActive }) =>
                isActive ? "text-blue-500 font-bold" : "text-white"
            } to="/">
                Home
            </NavLink>
            {user && <NavLink className={({ isActive }) =>
                isActive ? "text-blue-500 font-bold" : "text-white"
            } to="/add-car">AddCar</NavLink >}
            {user && <NavLink className={({ isActive }) =>
                isActive ? "text-blue-500 font-bold" : "text-white"
            } to={`/my-cars/${user?.email}`}>MyCars</NavLink >}
            {user && <NavLink className={({ isActive }) =>
                isActive ? "text-blue-500 font-bold" : "text-white"
            } to={`/my-bookings/${user?.email}`}>MyBookings</NavLink >}
            <NavLink className={({ isActive }) =>
                isActive ? "text-blue-500 font-bold" : "text-white"
            } to="/available-cars">AvailableCars</NavLink >
            {
                user ?
                    <div className='flex items-center gap-2'>
                        <button className='btn btn-sm btn-neutral' onClick={handleSignOut}>SignOut</button>
                        <Link to="/profile"><img src={user?.photoURL} alt="" className='w-[30px] h-[30px] rounded-full' /></Link>
                    </div>
                    : <button className='btn btn-sm btn-neutral'><NavLink className={({ isActive }) =>
                        isActive ? "text-blue-500 font-bold" : "text-white"
                    } to="/login">Login</NavLink></button>
            }
        </div>

    return (
        <div>
            <div className="navbar bg-gray-700 md:text-white text-black fixed z-10 px-2 md:px-5">
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
                    <Link to="/" className='flex items-center gap-1'>
                        <img className='w-[50px] h-[46px] rounded-full' src="/public/car-logo-vector.jpg" alt="" />
                        <a className="text-lg md:text-xl font-semibold text-gray-200">Pro Cars</a>
                    </Link>
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