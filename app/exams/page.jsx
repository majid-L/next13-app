'use client';
import Exams from '../components/Exams';
import useFetchExams from '../hooks/useFetchExams';

const ExamsPage = () => {
const {exams, isLoading} = useFetchExams();

return (
<main className="text-center mt-20 pb-20 mx-auto w-11/12 sm:w-5/6">
  <h1 className="text-center text-stone-100 font-bold text-4xl md:text-5xl mt-20">Viewing all exams</h1>
  <p className="text-center text-stone-100 mt-2 mb-16 md:text-xl">To see all exams for a specific student, click on an exam and you will be taken to the relevant page.</p>
  <Exams exams={exams} isLoading={isLoading}/>
</main>
);
};

export default ExamsPage;