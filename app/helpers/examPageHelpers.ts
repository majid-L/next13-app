// Handle changes in name/location input field changes
export const handleChange = (
  setDate: React.Dispatch<Date | "">, 
  query: string, 
  setCandidateName: React.Dispatch<React.SetStateAction<string>>, 
  setLocation: React.Dispatch<React.SetStateAction<string>>) => {
  return (e : React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
      setDate('');
      if (query === 'Name') {
        setCandidateName(value);
        setLocation('');
      } else {
        setLocation(value);
        setCandidateName('');
      }
    }
}

// Handle change in selected month/date
export const handleMonthChange = (
  setDate: React.Dispatch<Date | "">, 
  setMonth: React.Dispatch<string>, 
  setYear: React.Dispatch<string>,
  ) => {
  return (date: Date) => {
    setDate('');
    setMonth((date.getMonth() + 1).toString());
    setYear((date.getFullYear()).toString());
 }
}

// Reset date/month filter
export const resetDateFilter = (
  setDate: React.Dispatch<Date | "">, 
  setMonth: React.Dispatch<string>, 
  setYear: React.Dispatch<string>
  ) => {
  return () => {
    setDate('');
    setMonth('');
    setYear('');
  }
}

// Helper function to format date string
export const formatDateString = (date: Date | string): string => {
  if (date && typeof(date) === 'object') {
    const dayStr = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const monthStr = date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    return `${date.getFullYear()}-${monthStr}-${dayStr}`;
  }
  return '';
}

// Highlight dates with scheduled exams
export const highlightExamDates = (examsSet: Set<string>) => {
 return ({ date }: { date: Date }) => {
    if (examsSet.has(formatDateString(date))) return "exam-dates";
}
}

// Handle page navigation
export const handleClick = (
  pageLinks: PageLinks, 
  pageControl: number, 
  setPageControl: React.Dispatch<React.SetStateAction<number>>
  ): React.MouseEventHandler<HTMLButtonElement> => {
  return (e: React.MouseEvent<HTMLButtonElement>) => {
    const id = (e.target as HTMLButtonElement).id;
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