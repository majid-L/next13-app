"use client";
import { UserIcon, Computer, Page, Journal, Globe } from './components/Icons';
import { useContext, useState } from "react";
import { LoggedInUserContext } from "./context/store";
import UpcomingExams from './components/UpcomingExams';
import BackToTopButton from './components/BackToTopButton';
import userIsAdmin from './helpers/userIsAdmin';

const HomePage = () => {
const context = useContext(LoggedInUserContext);
const [showMsg, setShowMsg] = useState(true);

  return (
  <main className="pb-20 mb-20 xl-2:relative">
   <p className="text-center text-stone-100 m-14 mb-4 text-xl sm:text-4xl">Welcome to</p>
    <h1 className="text-center text-stone-100 mb-10 font-bold text-5xl md:text-9xl text-shadow">NXExams</h1>
    
    {!context?.loggedInUser?.user?.id && showMsg && <div className="mx-auto my-16 p-4 bg-gray-200 w-4/5 max-w-2xl rounded-md shadow-lg shadow-red-300/60">
    <p className="text-lg font-semibold">Log in or sign up.</p>
    <p>Login or create a new account if you would like to access more information.</p>
    <button onClick={() => setShowMsg(false)} className="bg-gray-800 text-slate-200 py-2.5 px-5 mt-4 border border-gray-400 rounded-md ">Dismiss</button>
    </div>}

    {/*  Icon cards container */}
    <section className="flex flex-col w-4/5 mx-auto max-w-2xl text-gray-700 md:font-bold text-lg md:text-xl text-center md:text-left col-span-3">
     {/* flex item */}
      <div className="home-card">
        <Globe/>
        <h2 className="w-3/4 pt-6 md:p-0">View exam locations all over the world!</h2>
      </div>

      {/* flex item */}
      <div className="home-card">
        <UserIcon/>
        <h2 className="w-3/4 pt-6 md:p-0">Create an account and view your candidates&apos; exams.</h2>
      </div>

      {/* flex item */}
      <div className="home-card">
        <Page/>
        <h2 className="w-3/4 pt-6 md:p-0">Filter exams by candidate, location or date (month or day).</h2>
      </div>

      {/* flex item */}
      <div className="home-card">
        <Journal/>
        <h2 className="w-3/4 pt-6 md:p-0">Pink-themed pagination.</h2>
      </div>

       {/* flex item */}
     <div className="home-card">
        <Computer/>
        <h2 className="w-3/4 pt-6 md:p-0">Powered by serverless technology on a cutting-edge platform.</h2>
      </div>
    </section>

    {context?.loggedInUser?.user?.id && userIsAdmin(context?.loggedInUser) && <div className="mx-auto mt-14 xl-2:mt-3 xl-2:ml-6 xl-2:w-64 xl-2:absolute xl-2:-top-12">
    <h2 className="bg-brightPink text-center xl-2:text-left text-slate-200 w-full font-bold p-2 xl-2:rounded-t-lg xl-2:border-b-2 border-b-gray-400">Upcoming exam sessions</h2>
    <UpcomingExams/>
    </div>}
    <BackToTopButton/>
  </main>
  );
};

export default HomePage;