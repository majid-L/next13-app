'use client';
import { getSingleExam } from '../../api/apiRequests';
import { GlobalContext } from '../../context/store';
import { useState, useEffect, useContext } from 'react';
import Spinner from '../../components/Spinner';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const SingleExamPage = ({params}) => {
const [exam, setExam] = useState({date: ''});
const [isLoading, setIsLoading] = useState(false);
const {loggedInUser} = useContext(GlobalContext);
const [errorMsg, setErrorMsg] = useState({value: '', show: true});

useEffect(() => {
    if (!loggedInUser.user?.id) {
        notFound();
      }
    setIsLoading(true);
    getSingleExam(loggedInUser, params.id)
    .then(({exam}) => {
        setIsLoading(false);
        setExam(exam);
    })
    .catch(({message, response}) => {
        setIsLoading(false);
        if (response?.data?.msg) {
            setErrorMsg(prev => ({...prev, value: response.data.msg }));
        } else if (response?.data?.message) {
            setErrorMsg(prev => ({...prev, value: response.data.message}));
        } else {
            setErrorMsg(prev => ({...prev, value: message}));
        }
    })
}, []);

return (
<main>
  <h1 className="text-center text-stone-100 font-bold text-4xl md:text-5xl mt-12">Viewing exam session: {exam.title}</h1>
  <p className="text-center text-stone-100 mt-4 mb-16 mx-4 md:text-xl">To see all exams for {exam.candidateName}, click on the link below.</p>

{isLoading ? <Spinner/> : <div className="bg-white border-1 border-gray-700 shadow-lg shadow-pink-300/40 overflow-hidden rounded-lg w-11/12 max-w-3xl m-auto">
<div className="p-6 pb-4 text-gray-900 text-left">
    <p className="font-bold text-lg">{exam.candidateName} <span className="font-medium">(ID: {exam.candidateId})</span></p>
    <p className="mb-2 pb-2 border-b-2 border-t-indigo-500 text-gray-500">{exam.title} (Exam ID: {exam.id})</p>
    <p className="pb-2 border-b-2 border-t-indigo-500">{exam.description} is taking place at {exam.locationName} on {exam.date.slice(0, 10)} at {exam.date.slice(11)}.</p>
    <Link href={`/candidates/${exam.candidateId}`} className="block w-fit mt-2 text-pink-700 hover:underline hover:text-blue-500">View {exam.candidateName}'s exams</Link>
</div>
</div>}
{/* Error msg */}
{errorMsg.value && errorMsg.show && <div className="mx-auto my-16 p-4 bg-red-200 w-11/12 max-w-3xl rounded-md shadow-lg shadow-red-300/60">
    <p className="text-lg font-semibold">Somthing went wrong.</p>
    <p className="italic">{errorMsg.value}</p>
    <button onClick={() => setErrorMsg(prev => ({...prev, show: false}))} className="bg-red-300 py-2.5 px-5 mt-4 border border-gray-400 rounded-md ">Dismiss</button>
  </div>}
</main>);
}

export default SingleExamPage;