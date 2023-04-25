'use client';
import { useState, useEffect } from "react";
import { useContext } from "react";
import { GlobalContext } from '../context/store';
import { getSingleCandidatesExams } from '../api/apiRequests';

export const useFetchExamsForCandidate = id => {
  const [exams, setExams] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [pageLinks, setPageLinks] = useState({prev: '', next: ''});
  const { loggedInUser } = useContext(GlobalContext);

  useEffect(() => {
    setIsLoading(true);
      getSingleCandidatesExams(loggedInUser, id)
      .then(res => {
        setIsLoading(false);
        setExams(res.exams);
        setPageLinks({prev: res.links.prev, next: res.links.next});
     })
     .catch(() => {
        setIsLoading(false);
        /* * */
     });
  }, []);

  return {exams, isLoading, pageLinks};
}