'use client';

import { useState, useContext } from "react";
import { LoggedInUserContext } from "../context/store";
import { signup } from '../api/apiRequests';
import Spinner from "../components/Spinner";
import errorHandler from "../helpers/errorHandler";
import ErrorMessage from "../components/ErrorMessage";

const SignupPage = () => {
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [passwordConf, setPasswordConf] = useState('');
const [errorMsg, setErrorMsg] = useState({ value: '', show: ''});
const [successMsg, setSuccessMsg] = useState('');
const [isLoading, setIsLoading] = useState(false);
const { setLoggedInUser } = useContext(LoggedInUserContext);

const handleSubmit = e => {
  e.preventDefault();
  setIsLoading(true);
  setSuccessMsg(false);
  signup(name, email, password, passwordConf)
  .then(res => {
    window.localStorage.setItem('ACTIVE_USER', res.user?.name);
    window.localStorage.setItem('USER_ID', res.user?.id);
    window.localStorage.setItem('USER_EMAIL', res.user?.email);
    window.localStorage.setItem('AUTH_TOKEN', res?.token);
    setLoggedInUser(res);
    setIsLoading(false);
    setSuccessMsg(true);
    setEmail('');
    setPassword('');
    setPasswordConf('');
    setName('');
  })
  .catch(err => {
    setIsLoading(false);
    setErrorMsg({value: errorHandler(err), show: true});
  })
};

return (
<main className="pb-20">
  <h1 className="text-stone-100 text-center w-4/5 font-bold text-3xl md:text-4xl mx-auto mt-20">Sign up for a new account.</h1>
  <p className="text-center text-stone-100 w-4/5 mx-auto mt-2">To create an account, enter your name, email and password.</p>
  <form onSubmit={handleSubmit} className="mx-auto my-10 p-4 bg-stone-200 w-11/12 max-w-3xl rounded-md shadow-lg shadow-pink-400/60">
    <div>
    <label className="block mb-2">Name</label>
    <input required type="text" onChange={e => setName(e.target.value)} value={name} className="h-9 p-2 w-full rounded-md border border-stone-400"/>
    </div>
    <div className="mt-4">
    <label className="block mb-2">Email</label>
    <input required type="email" onChange={e => setEmail(e.target.value)} value={email} className="h-9 p-2 w-full rounded-md border border-stone-400"/>
    </div>
    <div className="mt-4">
    <label className="block mb-2">Password <span className="text-sm">(must be at least 10 characters long)</span></label>
    <input required type="password" onChange={e => setPassword(e.target.value)} value={password}  className="h-9 p-2 w-full rounded-md border border-stone-400"/>
    </div>
    <div className="mt-4">
    <label className="block mb-2">Confirm password</label>
    <input required type="password" onChange={e => setPasswordConf(e.target.value)} value={passwordConf}  className="h-9 p-2 w-full rounded-md border border-stone-400"/>
    </div>
    <button className="bg-gray-900 text-stone-100 py-2.5 px-5 mt-4 rounded-md active:bg-gray-600">Create account</button>
  </form>

  {isLoading && <Spinner/>}

  {successMsg && <div className="mx-auto my-16 p-4 bg-green-200 w-11/12 max-w-3xl rounded-md shadow-lg shadow-green-300/60">
    <p className="text-lg font-semibold">Account created successfully.</p>
    <p>You can now start using your details to sign in to your account.</p>
    <button onClick={() => setSuccessMsg(false)} className="bg-green-300 py-2.5 px-5 mt-4 border border-gray-400 rounded-md ">Dismiss</button>
  </div>}

  {errorMsg.show && <ErrorMessage errorMsg={errorMsg} setErrorMsg={setErrorMsg}/>}
</main>);
};

export default SignupPage;