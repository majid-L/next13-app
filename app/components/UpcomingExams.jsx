'use client';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { getUpcomingExams } from '../api/apiRequests';
import { LoggedInUserContext } from '../context/store';
import { formatDateString } from '../helpers/examPageHelpers';
import { CalendarIcon, ExamIcon } from './Icons';
import Spinner from './Spinner';

const UpcomingExams = () => {
const [upcomingExams, setUpcomingExams] = useState([]);
const [isLoading, setIsLoading] = useState(false);
const [errMsg, setErrMsg] = useState('');
const { loggedInUser } = useContext(LoggedInUserContext);

useEffect(() => {
    setErrMsg('');
    setIsLoading(true);
    getUpcomingExams(loggedInUser, formatDateString(new Date()))
    .then(({exams}) => {
        setIsLoading(false);
        setUpcomingExams(exams);
    })
    .catch(err => {
        setIsLoading(false);
        if (err.response?.data?.message) {
            setErrMsg(err.response.data.message);
        } else {
            setErrMsg('Unable to retrieve exam data.');
        }
    })
}, []);

 return errMsg ? <p className="bg-red-200 p-1 italic">{errMsg}</p> : <ul className={`xl-2:bg-slate-200 w-full sm:w-4/5 mx-auto mb-20 mt-4 rounded-b-md flex justify-center flex-wrap xl-2:block xl-2:mt-0 xl-2:w-full xl-2:overflow-auto ${isLoading ? '--loading' : 'preview-list'}`}>
    {isLoading ? <Spinner margin="mt-12"/>
    : upcomingExams.length > 0 ? upcomingExams.map(({id, title, candidateName, date, description}) => {
        return <li key={id} className="p-3 m-3 xl-2:m-0 xl-2:p-2 xl-2:border-b-2 rounded border-gray-300 bg-slate-200">
            <Link href={`/exams/${id}`} className="cursor-pointer">
            <p className="font-bold">{candidateName}</p>
            <div className="flex"><CalendarIcon/><p>{date.slice(0, 10)}</p></div>
            <div className="flex"><ExamIcon/><p className="">{title}, {description}</p></div>
            </Link>
        </li>
    }) : null
    }
 </ul>;
};

export default UpcomingExams;