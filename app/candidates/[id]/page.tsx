'use client';
import ExamsList from '../../components/ExamsList';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from "react";
import { useContext } from "react";
import { LoggedInUserContext } from '../../context/store';
import { getSingleCandidatesExams } from '../../api/apiRequests';
import userIsAdmin from '../../helpers/userIsAdmin';
import Spinner from '../../components/Spinner';
import ErrorMessage from '../../components/ErrorMessage';
import ConfirmationMessage from '../../components/ConfirmationMessage';
import errorHandler from '../../helpers/errorHandler';
import redirectUnauthorisedUser from '../../helpers/redirectUnauthorisedUser';

const SingleCandidateExams = ({params : { id }}: { params: { id: string }}) => {

  const [exams, setExams] = useState<Exam[] | ''>('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState({ value: '', show: true});
  const [confirmationMsg, setConfirmationMsg] = useState('');
  const { loggedInUser } = useContext(LoggedInUserContext);
  const searchParams = useSearchParams();
  const candidateName = searchParams.get("name");

  useEffect(() => {
    if (confirmationMsg) {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  }, [confirmationMsg]);

  useEffect(() => {
    setErrorMsg({value: '', show: false});
    redirectUnauthorisedUser(id);
    setIsLoading(true);
    getSingleCandidatesExams(window.localStorage.getItem('AUTH_TOKEN') as string, id)
    .then(res => {
      setIsLoading(false);
      setExams(res.exams);
    })
    .catch(err => {
      setIsLoading(false);
      setErrorMsg({value: errorHandler(err), show: true});
    });
  }, []);

  return (
    <main className="pb-20 mx-auto w-11/12 sm:w-5/6">
      <h1 className="text-center text-stone-100 font-bold text-4xl md:text-5xl mt-12 mx-4 text-shadow-sm">{userIsAdmin(loggedInUser) ? `Viewing exam sessions for ${!isLoading && exams ? candidateName : '...'}` : 'My exams'}</h1>
      <p className="text-center text-stone-100 mt-4 mb-16 md:text-xl">{userIsAdmin(loggedInUser) ? 'To see all exams for a specific student, click on an exam and you will be taken to the relevant page.' : 'For further details, click on an exam and you will be taken to its information page.'}</p>

      {confirmationMsg && <ConfirmationMessage confirmationMsg={confirmationMsg} setConfirmationMsg={setConfirmationMsg}/>}

      {errorMsg.show && <ErrorMessage errorMsg={errorMsg} setErrorMsg={setErrorMsg}/>} 

      {exams.length > 0 ? <ExamsList exams={exams as Exam[]} setExams={setExams} loggedInUser={loggedInUser} isLoading={isLoading} setConfirmationMsg={setConfirmationMsg}/> 
      : exams.length === 0 && !isLoading ? <div className="bg-red-400 w-56 rounded p-3 flex mx-auto mt-8">
      <img src="/images/x-circle-fill.svg"/>
      <p className="ml-4">No exams booked.</p>
      </div>
      : isLoading? <Spinner/> : null}
    </main>
  );
};

export default SingleCandidateExams;