import ExamsList from '../components/ExamsList';
import ExamsMap from '../components/ExamsMap';

const DisplayView = ({ exams, setExams, errorMsg, isLoading, loggedInUser, date, month, year, view, setConfirmationMsg }: DisplayViewProps) => {
  return (
  <section className="xl-2:w-4/5 xl-2:mx-auto">
    {/* Conditionally render map or list */}
    {exams.length === 0 && !errorMsg.value && !isLoading ? 
    <>
    <div className="bg-red-400 w-56 rounded p-3 flex mx-auto mt-8">
      <img src="/images/x-circle-fill.svg"/>
      <p className="ml-4">No matching results.</p>
    </div> 
    {(date || month || year) && 
    <p className="m-4 text-center text-slate-200 text-lg italic">Tip: deselect any active date filters to show more results.</p>}
    </>
    : view === 'list' ? <ExamsList loggedInUser={loggedInUser} exams={exams} setExams={setExams} isLoading={isLoading} setConfirmationMsg={setConfirmationMsg}/>
    : <ExamsMap exams={exams} isLoading={isLoading}/>}
  </section>
  );
}

export default DisplayView;