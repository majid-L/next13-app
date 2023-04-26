// Handle changes in name/location input field changes
export const handleChange = (setDate, query, setCandidateName, setLocation) => {
return ({ target : { value }}) => {
    setDate(null);
    if (query === 'Name') {
      setCandidateName(value);
      setLocation(null);
    } else {
      setLocation(value);
      setCandidateName(null);
    }
  }
}

// Handle change in selected month/date
export const handleMonthChange = (setDate, setMonth, setYear) => {
  return e => {
    setDate(null);
    setMonth(e.getMonth() + 1);
    setYear(e.getFullYear());
 }
}

// Reset date/month filter
export const resetDateFilter = (setDate, setMonth, setYear) => {
return () => {
  setDate(null);
  setMonth(null);
  setYear(null);
}
}

// Helper function to format date string
export const formatDateString = date => {
  if (!date) return null;
  if (typeof(date) === 'object') {
    const dayStr = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const monthStr = date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    return `${date.getFullYear()}-${monthStr}-${dayStr}`;
  }
}

// Highlight dates with scheduled exams
export const highlightExamDates = (examsSet) => {
 return ({ view, date }) => {
    if (examsSet.has(formatDateString(date))) return "exam-dates";
}
}

// Handle page navigation
export const handleClick = (pageLinks, pageControl, setPageControl) => {
return ({ target : { id }}) => {
  if (id === 'prev') {
    if (!pageLinks.prev) return;
    setPageControl(pageControl - 1);
  }
  if (id === 'next'){
    if (!pageLinks.next) return;
    setPageControl(pageControl + 1);
  }
 }
}