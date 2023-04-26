'use client';
import ExamsList from '../../components/ExamsList';
import { useState, useEffect } from "react";
import { useContext } from "react";
import { GlobalContext } from '../../context/store';
import { getSingleCandidatesExams } from '../../api/apiRequests';
import { notFound } from 'next/navigation';
import userIsAdmin from '../../helpers/userIsAdmin';

const SingleCandidateExams = ({params : { id }}) => {

  const [exams, setExams] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { loggedInUser } = useContext(GlobalContext);

  useEffect(() => {
    if (!loggedInUser.user?.id || loggedInUser.user?.id !== id) {
      notFound();
    }
    setIsLoading(true);
      getSingleCandidatesExams(loggedInUser, id)
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
<main className="text-center pb-20 mx-auto w-11/12 sm:w-5/6">
  <h1 className="text-center text-stone-100 font-bold text-4xl md:text-5xl mt-12 text-shadow-sm">{userIsAdmin(loggedInUser) ? `Viewing exam sessions for ${exams[0]?.candidateName}` : 'My exams'}</h1>
  <p className="text-center text-stone-100 mt-4 mb-16 md:text-xl">{userIsAdmin(loggedInUser) ? 'To see all exams for a specific student, click on an exam and you will be taken to the relevant page.' : 'For further details, click on an exam and you will be taken to its information page.'}</p>
  {exams.length > 0 ? <ExamsList exams={exams} isLoading={isLoading}/> 
  : <div className="bg-red-400 w-56 rounded p-3 flex mx-auto mt-8">
    <img src="/images/x-circle-fill.svg"/>
    <p className="ml-4">No exams booked.</p>
    </div>}
</main>
);
};

export default SingleCandidateExams;