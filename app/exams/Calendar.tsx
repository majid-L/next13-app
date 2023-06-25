import Calendar from 'react-calendar';
import { handleMonthChange, highlightExamDates, resetDateFilter } from '../helpers/examPageHelpers';
import { useMemo } from 'react';

const CalendarControls = ({setDate, setMonth, setYear, exams}: CalendarControlsProps) => {
  const examsSet = useMemo(() => {
    return new Set(exams.map(({date}: {date: string}) => date.slice(0, 10)));
  }, []);

  return (
  <>
    <Calendar onChange={setDate as CalendarOnChange} onClickMonth={handleMonthChange(setDate, setMonth, setYear)} tileClassName={highlightExamDates(examsSet)}/>
    <button onClick={resetDateFilter(setDate, setMonth, setYear)} className="bg-brightPink border-1 border-gray-500 shadow-lg shadow-pink-950/80 block w-56 px-3 py-1 mx-auto mb-4 rounded-md">Deselect date filter</button>
  </>
  );
}

export default CalendarControls;