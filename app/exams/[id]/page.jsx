'use client';
import { getSingleExam, updateExam } from '../../api/apiRequests';
import { useState, useEffect } from 'react';
import Spinner from '../../components/Spinner';
import ErrorMessage from '../../components/ErrorMessage';
import ConfirmationMessage from '../../components/ConfirmationMessage';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ExamForm from '../../components/ExamForm';
import { ignoreEmptyFields, formatRequestBody } from '../../helpers/requestBodyManipulators';
import errorHandler from '../../helpers/errorHandler';

const SingleExamPage = ({params}) => {
// States concerned with fetching the exam
const [exam, setExam] = useState({date: ''});
const [refetchData, setRefetchData] = useState(0);
const [isLoading, setIsLoading] = useState(false);
const [errorMsg, setErrorMsg] = useState({value: '', show: false});

// States concerned with PUT operations
const [examDetails, setExamDetails] = useState(emptyObject);
const [confirmationMsg, setConfirmationMsg] = useState('');
const [updateIsLoading, setUpdateIsLoading] = useState(false);

// Fetch exam data
useEffect(() => {
    setErrorMsg({value: '', show: false});
    if (!window.localStorage.getItem('ACTIVE_USER')) {
        notFound();
      }
    setIsLoading(true);
    getSingleExam({token: window.localStorage.getItem('AUTH_TOKEN')}, params.id)
    .then(({exam}) => {
      setExam(exam);
      setIsLoading(false);
    })
    .catch(err => {
        setIsLoading(false);
        setErrorMsg({value: errorHandler(err), show: true});
    })
}, [refetchData, params]);

// Handle PUT requests
const handleSubmit = e => {
  e.preventDefault();
  const validatedInput = ignoreEmptyFields(examDetails);
  if (validatedInput.length === 0) {
    setErrorMsg({value : "You cannot submit an empty form.", show: true});
    return;
  }

  const body = formatRequestBody(examDetails, exam);
  updateExam({token: window.localStorage.getItem('AUTH_TOKEN')}, params.id, body)
  .then(() => {
    setUpdateIsLoading(false);
    setConfirmationMsg("Exam details have been successfully updated.");
    setExamDetails(emptyObject);
    setRefetchData(refetchData + 1);
  })
  .catch(err => {
    setUpdateIsLoading(false);
    setErrorMsg({value: errorHandler(err), show: true});
  })
}

return (
<main className="pb-20">
  <h1 className="text-center text-stone-100 font-bold text-4xl md:text-5xl mt-12 mx-6">Viewing exam session: {exam.title}</h1>
  <p className="text-center text-stone-100 mt-4 mb-10 mx-4 md:text-xl">To see all exams for {exam.candidateName}, click on the link below.</p>

{isLoading ? <Spinner/> : exam ? <div className="bg-white border-1 border-gray-700 shadow-lg shadow-pink-300/40 overflow-hidden rounded-lg w-11/12 mb-10 max-w-3xl m-auto">
<div className="p-6 pb-4 text-gray-900 text-left">
    <p className="font-bold text-lg">{exam.candidateName} <span className="font-medium">(ID: {exam.candidateId})</span></p>
    <p className="mb-2 pb-2 border-b-2 border-t-indigo-500 text-gray-500">{exam.title} (Exam ID: {exam.id})</p>
    <p className="pb-2 border-b-2 border-t-indigo-500">{exam.description} is taking place in {exam.locationName} on {exam.date.slice(0, 10)} at {exam.date.slice(11)}.</p>
    <Link href={`/candidates/${exam.candidateId}`} className="block mt-2 text-pink-700 hover:underline hover:text-blue-500">View {exam.candidateName}'s exams</Link>
</div>
</div> : null}

{confirmationMsg && <ConfirmationMessage confirmationMsg={confirmationMsg} setConfirmationMsg={setConfirmationMsg}/>}

{errorMsg.value && errorMsg.show && <ErrorMessage errorMsg={errorMsg} setErrorMsg={setErrorMsg}/>}

<h2 className="text-center text-stone-100 font-bold text-2xl md:text-3xl mt-10 md:mt-16">Update exam details</h2>
<p className="text-stone-100 mt-4 mb-10 mx-auto w-4/5 max-w-3xl md:text-xl">Update as many or as few fields as you'd. Simply click on the "Show" buttons to reveal the input fields.</p>
<ExamForm formType="PUT" handleSubmit={handleSubmit} examDetails={examDetails} setExamDetails={setExamDetails}/>
{updateIsLoading && <><p className="text-slate-200 text-center italic">Updating...</p><Spinner margin="mt-4"/></>}
</main>);
}

// Used for resetting the form
const emptyObject = {
    title: '',
    description: '',
    date: '',
    time: '',
    location_name: ''
};

export default SingleExamPage;