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

export const getExams = (loggedInUser, name, location, formattedDate, month, year, limit, page) => {
  return axios({
    method: 'get',
    url: `${baseUrl}/exams`,
    params: { name, location, date: formattedDate, month, year, limit, page },
    headers: requestHeaders(loggedInUser).headers
  })
  .then(({data}) => data);
}

export const getSingleExam = (loggedInUser, id) => {
  return axios.get(`${baseUrl}/exams/${id}`, requestHeaders(loggedInUser))
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

export const deleteExam = (loggedInUser, id) => {
  return axios.delete(`${baseUrl}/exams/${id}`, requestHeaders(loggedInUser))
  .then(({data}) => data);
}