import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo (2).png';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';

const Header = () => {
    const { user, logOut } = useContext(AuthContext);

    const handleLogout = () => {
        logOut()
            .then(() => { })
            .catch(err => console.error(err))
    }
    const menuItems = <>
        <li><Link to='/' className='font-bold text-black lg:ml-5 md:ml-3 hover:text-[#E52727] focus:text-white focus:rounded-xl focus:bg-[#E52727]'>Home</Link></li>
        <li><Link to='/dashboard' className='font-bold text-black lg:ml-5 md:ml-3 hover:text-[#E52727] focus:text-white focus:rounded-xl focus:bg-[#E52727]'>Dashboard</Link></li>
        <li><Link to='/blog' className='font-bold text-black lg:ml-5 md:ml-3 hover:text-[#E52727] focus:text-white focus:rounded-xl focus:bg-[#E52727]'>Blog</Link></li>
        {
            user?.email ? <li><button onClick={handleLogout} className='font-bold text-black lg:ml-5 md:ml-3 hover:text-[#E52727] focus:text-white focus:rounded-xl focus:bg-[#E52727]'>Logout</button></li>
                :
                <li><Link to='/login' className='font-bold text-black lg:ml-5 md:ml-3 hover:text-[#E52727] focus:text-white focus:rounded-xl focus:bg-[#E52727]'>Login</Link></li>
        }
    </>
    return (
        <div className="navbar lg:px-10">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {menuItems}
                    </ul>
                </div>
                <a href='/' className="btn btn-ghost normal-case text-xl"><img className='w-[100px] md:[200px] lg:w-[280px]' src={logo} alt="" /></a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    {menuItems}
                </ul>
            </div>
            <div className="navbar-end">
                <a href='/' className="btn">Get started</a>
            </div>
        </div>
    );
};

export default Header;