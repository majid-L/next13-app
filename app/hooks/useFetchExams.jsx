'use client';
import { useState, useEffect } from "react";
import { useContext } from "react";
import { GlobalContext } from '../context/store';
import { getExams, getSingleCandidatesExams } from '../api/apiRequests';

const useFetchExams = (limit = 30, id = null) => {
  const [exams, setExams] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [pageLinks, setPageLinks] = useState({prev: '', next: ''});
  const { loggedInUser } = useContext(GlobalContext);

  useEffect(() => {
    setIsLoading(true);
    if (!id) {
      getExams(loggedInUser, limit)
      .then(res => {
        setIsLoading(false);
        setExams(res.exams);
        setPageLinks({prev: res.links.prev, next: res.links.next});
     })
     .catch(() => {
        setIsLoading(false);
        /* * */
     });
    } else {
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
    }
  }, []);

  return {exams, isLoading, pageLinks};
}

export default useFetchExams;