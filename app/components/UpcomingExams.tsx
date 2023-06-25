'use client';

import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { getUpcomingExams } from '../api/apiRequests';
import { LoggedInUserContext } from '../context/store';
import errorHandler from '../helpers/errorHandler';
import { formatDateString } from '../helpers/examPageHelpers';
import { CalendarIcon, ExamIcon, MapIcon, TimeIcon } from './Icons';
import Spinner from './Spinner';

const UpcomingExams = () => {
const [upcomingExams, setUpcomingExams] = useState<Exam[] | ''>('');
const [isLoading, setIsLoading] = useState(false);
const [errMsg, setErrMsg] = useState('');
const { loggedInUser } = useContext(LoggedInUserContext);

useEffect(() => {
    setErrMsg('');
    setIsLoading(true);
    getUpcomingExams(loggedInUser.token as string, formatDateString(new Date()))
    .then(({exams}) => {
        setIsLoading(false);
        setUpcomingExams(exams);
    })
    .catch(err => {
        setIsLoading(false);
        setErrMsg(errorHandler(err));
    })
}, []);

 return errMsg ? <p className="bg-red-200 p-1 italic">{errMsg}</p> : <ul className={`xl-2:bg-slate-200 w-full sm:w-4/5 mx-auto mb-20 mt-4 rounded-b-md flex justify-center flex-wrap xl-2:block xl-2:mt-0 xl-2:w-full xl-2:overflow-auto ${isLoading ? '--loading' : 'preview-list'}`}>
    {isLoading ? <Spinner margin="mt-12"/>
    : upcomingExams.length > 0 ? (upcomingExams as Exam[]).map(({id, title, candidateName, date, description, locationName}) => {
        return <li key={id} className="p-3 m-3 w-10/12 shadow-lg shadow-pink-200/50 lg:shadow-none sm:w-auto xl-2:m-0 xl-2:p-2 xl-2:border-b-2 rounded border-gray-300 bg-slate-50">
            <Link href={`/exams/${id}`} className="cursor-pointer">
            <p className="font-bold border-b border-b-stone-200 lg:border-none">{candidateName}</p>
            <div className="flex"><ExamIcon/><p className="">{title}, {description}</p></div>
            <div className="flex"><CalendarIcon/><p>{date.slice(0, 10)}</p></div>
            <div className="flex"><TimeIcon/><p>{date.slice(11)}</p></div>
            <div className="flex"><MapIcon/><p>{locationName}</p></div>
            </Link>
        </li>
    }) : null
    }
 </ul>;
};

export default UpcomingExams;