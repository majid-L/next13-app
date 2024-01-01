'use client';

import { useState, useContext, MouseEventHandler, useEffect } from "react";
import { LoggedInUserContext } from "../context/store";
import { login } from '../api/apiRequests';
import Spinner from "../components/Spinner";
import errorHandler from '../helpers/errorHandler';
import { updateLocalStorage } from '../helpers/updateLocalStorage';

const LoginPage = () => {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [errMsg, setErrMsg] = useState('');
const [successMsg, setSuccessMsg] = useState(false);
const [showTip, setShowTip] = useState(false);
const [loading, setIsLoading] = useState(false);
const { loggedInUser, setLoggedInUser } = useContext(LoggedInUserContext);

useEffect(() => {
  setShowTip(!loggedInUser.user?.id ? true : false);
}, []);

const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  loginUser(email, password);
};

const handleSampleUserLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
  loginUser('jr@v3.admin', 'sduhsd8sfsuf');
}

const loginUser = (email: string, password: string) => {
  setIsLoading(true);
  login(email, password)
  .then((res: Auth) => {
    updateLocalStorage(res);
    setLoggedInUser(res);
    setIsLoading(false);
    setSuccessMsg(true);
    setShowTip(false);
    setEmail('');
    setPassword('');
  })
  .catch(err => {
    setIsLoading(false);
    setErrMsg(errorHandler(err));
  });
}

return (
<main className="pb-20">
  <h1 className="text-center text-stone-100 font-bold text-4xl mt-16">Log in</h1>
  <p className="text-center text-stone-100 mt-4">Log in with your email and password.</p>

  {successMsg && <div className="mx-auto my-16 p-4 bg-green-200 w-11/12 max-w-3xl rounded-md shadow-lg shadow-green-300/60">
    <p className="text-lg font-semibold">You have logged in successfully.</p>
    <p>Welcome back!</p>
    <button onClick={() => setSuccessMsg(false)} className="bg-green-300 py-2.5 px-5 mt-4 border border-gray-400 rounded-md ">Dismiss</button>
  </div>}

  {errMsg && <div className="mx-auto my-16 p-4 bg-red-200 w-11/12 max-w-3xl rounded-md shadow-lg shadow-red-300/60">
    <p className="text-lg font-semibold">Somthing went wrong.</p>
    <p>{errMsg}</p>
    <button onClick={() => setErrMsg('')} className="bg-red-300 py-2.5 px-5 mt-4 border border-gray-400 rounded-md ">Dismiss</button>
  </div>}

  {showTip && <div className="mx-auto my-10 p-4 bg-amber-400 w-11/12 max-w-3xl rounded-md shadow-lg shadow-amber-400/60">
    <div className="flex gap-2 items-center">
      <img className="h-10" src='/images/info-circle-fill.svg'/>
      <p>To experience the full features of the app and skip the signup process, log in as a <strong>sample admin user</strong>.</p>
    </div>
    <button onClick={handleSampleUserLogin} className="bg-gray-900 text-stone-100 py-2.5 px-5 mt-4 rounded-md active:bg-gray-600">Login as admin</button>
  </div>}

  <form onSubmit={handleLogin} className="mx-auto my-10 p-4 bg-stone-200 w-11/12 max-w-3xl rounded-md shadow-lg shadow-pink-400/60">
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

  {loading && <Spinner/>}

</main>);
};

export default LoginPage;