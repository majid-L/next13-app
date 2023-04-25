'use client';
import ExamsList from '../components/ExamsList';
import ExamsMap from '../components/ExamsMap';
import { getExams } from '../api/apiRequests';
import { useEffect, useContext, useState } from 'react';
import { GlobalContext } from '../context/store';
import BackToTopButton from '../components/BackToTopButton';
import userIsAdmin from '../helpers/userIsAdmin';
import Calendar from 'react-calendar';
import Link from 'next/link';
import 'react-calendar/dist/Calendar.css';

const ExamsPage = () => {
// States concerned with fetching of exam data
const [exams, setExams] = useState('');
const [isLoading, setIsLoading] = useState(false);
const { loggedInUser } = useContext(GlobalContext);
const [confirmationMsg, setConfirmationMsg] = useState('');

// View selection
const [view, setView] = useState('list');

// Pagination states
const [pageLinks, setPageLinks] = useState({prev: '', next: ''});
const [pageControl, setPageControl] = useState(1);
const [currentPage, setCurrentPage] = useState(1);
const [limit, setLimit] = useState(30);
const [totalPages, setTotalPages] = useState('');
const [totalResults, setTotalResults] = useState('');

// States concerned with query parameters
const [query, setQuery] = useState('Name');
const [candidateName, setCandidateName] = useState(null);
const [location, setLocation] = useState(null);
const [date, setDate] = useState(null);
const [month, setMonth] = useState(null);
const [year, setYear] = useState(null);

// Scroll up to view confirmation message
if (confirmationMsg) {
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
}

// Fetch exam data in response to change in name/location/date/month/page/limit
useEffect(() => {
  setIsLoading(true);
  getExams(loggedInUser, candidateName, location, formatDateString(date), month, year, limit, pageControl)
  .then(({exams, meta : { current_page: page, last_page: pageCount, total }, links : { prev, next }}) => {
    setIsLoading(false);
    setExams(exams);
    setPageLinks({prev, next});
    setCurrentPage(page);
    setTotalPages(pageCount);
    setTotalResults(total);
 })
 .catch(() => {
    setIsLoading(false);
 });  
}, [candidateName, location, date, month, year, limit, pageControl]);

// Reset results to first page if new query is detected
useEffect(() => {
  setPageControl(1);
}, [candidateName, location, date, month, year, limit]);

// Handle changes in name/location input field changes
const handleChange = ({ target : { value }}) => {
  if (query === 'Name') {
    setCandidateName(value);
    setLocation(null);
  } else {
    setLocation(value);
    setCandidateName(null);
  }
}

// Handle change in selected month/date
const handleMonthChange = e => {
  setDate(null);
  setMonth(e.getMonth() + 1);
  setYear(e.getFullYear());
}

// Reset date/month filter
const resetDateFilter = () => {
  setDate(null);
  setMonth(null);
  setYear(null);
}

// Helper function to format date string
const formatDateString = date => {
  if (!date) return null;
  if (typeof(date) === 'object') {
    const dayStr = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const monthStr = date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    return `${date.getFullYear()}-${monthStr}-${dayStr}`;
  }
}

// Highlight dates with scheduled exams
const highlightExamDates = ({ view, date }) => {
  console.log(e);
 /* if (!exams) return;
  const examDates = exams.map(({date}) => formatDateString(date));
  
  exams.forEach(({date}) => {

  })
  return true ? "exam-dates" : "";*/
}

// Handle page navigation
const handleClick = ({ target : { id }}) => {
  if (id === 'prev') {
    if (!pageLinks.prev) return;
    setPageControl(pageControl - 1);
  }
  if (id === 'next'){
    if (!pageLinks.next) return;
    setPageControl(pageControl + 1);
  }
}

return (
<main className="text-center pb-20 mx-auto w-11/12 sm:w-5/6">
  {/* Confirmation message */}
  {confirmationMsg && <div className="bg-slate-200 --max-w-720 mx-auto mt-5 rounded-md">
  <p className="pt-2">{confirmationMsg}</p>
  <button onClick={() => setConfirmationMsg(false)} className="bg-brightPink border-1 border-gray-500 shadow-lg shadow-pink-950/80 px-3 py-1 mt-3 mb-4 rounded-md">Dismiss</button>
  </div>}

  <h1 className="text-center text-stone-100 font-bold text-4xl md:text-5xl mt-12">{view === 'list' ? 'Viewing all exams' : 'Viewing all exam locations'}</h1>
  <p className="text-center text-stone-100 mt-4 mb-16 md:text-xl">To see all exams for a specific student, click on an exam and you will be taken to the relevant page. <br/>{view === 'map' && 'When using the map, you can zoom in/out and select different view styles.To view information on a specific exam, hover over its icon and from there you can either go to the exam page, or view more exams for that candidate.'}</p>

  <div className="--max-w-720 bg-slate-200 w-auto mb-10 mx-auto rounded px-2 pt-2 pb-3 shadow-lg shadow-stone-400/80 ">
  <ul>
  <p className="pt-1 mb-1 font-bold">How to filter search results using the calendar</p>
  <li className="pt-1 text-left px-3 mb-1">To view all exams taking place on a specific day, simply navigate to the correct day in the calendar view and click on it.</li>
  <li className="pt-1 text-left px-3 mb-1">To view all exams taking place on a specific month, click on the banner at the top of the calendar to bring up the monthly view. From there, you can select the desired year and month and the results will filter accordingly.</li>
  <li className="pt-1 text-left px-3">To reset all date filters, click on the button below the calendar.</li>
  </ul>
  </div>

  {/* list/map view */}
  <div className="flex --max-w-720 w-auto mx-auto">
  <button id="prev" onClick={() => setView('list')} className="bg-brightPink border-1 border-gray-500 shadow-lg shadow-pink-600/80 grow px-3 py-1 mb-8 rounded-md">View as list</button>
  <button id="next" onClick={() => setView('map')} className="bg-brightPink border-1 border-gray-500 shadow-lg shadow-pink-600/80 grow px-3 py-1 mx-2 mb-8 rounded-md">View as map</button>
  {userIsAdmin(loggedInUser) && <Link href='/exams/new' className="bg-orange-300 border-1 border-gray-500 shadow-lg shadow-yellow-500/50 grow px-3 py-1 mb-8 rounded-md">Add new exam</Link>}
  </div>

  {/* Calendar */}
  <Calendar onChange={setDate} onClickMonth={handleMonthChange} tileClassName={highlightExamDates}/>
  <button onClick={resetDateFilter} className="bg-brightPink border-1 border-gray-500 shadow-lg shadow-pink-950/80 w-56 px-3 py-1 mb-4 rounded-md">Remove date filter</button>

  <div className="flex flex-col items-center lg:flex-row sm:justify-center">
  {/* filter by location/name */}
  <div className="bg-slate-200 mb-3 mx-3 px-2 w-56 rounded">
  <div className="flex justify-evenly">
  <p className="pt-1 mt-1">Filter by:</p>
  <select onChange={e => setQuery(e.target.value)} value={query} className="mt-1.5 bg-gray-100 border-2 border-gray-300 rounded p-0.5">
    <option>Name</option>
    <option>Location</option>
  </select>
  </div>
  <input onChange={handleChange} value={query === 'Name' ? candidateName : location} type="text" placeholder="Begin typing" className="my-2 w-full p-1 rounded"/>
  </div>

  {/* page controls */}
  <div className="bg-slate-200 w-56 mb-3 mx-3 rounded px-2 py-1">
  <p className="pt-1">Page: {totalResults ? currentPage : 1}{totalPages && ` of ${totalPages}`} {totalResults ? `(${totalResults} results)` : '(0 results)'}</p>
  <button id="prev" onClick={handleClick} className="bg-brightPink border-1 border-gray-500 shadow-lg shadow-pink-950/80 px-3 py-1 m-2 rounded-md">Prev</button>
  <button id="next" onClick={handleClick} className="bg-brightPink border-1 border-gray-500 shadow-lg shadow-pink-950/80 px-3 py-1 m-2 rounded-md">Next</button>
  </div>

  {/* set page limit */}
  <div className="bg-slate-200 w-56 mb-3 mx-3 rounded px-2 py-1">
  <p className="pt-1 pb-1">Results per page</p>
  <select onChange={e => setLimit(e.target.value)} value={limit} className="mt-1.5 p-1 w-1/2 bg-gray-100 border-2 border-gray-300 rounded mb-1">
    <option>10</option>
    <option>20</option>
    <option>30</option>
    <option>40</option>
    <option>100</option>
    <option>250</option>
  </select>
  </div>
  </div>

  {/* Conditionally render map or list */}
  {Array.isArray(exams) && !exams.length ? 
  <div className="bg-red-400 w-56 rounded p-3 flex mx-auto mt-8">
    <img src="/images/x-circle-fill.svg"/>
    <p className="ml-4">No matching results.</p>
  </div> 
  : view === 'list' ? <ExamsList loggedInUser={loggedInUser} exams={exams} setExams={setExams} isLoading={isLoading} setConfirmationMsg={setConfirmationMsg}/>
  : <ExamsMap exams={exams} isLoading={isLoading}/>}

  {exams.length > 0 && <BackToTopButton />}
</main>
);
};

export default ExamsPage;