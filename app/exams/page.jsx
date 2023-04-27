'use client';

import ExamsList from '../components/ExamsList';
import ExamsMap from '../components/ExamsMap';
import ErrorMessage from '../components/ErrorMessage';
import ConfirmationMessage from '../components/ConfirmationMessage';
import { getExams } from '../api/apiRequests';
import { useEffect, useContext, useState, useMemo } from 'react';
import { LoggedInUserContext } from '../context/store';
import { handleChange, handleMonthChange, resetDateFilter, formatDateString, highlightExamDates, handleClick } from '../helpers/examPageHelpers';
import BackToTopButton from '../components/BackToTopButton';
import userIsAdmin from '../helpers/userIsAdmin';
import Calendar from 'react-calendar';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import TextSection from '../components/TextSection';
import errorHandler from '../helpers/errorHandler';
import 'react-calendar/dist/Calendar.css';

const ExamsPage = () => {
// States concerned with fetching of exam data
const [exams, setExams] = useState([]);
const [isLoading, setIsLoading] = useState(false);
const { loggedInUser } = useContext(LoggedInUserContext);
const [confirmationMsg, setConfirmationMsg] = useState('');
const [errorMsg, setErrorMsg] = useState({ value: '', show: false});
const examsSet = useMemo(() => new Set(exams.map(({date}) => date.slice(0, 10))));

// Allow user to select list or map view
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
const [candidateName, setCandidateName] = useState('');
const [location, setLocation] = useState('');
const [date, setDate] = useState('');
const [month, setMonth] = useState('');
const [year, setYear] = useState('');
const [order, setOrder] = useState('DESC');

// Scrolls to top, onto the confirmation message
useEffect(() => {
  if (confirmationMsg) {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }
}, [confirmationMsg]);

// Fetch exam data in response to change in name/location/date/month/page/limit
useEffect(() => {
  if (!loggedInUser.user?.id || !userIsAdmin(loggedInUser)) {
    notFound();
  }
  setErrorMsg({value: '', show: ''});
  setIsLoading(true);
  getExams(loggedInUser, candidateName, location, formatDateString(date), month, year, limit, pageControl, order)
  .then(({exams, meta : { current_page: page, last_page: pageCount, total }, links : { prev, next }}) => {
    setIsLoading(false);
    setExams(exams);
    setPageLinks({prev, next});
    setCurrentPage(page);
    setTotalPages(pageCount);
    setTotalResults(total);
 })
 .catch(err => {
    setIsLoading(false);
    setErrorMsg({show: true, value: errorHandler(err)});
 });  
}, [candidateName, location, date, month, year, limit, pageControl, order]);

// Reset results to first page if new query is detected
useEffect(() => {
  setPageControl(1);
}, [candidateName, location, date, month, year, limit]);


return (<main className="pb-20 mx-auto w-11/12 sm:w-5/6">
  <section>
  {confirmationMsg && <ConfirmationMessage confirmationMsg={confirmationMsg} setConfirmationMsg={setConfirmationMsg}/>}

  <TextSection view={view}/>

  {/* list/map view */}
  <div className="flex flex-col w-56 --max-w-720 mx-auto md:w-auto md:flex-row">
  <button id="prev" onClick={() => setView('list')} className="bg-brightPink border-1 border-gray-500 shadow-lg shadow-pink-600/80 grow px-3 py-1 mb-4 rounded-md md:mb-8">View as list</button>
  <button id="next" onClick={() => setView('map')} className="bg-brightPink border-1 border-gray-500 shadow-lg shadow-pink-600/80 w-56 mx-auto grow px-3 py-1 mb-4 rounded-md md:mx-2 md:w-auto md:mb-8">View as map</button>
  {userIsAdmin(loggedInUser) && <Link href='/exams/new' className="bg-orange-300 border-1 border-gray-500 shadow-lg shadow-yellow-500/50 text-center grow px-2 py-1 mb-8 rounded-md">Add new exam</Link>}
  </div>

  {errorMsg.value && errorMsg.show && <ErrorMessage errorMsg={errorMsg} setErrorMsg={setErrorMsg}/>}
  
  {!errorMsg.value && <section>
  {/* Calendar */}
  <Calendar onChange={setDate} onClickMonth={handleMonthChange(setDate, setMonth, setYear)} tileClassName={highlightExamDates(examsSet)}/>
  <button onClick={resetDateFilter(setDate, setMonth, setYear)} className="bg-brightPink border-1 border-gray-500 shadow-lg shadow-pink-950/80 block w-56 px-3 py-1 mx-auto mb-4 rounded-md">Deselect date filter</button>

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
  <input onChange={handleChange(setDate, query, setCandidateName, setLocation)} value={query === 'Name' ? candidateName : location} type="text" placeholder="Begin typing" className="my-2 w-full p-1 rounded"/>
  </div>

  {/* page controls */}
  <div className="bg-slate-200 w-56 mb-3 mx-3 rounded px-2 py-1">
  <p className="pt-1 text-center">Page: {totalResults ? currentPage : 1}{totalPages && ` of ${totalPages}`} {totalResults ? `(${totalResults} results)` : '(0 results)'}</p>
  <div className="flex justify-center">
  <button id="prev" onClick={handleClick(pageLinks, pageControl, setPageControl)} className="bg-brightPink border-1 border-gray-500 shadow-lg shadow-pink-950/80 w-20 px-3 py-1 m-2 rounded-md">Prev</button>
  <button id="next" onClick={handleClick(pageLinks, pageControl, setPageControl)} className="bg-brightPink border-1 border-gray-500 shadow-lg shadow-pink-950/80 w-20 px-3 py-1 m-2 rounded-md">Next</button>
  </div>
  </div>

  {/* set page limit and sort order */}
  <div className="bg-slate-200 w-56 mb-3 mx-3 rounded px-2 py-1">
  <div className="flex justify-between">
  <p className="pt-1 pb-1">Results per page</p>
  <select onChange={e => setLimit(e.target.value)} value={limit} className="ml-2 p-1 bg-gray-100 border-2 border-gray-300 rounded mb-1">
    <option>10</option>
    <option>20</option>
    <option>30</option>
    <option>40</option>
    <option>100</option>
    <option>250</option>
  </select>
  </div>
  <div className="flex justify-between">
  <p className={`pt-1 pb-1${view === 'map' ? ' text-gray-400' : ''}`}>Order by date</p>
  <select onChange={e => setOrder(e.target.value)} value={order} className="p-1 bg-gray-100 border-2 border-gray-300 rounded mb-1" disabled={view === 'map'}>
    <option>ASC</option>
    <option>DESC</option>
  </select>
  </div>
  </div>
  </div>
  </section>}
  </section>

 <section>
  {/* Conditionally render map or list */}
  {exams.length === 0 && !errorMsg.value && !isLoading ? 
  <>
  <div className="bg-red-400 w-56 rounded p-3 flex mx-auto mt-8">
    <img src="/images/x-circle-fill.svg"/>
    <p className="ml-4">No matching results.</p>
    </div> 
    {(date || month || year) && 
    <p className="m-4 text-slate-200 text-lg italic">Tip: deselect any active date filters to show more results.</p>}
  </>
  : view === 'list' ? <ExamsList loggedInUser={loggedInUser} exams={exams} setExams={setExams} isLoading={isLoading} setConfirmationMsg={setConfirmationMsg}/>
  : <ExamsMap exams={exams} isLoading={isLoading}/>}

  {exams.length > 0 && <BackToTopButton />}
  </section>
</main>
);
};

export default ExamsPage;