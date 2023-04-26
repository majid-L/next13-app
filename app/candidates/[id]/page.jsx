'use client';
import ExamsList from '../../components/ExamsList';
import { useState, useEffect } from "react";
import { useContext } from "react";
import { GlobalContext } from '../../context/store';
import { getSingleCandidatesExams } from '../../api/apiRequests';

const SingleCandidateExams = ({params : { id }}) => {

  const [exams, setExams] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { loggedInUser } = useContext(GlobalContext);

  useEffect(() => {
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
  <h1 className="text-center text-stone-100 font-bold text-4xl md:text-5xl mt-12 text-shadow-sm">Viewing exam sessions for {exams[0]?.candidateName}</h1>
  <p className="text-center text-stone-100 mt-4 mb-16 md:text-xl">To see all exams for a specific student, click on an exam and you will be taken to the relevant page.</p>
  {exams.length > 0 && <ExamsList exams={exams} isLoading={isLoading}/>}
</main>
);
};

export default SingleCandidateExams;