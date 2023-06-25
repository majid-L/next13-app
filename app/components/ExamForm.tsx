'use client';

import { useState } from "react";
import ToggleHideButtons from "./ToggleHideButtons";

const ExamForm = ({handleSubmit, examDetails, setExamDetails, formType}: ExamFormProps) => {
  const [showTitle, setShowTitle] = useState(false);
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [showLocation, setShowLocation] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExamDetails((prev: ExamFormFields) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      };
    })
  }

  return (<form onSubmit={handleSubmit} className="mx-auto my-10 p-4 bg-stone-200 w-11/12 max-w-3xl rounded-md shadow-lg shadow-pink-400/60">
  {formType === 'POST' && <><div>
  <label className="block mb-2">Candidate name</label>
  <input required type="text" onChange={handleChange} value={examDetails.candidate_name} name="candidate_name" className="h-9 p-2 w-full rounded-md border border-stone-400"/>
  </div>
  <div className="mt-4">
  <label className="block mb-2">Candidate ID</label>
  <input required type="text" onChange={handleChange} value={examDetails.candidate_id} name="candidate_id" className="h-9 p-2 w-full rounded-md border border-stone-400"/>
  </div></>}

  <div className="mt-4">
  <div className="flex justify-between">
  <label className="block mb-2">Exam title</label>
  {formType === 'PUT' && <ToggleHideButtons setShowContent={setShowTitle}/>}
  </div>
  {(showTitle || formType === 'POST') && <input required={formType === 'POST'} type="text" onChange={handleChange} value={examDetails.title} name="title" className="h-9 p-2 w-full rounded-md border border-stone-400"/>}
  </div>

  <div className="mt-4">
  <div className="flex justify-between">
  <label className="block mb-2">Exam date</label>
  {formType === 'PUT' && <ToggleHideButtons setShowContent={setShowDate}/>}
  </div>
  {(showDate || formType === 'POST') && <input required={formType === 'POST'} type="date" onChange={handleChange} value={examDetails.date} name="date" className="h-9 p-2 w-full rounded-md border border-stone-400"/>}
  </div>

  <div className="mt-4">
  <div className="flex justify-between">
  <label className="block mb-2">Exam time</label>
  {formType === 'PUT' && <ToggleHideButtons setShowContent={setShowTime}/>}
  </div>
  {(showTime || formType === 'POST') && <input required={formType === 'POST'} type="time" onChange={handleChange} value={examDetails.time} name="time" className="h-9 p-2 w-full rounded-md border border-stone-400"/>}
  </div>

  <div className="mt-4">
  <div className="flex justify-between">
  <label className="block mb-2">Exam description</label>
  {formType === 'PUT' && <ToggleHideButtons setShowContent={setShowDescription}/>}
  </div>
  {(showDescription || formType === 'POST') && <input required={formType === 'POST'} type="text" onChange={handleChange} value={examDetails.description} name="description" className="h-9 p-2 w-full rounded-md border border-stone-400"/>}
  </div>

  <div className="mt-4">
  <div className="flex justify-between">
  <label className="block mb-2">Exam location</label>
  {formType === 'PUT' && <ToggleHideButtons setShowContent={setShowLocation}/>}
  </div>
  {(showLocation || formType === 'POST') && <input required={formType === 'POST'} type="text" onChange={handleChange} value={examDetails.location_name} name="location_name" className="h-9 p-2 w-full rounded-md border border-stone-400"/>}
  </div>

  <button className="bg-gray-900 text-stone-100 py-2.5 px-5 mt-4 rounded-md active:bg-gray-600">{formType === 'POST' ? 'Add new exam session' : 'Submit updates'}</button>
</form>);
}

export default ExamForm;