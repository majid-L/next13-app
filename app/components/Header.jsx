"use client";
import Link from "next/link";
import { useState, useContext } from "react";
import { GlobalContext } from "../context/store";
import axios from "axios";
import userIsAdmin from '../helpers/userIsAdmin';

const Header = () => {
const [showMenu, setShowMenu] = useState(false);
const [logoutNotification, showLogoutNotification] = useState('');
const [errorMsg, setErrorMsg] = useState('');
const { loggedInUser, setLoggedInUser } = useContext(GlobalContext);

const logout = id => axios.get(`https://laravel-php-api.vercel.app/public/api/logout/${id}`, {
  headers: {'Authorization': 'Bearer ' + loggedInUser.token}
}).then(({data}) => data);

const handleLogout = () => {
  logout(loggedInUser.user.id)
  .then(res => {
    showLogoutNotification(res.msg);
    setTimeout(() => showLogoutNotification(''), 6000);
  })
  .catch(err => {
    setErrorMsg(err.response?.date?.msg ? err.response.date.msg : err.message);
    setTimeout(() => setErrorMsg(''), 6000);
  })
  .finally(() => {
    setLoggedInUser({ user: { name: null, id: null, email: null }, token: null });
    window.localStorage.setItem('ACTIVE_USER', '');
    window.localStorage.setItem('USER_ID', '');
    window.localStorage.setItem('USER_EMAIL', '');
    window.localStorage.setItem('AUTH_TOKEN', '');
  });
}

return(
    <header>
    {/* Navbar */}
      <div className="w-full bg-stone-300 bg-anim shadow-bottom">
      <nav className="relative container mx-auto p-6 pb-3">
        {/* Flex container */}
        <div className="flex items-center justify-between">
            {/* logo */}
            <div className="flex items-center py-2 space-x-2">
                <img className="w-10 h-10" src="/images/dice-5-fill.svg"/>
                <p className="text-xl">NXExams</p>
            </div>
            
            {/* menu items */}
            <div className="hidden md:flex">
              <Link className="font-semibold px-3 pb-2 border-b border-stone-400" href='/'>Home</Link>
              {userIsAdmin(loggedInUser) ? 
              <>
              <Link className="font-semibold px-3 pb-2 border-b border-stone-400" href='/exams'>Exams</Link>
              <Link className="font-semibold px-3 pb-2 border-b border-stone-400" href='/candidates'>Candidates</Link>
              </>
              : loggedInUser.user?.id ? <Link className="font-semibold px-3 pb-2 border-b border-stone-400" href={`/candidates/${loggedInUser.user?.id}`}>My Exams</Link> : null}
            </div>

            {/* login/signup */}
            {!loggedInUser?.user?.name && <div className="flex flex-start">
            <Link href='/login' className="hidden md:block p-2 px-3 rounded-lg hover:bg-gray-200">Log in</Link>
            <Link href='/signup' className="hidden md:block p-2 rounded-lg hover:bg-gray-200">Signup</Link>
            </div>}
            
            {/*Logged in user*/}
            {loggedInUser?.user?.name && <div className="flex flex-start">
            <Link href='#' className="hidden md:block p-2 mr-4 rounded-full">Hi, {loggedInUser.user.name}.</Link>
            <button onClick={handleLogout} className="hidden md:block p-2 px-3 rounded-lg text-stone-200 bg-gray-800">Logout</button>
            </div>}

             {/* === menu icon */}
             <button onClick={() => setShowMenu(!showMenu)} className={`${showMenu && 'open'} absolute mr-2 mt-2 top-1 z-10 block tripline md:hidden focus:outline-none`}>
              <span className="tripline-top"></span>
              <span className="tripline-middle"></span>
              <span className="tripline-bottom"></span>
             </button>
        </div>
        {/* mobile menu */}
        <div className={`${!showMenu && 'hidden'} md:hidden`}>
          <div className="absolute flex flex-col -top-2 items-center self-end py-8 mt-10 space-y-6 bg-white sm:w-auto sm:self-center left-6 right-6 shadow-lg shadow-pink-500/40 border border-slate-300 rounded-lg">
            {!loggedInUser && <><Link className="hover:text-orange-500" onClick={() => setShowMenu(false)} href='/login'>Login</Link>
            <Link className="hover:text-orange-500" onClick={() => setShowMenu(false)} href='/signup'>Signup</Link></>}
            <Link className="hover:text-orange-500" onClick={() => setShowMenu(false)} href='/'>Home</Link>
            {userIsAdmin(loggedInUser) ? 
            <><Link className="hover:text-orange-500" onClick={() => setShowMenu(false)} href='/exams'>Exams</Link>
            <Link className="hover:text-orange-500" onClick={() => setShowMenu(false)} href='/candidates'>Candidates</Link>
            </> 
            : loggedInUser.user?.id ? <Link className="hover:text-orange-500" href={`/candidates/${loggedInUser.user?.id}`}>My Exams</Link> : null}
        </div>
        </div>
    </nav>

    {logoutNotification ? <div className="w-full bg-green-200 text-center">{logoutNotification}</div> 
    : errorMsg ?  <div className="w-full bg-red-200 text-center">{errorMsg}</div> : null}
    </div>
    {userIsAdmin(loggedInUser) && <div className="flex w-fit ml-6 mt-4 bg-slate-200 p-3 rounded">
      <p className="text-sm mr-1">Logged in as <span className="font-bold">admin</span></p>
      <img src='/images/gear.svg'/>
    </div>}
    </header>);
};

export default Header;