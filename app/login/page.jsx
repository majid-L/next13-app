'use client';

import { useState, useContext, useEffect } from "react";
import { GlobalContext } from "../context/store";
import axios from 'axios';
import Spinner from "../components/Spinner";

const login = (email, password) => axios.post('https://laravel-php-api.vercel.app/public/api/login', {email, password}).then(({data}) => data);

const LoginPage = () => {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [errMsg, setErrMsg] = useState('');
const [successMsg, setSuccessMsg] = useState('');
const [loading, setIsLoading] = useState(false);
const { loggedInUser, setLoggedInUser } = useContext(GlobalContext);

useEffect(() => {
  if (loggedInUser.user.name) {
    window.localStorage.setItem('ACTIVE_USER', loggedInUser.user.name);
    window.localStorage.setItem('USER_ID', loggedInUser.user.id);
    window.localStorage.setItem('USER_EMAIL', loggedInUser.user.email);
    window.localStorage.setItem('AUTH_TOKEN', loggedInUser.token);
    setEmail('');
    setPassword('');
  }
}, [loggedInUser]);
};

return (
<main>
  <h1 className="text-center text-stone-100 font-bold text-4xl mt-20">Log in</h1>
  <p className="text-center text-stone-100 mt-2">Log in with your email and password.</p>
  <form onSubmit={handleSubmit} className="mx-auto my-10 p-4 bg-stone-200 w-11/12 max-w-3xl rounded-md shadow-lg shadow-pink-400/60">
    <div>
    <label className="block mb-2">Email</label>
    <input required type="email" onChange={e => setEmail(e.target.value)} value={email} className="h-9 p-2 w-full rounded-md border border-stone-400"/>
    </div>
    <div className="mt-4">
    <label className="block mb-2">Password</label>
    <input required type="password" onChange={e => setPassword(e.target.value)} value={password}  className="h-9 p-2 w-full rounded-md border border-stone-400"/>
    </div>
    <button className="bg-gray-900 text-stone-100 py-2.5 px-5 mt-4 rounded-md active:bg-gray-600">Login</button>
  </form>

</main>);
};

export default LoginPage;