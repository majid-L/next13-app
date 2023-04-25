'use client';

import { faker } from '@faker-js/faker';
import Spinner from "../../components/Spinner";
import { useContext, useState } from 'react';
import { GlobalContext } from '../../context/store';
import { postExam } from '../../api/apiRequests';
import Link from 'next/link';

const NewExam = () => {
const [examDetails, setExamDetails] = useState({
    title: '',
    description: '',
    candidate_id: '',
    candidate_name: '',
    date: '',
    location_name: ''
});
const [newExamId, setNewExamId] = useState(0);
const [successMsg, setSuccessMsg] = useState(true);
const [errMsg, setErrMsg] = useState(false);
const [isLoading, setIsLoading] = useState(false);
const { loggedInUser } = useContext(GlobalContext);

const handleSubmit = e => {
    e.preventDefault();
    setIsLoading(true);
    postExam(loggedInUser, {
        ...examDetails, 
        longitude: faker.address.longitude(),
        latitude: faker.address.latitude()
    })
    .then(res => {
        console.log(res);
        setIsLoading(false);
        setNewExamId(res.id);
        setSuccessMsg("Exam has been successfully added. You can now view the exam page.");
    })
    .catch(({response : { data }}) => {
        setIsLoading(false);
        if (data.message) {
          setErrMsg(data.message);
        } else {
          setErrMsg("Exam could not be added. Try again later.")
        }
    })
}

return (<main>

  <h1 className="text-stone-100 text-center w-4/5 font-bold text-3xl md:text-4xl mx-auto mt-20">Create a new exam session.</h1>
  <p className="text-center text-stone-100 w-4/5 mx-auto mt-2">Ensure you provide the candidate's name and ID, exam title, description and location, and the date.</p>
  <form onSubmit={handleSubmit} className="mx-auto my-10 p-4 bg-stone-200 w-11/12 max-w-3xl rounded-md shadow-lg shadow-pink-400/60">
    <div>
    <label className="block mb-2">Candidate name</label>
    <input required type="text" onChange={e => setExamDetails(prev => ({...prev, candidate_name: e.target.value}))} value={examDetails.candidate_name} className="h-9 p-2 w-full rounded-md border border-stone-400"/>
    </div>
    <div className="mt-4">
    <label className="block mb-2">Candidate ID</label>
    <input required type="text" onChange={e => setExamDetails(prev => ({...prev, candidate_id: e.target.value}))} value={examDetails.candidate_id}  className="h-9 p-2 w-full rounded-md border border-stone-400"/>
    </div>
    <div className="mt-4">
    <label className="block mb-2">Exam title</label>
    <input required type="text" onChange={e => setExamDetails(prev => ({...prev, title: e.target.value}))} value={examDetails.title} className="h-9 p-2 w-full rounded-md border border-stone-400"/>
    </div>
    <div className="mt-4">
    <label className="block mb-2">Exam date</label>
    <input required type="date" onChange={e => setExamDetails(prev => ({...prev, date: e.target.value}))} value={examDetails.date} className="h-9 p-2 w-full rounded-md border border-stone-400"/>
    </div>
    <div className="mt-4">
    <label className="block mb-2">Exam description</label>
    <input required type="text" onChange={e => setExamDetails(prev => ({...prev, description: e.target.value}))} value={examDetails.description}  className="h-9 p-2 w-full rounded-md border border-stone-400"/>
    </div>
    <div className="mt-4">
    <label className="block mb-2">Exam location</label>
    <input required type="text" onChange={e => setExamDetails(prev => ({...prev, location_name: e.target.value}))} value={examDetails.location_name}  className="h-9 p-2 w-full rounded-md border border-stone-400"/>
    </div>
    <button className="bg-gray-900 text-stone-100 py-2.5 px-5 mt-4 rounded-md active:bg-gray-600">Add new exam session</button>
  </form>

  {isLoading && <Spinner/>}

  {successMsg && <div className="mx-auto my-16 p-4 bg-green-200 w-11/12 max-w-3xl rounded-md shadow-lg shadow-green-300/60">
    <p className="text-lg font-semibold">Exam created successfully.</p>
    <p>You can now view the exam page by clicking on the button below.</p>
    <div className="flex">
    <Link href={`/exams/${newExamId}`} className="bg-green-300 block w-fit py-2.5 px-5 mt-4 border border-gray-400 rounded-md ">Go to exam page</Link>
    <button onClick={() => setSuccessMsg(false)} className="bg-green-300 py-2.5 px-5 mt-4 ml-2 border border-gray-400 rounded-md ">Dismiss</button>
    </div>
  </div>}

  {errMsg && <div className="mx-auto my-16 p-4 bg-red-200 w-11/12 max-w-3xl rounded-md shadow-lg shadow-red-300/60">
    <p className="text-lg font-semibold">Somthing went wrong.</p>
    <p>{errMsg}</p>
    <button onClick={() => setErrMsg(false)} className="bg-red-300 py-2.5 px-5 mt-4 border border-gray-400 rounded-md ">Dismiss</button>
  </div>}
</main>);
}

export default NewExam;