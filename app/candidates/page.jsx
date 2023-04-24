'use client';
import { useState, useContext, useEffect } from "react";
import { GlobalContext } from "../context/store";
import { getCandidates } from '../api/apiRequests';
import Spinner from '../components/Spinner';
import Link from "next/link";

// Candidates are referred to as "users" in the API
const CandidatesPage = () => {
const [candidates, setCandidates] = useState('');
const [isLoading, setIsLoading] = useState(false);
const { loggedInUser } = useContext(GlobalContext);

useEffect(() => {
  setIsLoading(true);
  getCandidates(loggedInUser)
  .then(({users}) => {
    setIsLoading(false);
    setCandidates(users);
  })
  .catch(() => {
    setIsLoading(false);
  });
}, []);

return (<main className="text-center mt-20 pb-20 mx-auto w-11/12 sm:w-5/6">
  <h1 className="text-center text-stone-100 font-bold text-4xl md:text-5xl mt-20">Viewing all candidates</h1>
  <p className="text-center text-stone-100 mt-2 mb-16 md:text-xl">To see all current exams for a specific candidate, click on the link in the candidate's information section.</p>
  {isLoading ? <Spinner /> : candidates && <div className="grid grid-cols-fluid max-w-6xl m-auto">
    {candidates.map(({id, name, email}) => {
      return <div key={id} className="py-2">
        <div className="max-w-md mx-auto sm:px-6 lg:px-8">
            <div className="bg-white border-1 border-gray-700 shadow-lg shadow-pink-300/40 overflow-hidden rounded-lg">
                <div className="mb-2 pb-2 text-gray-900 text-left">
                    <p className="p-2 font-bold text-lg border-b-2 border-t-indigo-500">{name}</p>
                    <p className="px-2 py-1">{email}</p>
                    <p className="px-2">Candidate ID: {id}</p>
                    <Link href={`/candidates/${id}`} className="px-2 block mt-2 text-pink-700">View {name}'s exams</Link>
                </div>
            </div>
        </div>
    </div>
  })}</div>}
</main>);
};

export default CandidatesPage;