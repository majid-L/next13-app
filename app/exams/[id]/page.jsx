'use client';
import { getSingleExam } from '../../api/apiRequests';
import { GlobalContext } from '../../context/store';
import { useState, useEffect, useContext } from 'react';
import Spinner from '../../components/Spinner';
import Link from 'next/link';

const SingleExamPage = ({params}) => {
const [exam, setExam] = useState({date: ''});
const [isLoading, setIsLoading] = useState(false);
const {loggedInUser} = useContext(GlobalContext);

useEffect(() => {
    setIsLoading(true);
    getSingleExam(loggedInUser, params.id)
    .then(({exam}) => {
        setIsLoading(false);
        setExam(exam);
    })
    .catch(err => {
        setIsLoading(false);
    })
}, []);

return (
<main>
  <h1 className="text-center text-stone-100 font-bold text-4xl md:text-5xl mt-20">Viewing exam session: {exam.title}</h1>
  <p className="text-center text-stone-100 mt-2 mb-16 mx-4 md:text-xl">To see all exams for {exam.candidateName}, click on the link below.</p>

{isLoading ? <Spinner/> : <div className="bg-white border-1 border-gray-700 shadow-lg shadow-pink-300/40 overflow-hidden rounded-lg w-11/12 max-w-5xl m-auto">
<div className="p-6 pb-4 text-gray-900 text-left">
    <p className="font-bold text-lg">{exam.candidateName} <span className="font-medium">(ID: {exam.candidateId})</span></p>
    <p className="mb-2 pb-2 border-b-2 border-t-indigo-500 text-gray-500">{exam.title} (Exam ID: {exam.id})</p>
    <p className="pb-2 border-b-2 border-t-indigo-500">{exam.description} is taking place at {exam.locationName} on {exam.date.slice(0, 10)} at {exam.date.slice(11)}.</p>
    <Link href={`/candidates/${exam.candidateId}`} className="block w-fit mt-2 text-pink-700 hover:underline hover:text-blue-500">View {exam.candidateName}'s exams</Link>
</div>
</div>}
</main>);
}

export default SingleExamPage;