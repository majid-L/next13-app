'use client';
import { useState, useContext, useEffect } from "react";
import { GlobalContext } from "../context/store";
import { getExams } from '../api/apiRequests';
import Spinner from '../components/Spinner';
import Link from "next/link";

const ExamsPage = () => {
  const [exams, setExams] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { loggedInUser } = useContext(GlobalContext);

useEffect(() => {
  setIsLoading(true);
  getExams(loggedInUser)
  .then(res => {
    setIsLoading(false);
    setExams(res.exams);
  })
  .catch(() => {
    setIsLoading(false);
    /* * */
  });
}, []);

  return (
    <main className="text-center mt-20 pb-20 mx-auto w-11/12 sm:w-5/6">
      <h1 className="text-center text-stone-100 font-bold text-4xl md:text-5xl mt-20">Viewing all exams</h1>
      <p className="text-center text-stone-100 mt-2 mb-16 md:text-xl">To see all exams for a specific student, click on an exam and you will be taken to the relevant page.</p>
      {isLoading ? <Spinner /> :
        <div className="grid grid-cols-fluid">
        {Array.isArray(exams) && exams.map((exam, i) => {
            return <div key={exam.id} className="py-2">
            <div className="max-w-md mx-auto sm:px-6 lg:px-8">
                <div className="bg-white border-1 border-gray-700 shadow-lg shadow-pink-300/40 overflow-hidden rounded-lg"> {/* add h-64 to fix card height */}
                    <div className="p-6 pb-4 text-gray-900 text-left">
                        <p className="font-bold text-lg">{exam.candidateName} <span className="font-medium">(ID: {exam.candidateId})</span></p>
                        <p className="mb-2 pb-2 border-b-2 border-t-indigo-500 text-gray-500">{exam.title} (Exam ID: {exam.id})</p>
                        <p className="pb-2 border-b-2 border-t-indigo-500">{exam.description} is taking place at {exam.locationName} on {exam.date.slice(0, 10)} at {exam.date.slice(10)}.</p>
                        {/* <p className="text-sm italic mt-2">Lat: {exam.latitude}</p>
                        <p className="text-sm italic">Long: {exam.longitude}</p> */}
                        <Link href={`/users/${exam.candidateId}/exams`} className="block mt-2 text-pink-700">View {exam.candidateName}'s exams</Link>
                    </div>
                </div>
            </div>
        </div>
        })}
        </div>}
    </main>)
};

export default ExamsPage;