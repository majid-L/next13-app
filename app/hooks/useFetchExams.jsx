'use client';
import { useState, useEffect } from "react";
import { useContext } from "react";
import { GlobalContext } from '../context/store';
import { getExams } from '../api/apiRequests';

const useFetchExams = () => {
  const [exams, setExams] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { loggedInUser } = useContext(GlobalContext);

  useEffect(() => {
    setIsLoading(true);
    getExams(loggedInUser)
    .then(res => {
        setIsLoading(false);
        setExams(res.exams);
    })
    .catch(() => {
        setIsLoading(false);
        /* * */
    });
  }, []);

  return {exams, isLoading};
}

export default useFetchExams;