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
const { loggedInUser } = useContext(LoggedInUserContext);

useEffect(() => {
    setIsLoading(true);
    getUpcomingExams(loggedInUser, formatDateString(new Date()))
    .then(({exams}) => {
        setIsLoading(false);
        setUpcomingExams(exams);
    })
    .catch(err => {
        setIsLoading(false);
    })
}, []);

 return <ul className="bg-slate-200 mb-20 rounded-b-lg overflow-auto preview-list">
    {isLoading ? <Spinner/>
    : upcomingExams.length > 0 ? upcomingExams.map(({id, title, candidateName, date, description}) => {
        return <li key={id} className="p-2">
            <Link href={`/exams/${id}`} className="cursor-pointer">
            <p className="font-bold">{candidateName}</p>
            <div className="flex"><CalendarIcon/><p>{date.slice(0, 10)}</p></div>
            <div className="flex"><ExamIcon/><p className="border-b-1 border-red-400">{title}, {description}</p></div>
            </Link>
        </li>
    }) : null
    }
 </ul>;
};

export default UpcomingExams;