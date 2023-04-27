'use client';

import { faker } from '@faker-js/faker';
import Spinner from "../../components/Spinner";
import { useContext, useState, useEffect } from 'react';
import { LoggedInUserContext } from '../../context/store';
import { postExam } from '../../api/apiRequests';
import Link from 'next/link';
import userIsAdmin from '../../helpers/userIsAdmin';
import { notFound } from 'next/navigation';
import ExamForm from '../../components/ExamForm';
import errorHandler from '../../helpers/errorHandler';
import ErrorMessage from '../../components/ErrorMessage';

const NewExam = () => {
const [examDetails, setExamDetails] = useState({
    title: '',
    description: '',
    candidate_id: '',
    candidate_name: '',
    date: '',
    time: '',
    location_name: ''
});
const [newExamId, setNewExamId] = useState(0);
const [successMsg, setSuccessMsg] = useState('');
const [errorMsg, setErrorMsg] = useState({value: '', show: true});
const [isLoading, setIsLoading] = useState(false);
const { loggedInUser } = useContext(LoggedInUserContext);

useEffect(() => {
  if (!userIsAdmin(loggedInUser)) {
    notFound();
  }
}, []);

const handleSubmit = e => {
    e.preventDefault();
    setIsLoading(true);
    postExam(loggedInUser, {
        ...examDetails, 
        date: `${examDetails.date} ${examDetails.time}:00`,
        longitude: faker.address.longitude(),
        latitude: faker.address.latitude()
    })
    .then(res => {
        setIsLoading(false);
        setNewExamId(res.id);
        setSuccessMsg("Exam has been successfully added. You can now view the exam page.");
    })
    .catch(err => {
        setIsLoading(false);
        setErrorMsg({show: true, value: errorHandler(err)});
    })
}

return (<main>
  <h1 className="text-stone-100 text-center w-4/5 font-bold text-3xl md:text-4xl mx-auto mt-20">Create a new exam session.</h1>
  <p className="text-center text-stone-100 w-4/5 mx-auto mt-2">Ensure you provide the candidate's name and ID, exam title, description and location, and the date.</p>
  
  <ExamForm formType="POST" handleSubmit={handleSubmit} examDetails={examDetails} setExamDetails={setExamDetails}/>

  {isLoading && <Spinner/>}

  {successMsg && <div className="mx-auto my-16 p-4 bg-green-200 w-11/12 max-w-3xl rounded-md shadow-lg shadow-green-300/60">
    <p className="text-lg font-semibold">Exam created successfully.</p>
    <p>You can now view the exam page by clicking on the button below.</p>
    <div className="flex">
    <Link href={`/exams/${newExamId}`} className="bg-green-300 block w-fit py-2.5 px-5 mt-4 border border-gray-400 rounded-md ">Go to exam page</Link>
    <button onClick={() => setSuccessMsg('')} className="bg-green-300 py-2.5 px-5 mt-4 ml-2 border border-gray-400 rounded-md ">Dismiss</button>
    </div>
  </div>}

  {errorMsg.value && errorMsg.show && <ErrorMessage errorMsg={errorMsg} setErrorMsg={setErrorMsg}/>}
</main>);
}

export default NewExam;