import axios from "axios";

const requestHeaders = loggedInUser => {
  return {
    headers: { 'Authorization': 'Bearer ' + loggedInUser.token },
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With'
  }
};

const baseUrl = 'https://laravel-php-api.vercel.app/public/api';

export const getExams = (loggedInUser, limit) => { 
  return axios.get(`${baseUrl}/exams?limit=${limit}`, requestHeaders(loggedInUser))
  .then(({data}) => data);
};

export const getSingleExam = (loggedInUser, id) => {
  return axios.get(`${baseUrl}/exams/${id}`, requestHeaders(loggedInUser))
  .then(({data}) => data);
};

export const getPaginatedList = (loggedInUser, url) => {
  return axios.get(url, requestHeaders(loggedInUser))
  .then(({data}) => data);
};

export const getSingleCandidatesExams = (loggedInUser, id) => {
  return axios.get(`${baseUrl}/users/${id}/exams`, requestHeaders(loggedInUser))
  .then(({data}) => data);
};

export const getCandidates = loggedInUser => {
  return axios.get(`${baseUrl}/users`, requestHeaders(loggedInUser))
  .then(({data}) => data);
};

export const searchByName = (loggedInUser, string) => {
  return axios.get(`${baseUrl}/exams/search/${string}`, requestHeaders(loggedInUser))
  .then(({data}) => data);
}