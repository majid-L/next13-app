'use client';
import { useState, useContext, useEffect } from "react";
import { GlobalContext } from "../context/store";
import axios from "axios";

const ExamsPage = () => {
  const [exams, setExams] = useState();
  const { loggedInUser } = useContext(GlobalContext);

  const getExams = () => axios.get('https://laravel-php-api.vercel.app/public/api/exams', {
  headers: {'Authorization': 'Bearer ' + loggedInUser.token}
}).then(({data}) => data);

useEffect(() => {
  getExams()
  .then(res => {
    setExams(res.exams);
  })
  .catch(() => {

  });
}, []);

  return (
    <main className="text-center mt-20 pb-20 mx-auto w-5/6">
      <h1 className="text-center text-stone-100 font-bold text-4xl mt-20">Viewing all exams</h1>
      <p className="text-center text-stone-100 mt-2 mb-16">To see all exams for a specific student, click on an exam and you will be taken to the relevant page.</p>
      <div className="grid grid-cols-fluid">
        {Array.isArray(exams) && exams.map((exam, i) => {
            return <div key={exam.id} className="py-2">
            <div className="max-w-md mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900 text-left">
                        <p className="font-bold text-lg">{exam.candidateName} <span className="font-medium">(ID: {exam.candidateId})</span></p>
                        <p className="mb-2 pb-2 border-b-2 border-t-indigo-500 text-gray-500">{exam.title} (Exam ID: {exam.id})</p>
                        <p>{exam.description} is taking place at {exam.locationName} on {exam.date.slice(0, 10)} at {exam.date.slice(10)}.</p>
                        <p>(Lat: {exam.latitude} Long: {exam.longitude})</p>
                    </div>
                    <button className="px-3 py-2 mb-2 rounded-lg text-stone-200 bg-gray-800">View on map</button>
                </div>
            </div>
        </div>
        })}
        </div>
    </main>)
};

export default ExamsPage;