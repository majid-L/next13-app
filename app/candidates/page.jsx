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
  getCandidates(loggedInUser)
  .then(({users}) => {
    console.log(users);
    setCandidates(users);
  })
  .catch(() => {

  });
}, []);

return (<main>
    <h1 className="text-center text-stone-100 font-bold text-4xl md:text-5xl mt-20">Viewing all candidates</h1>
      <p className="text-center text-stone-100 mt-2 mb-16 md:text-xl">To see all current exams for a specific candidate, click on the link in the candidate's information section.</p>
      {candidates && candidates.map(({id, name, email}) => {
      return <div key={id} className="py-2">
        <div className="max-w-md mx-auto sm:px-6 lg:px-8">
            <div className="bg-white border-1 border-gray-700 shadow-lg shadow-pink-300/40 overflow-hidden rounded-lg">
                <div className="mb-2 pb-2 border-b-2 border-t-indigo-500 text-gray-900 text-left">
                    <p className="font-bold text-lg">{name}<span className="font-medium">(ID: {id})</span></p>
                    <Link href={`/users/${id}`} className="block mt-2 text-pink-700">View {name}'s exams</Link>
                </div>
            </div>
        </div>
    </div>
    })}
    </main>);
};

export default CandidatesPage;