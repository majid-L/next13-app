'use client';

import { useState } from "react";

const ExamForm = ({handleSubmit, examDetails, setExamDetails, formType}) => {
  const [showTitle, setShowTitle] = useState(false);
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [showLocation, setShowLocation] = useState(false);

  return (<form onSubmit={handleSubmit} className="mx-auto my-10 p-4 bg-stone-200 w-11/12 max-w-3xl rounded-md shadow-lg shadow-pink-400/60">
  {formType === 'POST' && <><div>
  <label className="block mb-2">Candidate name</label>
  <input required type="text" onChange={e => setExamDetails(prev => ({...prev, candidate_name: e.target.value}))} value={examDetails.candidate_name} className="h-9 p-2 w-full rounded-md border border-stone-400"/>
  </div>
  <div className="mt-4">
  <label className="block mb-2">Candidate ID</label>
  <input required type="text" onChange={e => setExamDetails(prev => ({...prev, candidate_id: e.target.value}))} value={examDetails.candidate_id}  className="h-9 p-2 w-full rounded-md border border-stone-400"/>
  </div></>}

  <div className="mt-4">
  <div className="flex justify-between">
  <label className="block mb-2">Exam title</label>
  {formType === 'PUT' && <div>
  <button onClick={() => setShowTitle(true)} className="bg-white border-2 border-gray-500 px-1 rounded" type="button">Show</button>
  <button onClick={() => setShowTitle(false)} className="bg-white border-2 border-gray-500 px-1 ml-1 rounded" type="button">Hide</button>
  </div>}
  </div>
  {(showTitle || formType === 'POST') && <input required={formType === 'POST'} type="text" onChange={e => setExamDetails(prev => ({...prev, title: e.target.value}))} value={examDetails.title} className="h-9 p-2 w-full rounded-md border border-stone-400"/>}
  </div>

  <div className="mt-4">
  <div className="flex justify-between">
  <label className="block mb-2">Exam date</label>
  {formType === 'PUT' && <div>
  <button onClick={() => setShowDate(true)} className="bg-white border-2 border-gray-500 px-1 rounded" type="button">Show</button>
  <button onClick={() => setShowDate(false)} className="bg-white border-2 border-gray-500 px-1 ml-1 rounded" type="button">Hide</button>
  </div>}
  </div>
  {(showDate || formType === 'POST') && <input required={formType === 'POST'} type="date" onChange={e => setExamDetails(prev => ({...prev, date: e.target.value}))} value={examDetails.date} className="h-9 p-2 w-full rounded-md border border-stone-400"/>}
  </div>

  <div className="mt-4">
  <div className="flex justify-between">
  <label className="block mb-2">Exam time</label>
  {formType === 'PUT' && <div>
  <button onClick={() => setShowTime(true)} className="bg-white border-2 border-gray-500 px-1 rounded" type="button">Show</button>
  <button onClick={() => setShowTime(false)} className="bg-white border-2 border-gray-500 px-1 ml-1 rounded" type="button">Hide</button>
  </div>}
  </div>
  {(showTime || formType === 'POST') && <input required={formType === 'POST'} type="time" onChange={e => setExamDetails(prev => ({...prev, time: e.target.value}))} value={examDetails.time} className="h-9 p-2 w-full rounded-md border border-stone-400"/>}
  </div>

  <div className="mt-4">
  <div className="flex justify-between">
  <label className="block mb-2">Exam description</label>
  {formType === 'PUT' && <div>
  <button onClick={() => setShowDescription(true)} className="bg-white border-2 border-gray-500 px-1 rounded" type="button">Show</button>
  <button onClick={() => setShowDescription(false)} className="bg-white border-2 border-gray-500 px-1 ml-1 rounded" type="button">Hide</button>
  </div>}
  </div>
  {(showDescription || formType === 'POST') && <input required={formType === 'POST'} type="text" onChange={e => setExamDetails(prev => ({...prev, description: e.target.value}))} value={examDetails.description} className="h-9 p-2 w-full rounded-md border border-stone-400"/>}
  </div>

  <div className="mt-4">
  <div className="flex justify-between">
  <label className="block mb-2">Exam location</label>
  {formType === 'PUT' && <div>
  <button onClick={() => setShowLocation(true)} className="bg-white border-2 border-gray-500 px-1 rounded" type="button">Show</button>
  <button onClick={() => setShowLocation(false)} className="bg-white border-2 border-gray-500 px-1 ml-1 rounded" type="button">Hide</button>
  </div>}
  </div>
  {(showLocation || formType === 'POST') && <input required={formType === 'POST'} type="text" onChange={e => setExamDetails(prev => ({...prev, location_name: e.target.value}))} value={examDetails.location_name} className="h-9 p-2 w-full rounded-md border border-stone-400"/>}
  </div>

  <button className="bg-gray-900 text-stone-100 py-2.5 px-5 mt-4 rounded-md active:bg-gray-600">{formType === 'POST' ? 'Add new exam session' : 'Submit updates'}</button>
</form>);
}

export default ExamForm;