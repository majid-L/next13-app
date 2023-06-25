import { handleChange, handleClick } from "../helpers/examPageHelpers";

const DataControls = ({
    query,
    setQuery,
    setDate,
    setLocation,
    setCandidateName,
    totalResults,
    currentPage,
    totalPages,
    pageLinks,
    pageControl,
    setPageControl,
    candidateName,
    setLimit,
    setOrder,
    limit,
    order,
    view,
    location
}: DataControlsProps) => {
  return (<div className="flex flex-col items-center lg:flex-row sm:justify-center">
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
  <select onChange={e => setLimit(Number(e.target.value))} value={limit} className="ml-2 p-1 bg-gray-100 border-2 border-gray-300 rounded mb-1">
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
  </div>);
}

export default DataControls;