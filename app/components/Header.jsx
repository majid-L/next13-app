"use client";
import Link from "next/link";
import { useState, useContext } from "react";
import { GlobalContext } from "../context/store";
import axios from "axios";

// we want this to show on every page, so we will bring it into the layout, not the home page
const Header = () => {
const [showMenu, setShowMenu] = useState(false);
const { loggedInUser, setLoggedInUser } = useContext(GlobalContext);

const logout = id => axios.get(`https://laravel-php-api.vercel.app/public/api/logout/${id}`, {
  headers: {'Authorization': 'Bearer ' + loggedInUser.token}
}).then(({data}) => data);

const handleLogout = () => {
  logout(loggedInUser.user.id);
  setLoggedInUser({ user: { name: null, id: null, email: null }, token: null });
  window.localStorage.setItem('ACTIVE_USER', '');
  window.localStorage.setItem('USER_ID', '');
  window.localStorage.setItem('USER_EMAIL', '');
  window.localStorage.setItem('AUTH_TOKEN', '');
}

console.log(loggedInUser.user.id);
return(
    <header>
    {/* Navbar */}
      <div className="w-full bg-stone-300 bg-anim">
      <nav className="relative container mx-auto p-6">
     
        {/* mobile menu */}
        <div className={`${!showMenu && 'hidden'} md:hidden`}>
          <div className="absolute flex flex-col -top-2 items-center self-end py-8 mt-10 space-y-6 bg-white sm:w-auto sm:self-center left-6 right-6 shadow-lg shadow-pink-500/40 border border-slate-300 rounded-lg">
            <Link className="hover:text-orange-500" onClick={() => setShowMenu(false)} href='/login'>Login</Link>
            <Link className="hover:text-orange-500" onClick={() => setShowMenu(false)} href='/signup'>Signup</Link>
            <Link className="hover:text-orange-500" onClick={() => setShowMenu(false)} href='/'>Home</Link>
            <Link className="hover:text-orange-500" onClick={() => setShowMenu(false)} href='/about'>About</Link>
            <Link className="hover:text-orange-500" onClick={() => setShowMenu(false)} href='/about/extra'>Extra</Link>
            <Link className="hover:text-orange-500" onClick={() => setShowMenu(false)} href='/github/projects'>Projects</Link>
            {/* <Link href='/github/projects' className="responsive-menu">Contacts</Link>
            <Link className="responsive-menu">Extra</Link> */}
        </div>
        </div>
    </nav>
    </div>
    </header>);
};

export default Header;