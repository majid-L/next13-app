'use client';
import Link from 'next/link';
import Exams from '../components/Exams';
//import useFetchExams from '../hooks/useFetchExams';
import { getPaginatedList, getExams, searchByName } from '../api/apiRequests';
import { useEffect, useContext, useState } from 'react';
import { GlobalContext } from '../context/store';

const ExamsPage = () => {
//const {exams, isLoading, pageLinks} = useFetchExams();
const [exams, setExams] = useState('');
const [isLoading, setIsLoading] = useState(false);
const [pageLinks, setPageLinks] = useState({prev: '', next: ''});
const [currentPage, setCurrentPage] = useState(1);
const { loggedInUser } = useContext(GlobalContext);

const [candidateName, setCandidateName] = useState('');

const transformUrl = (buttonId, pageLinks) => {
  return buttonId === 'prev' ? 
    pageLinks.prev.slice(pageLinks.prev.indexOf('laravel')) 
    : pageLinks.next.slice(pageLinks.next.indexOf('laravel'));
}

useEffect(() => {
  setIsLoading(true);
    getExams(loggedInUser, 30)
    .then(({exams, links : { prev, next }}) => {
      setIsLoading(false);
      setExams(exams);
      setPageLinks({prev, next});
   })
   .catch(() => {
      setIsLoading(false);
   });
}, []);

const handleClick = ({ target : { id }}) => {
  if (id === 'prev' && !pageLinks.prev) return;
  if (id === 'next' && !pageLinks.next) return;
  getPaginatedList(loggedInUser, 'https://' + transformUrl(id, pageLinks))
  .then(({exams, meta : { current_page: page }, links : { prev, next }}) => {
    setIsLoading(false);
    setExams(exams);
    setPageLinks({prev, next});
    setCurrentPage(page);
 })
 .catch(() => {
    setIsLoading(false);
 });
}

return (
<main className="text-center mt-20 pb-20 mx-auto w-11/12 sm:w-5/6">
  <h1 className="text-center text-stone-100 font-bold text-4xl md:text-5xl mt-20">Viewing all exams</h1>
  <p className="text-center text-stone-100 mt-2 mb-16 md:text-xl">To see all exams for a specific student, click on an exam and you will be taken to the relevant page.</p>

  <div className="flex justify-center">
  {/* filter/search by name */}
  <div className="bg-slate-200 w-2/12 mb-3 mx-3 rounded px-2">
  <p className="pt-1">Filter by name</p>
  <input onChange={e => setCandidateName(e.target.value)} value={candidateName} type="text" placeholder="Begin typing" className="w-full my-2 p-1"/>
  </div>

  {/* pagination */}
  <div className="bg-slate-200 w-fit mb-3 mx-3 rounded px-2">
  <p className="pt-1">Current page: {currentPage}</p>
  <button id="prev" onClick={handleClick} className="bg-brightPink px-2 py-1 m-2 rounded-md">Prev</button>
  <button id="next" onClick={handleClick} className="bg-brightPink px-2 py-1 m-2 rounded-md">Next</button>
  </div>
  </div>
  <Exams exams={exams} isLoading={isLoading}/>
</main>
);
};

export default ExamsPage;