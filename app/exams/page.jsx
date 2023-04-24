'use client';
import Exams from '../components/Exams';
import { getPaginatedList, getExams, searchByName, searchByLocation } from '../api/apiRequests';
import { useEffect, useContext, useState } from 'react';
import { GlobalContext } from '../context/store';

const ExamsPage = () => {
  // States concerned with fetching of exam data
const [exams, setExams] = useState('');
const [isLoading, setIsLoading] = useState(false);
const [pageLinks, setPageLinks] = useState({prev: '', next: ''});
const [currentPage, setCurrentPage] = useState(1);
const { loggedInUser } = useContext(GlobalContext);

// States concerned with filters/queries
const [filter, setFilter] = useState('Name');
const [candidateName, setCandidateName] = useState('');
const [location, setLocation] = useState('');

// Helper function to format URL string ready for axios request
const transformUrl = (buttonId, pageLinks) => {
  return buttonId === 'prev' ? 
    pageLinks.prev.slice(pageLinks.prev.indexOf('laravel')) 
    : pageLinks.next.slice(pageLinks.next.indexOf('laravel'));
}

// Initial data fetch
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

// Filter by name or location
useEffect(() => {
  setIsLoading(true);
  const apiRequestFunction = filter === 'Name' ? searchByName : searchByLocation;
  const filterArgument = filter === 'Name' ? candidateName : location;
  apiRequestFunction(loggedInUser, filterArgument)
  .then(({exams}) => {
    setIsLoading(false);
    setExams(exams);
  })
  .catch(() => {
    setIsLoading(false);
  });
}, [candidateName, location]);

// Pagination logic
const handleClick = ({ target : { id }}) => {
  if (id === 'prev' && !pageLinks.prev) return;
  if (id === 'next' && !pageLinks.next) return;
  setIsLoading(true);
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
  <p className="text-center text-stone-100 mt-4 mb-16 md:text-xl">To see all exams for a specific student, click on an exam and you will be taken to the relevant page.</p>

  <div className="flex justify-center">
  {/* filter by location/search by name */}
  <div className="bg-slate-200 mb-3 mx-3 px-2 w-56 rounded">
  <div className="flex justify-evenly">
  <p className="pt-1 mt-1">Filter by:</p>
  <select onChange={e => setFilter(e.target.value)} value={filter} className="mt-1.5 bg-gray-100 border-2 border-gray-300 rounded p-0.5">
    <option>Name</option>
    <option>Location</option>
  </select>
  </div>
  <input onChange={e => filter === 'Name' ? setCandidateName(e.target.value) : setLocation(e.target.value)} value={filter === 'Name' ? candidateName : location} type="text" placeholder="Begin typing" className="my-2 w-52 p-1 rounded"/>
  </div>

  {/* pagination */}
  <div className="bg-slate-200 w-fit mb-3 mx-3 rounded px-2">
  <p className="pt-1">Current page: {currentPage}</p>
  <button id="prev" onClick={handleClick} className="bg-brightPink border-1 border-gray-500 shadow-lg shadow-pink-950/80 px-2 py-1 m-2 rounded-md">Prev</button>
  <button id="next" onClick={handleClick} className="bg-brightPink border-1 border-gray-500 shadow-lg shadow-pink-950/80 px-2 py-1 m-2 rounded-md">Next</button>
  </div>
  </div>
  {Array.isArray(exams) && !exams.length ? <p className="text-slate-200 mt-4">No matching results.</p> : <Exams exams={exams} isLoading={isLoading}/>}
</main>
);
};

export default ExamsPage;