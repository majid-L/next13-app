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

export const signup = (name, email, password, passwordConf) => {
  return axios.post(`${baseUrl}/signup`, {name, email, password, 'password_confirmation': passwordConf})
  .then(({data}) => data);
}

export const login = (email, password) => {
  return axios.post(`${baseUrl}/login`, {email, password})
  .then(({data}) => data);
}

export const logout = (loggedInUser, id) => {
  return axios.get(`${baseUrl}/logout/${id}`, requestHeaders(loggedInUser))
  .then(({data}) => data);
}

export const getExams = (loggedInUser, name, location, formattedDate, month, year, limit, page) => {
  return axios({
    method: 'get',
    url: `${baseUrl}/exams`,
    params: { name, location, date: formattedDate, month, year, limit, page },
    headers: requestHeaders(loggedInUser).headers
  })
  .then(({data}) => data);
}

export const getUpcomingExams = (loggedInUser, date) => {
  return axios.get(`${baseUrl}/exams?after=${date}&order=asc&limit=40`, requestHeaders(loggedInUser))
  .then(({data}) => data);
};

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

export const postExam = (loggedInUser, newExam) => {
  return axios({
    method: 'post',
    url: `${baseUrl}/exams`,
    headers: requestHeaders(loggedInUser).headers,
    data: newExam
  })
  .then(({data}) => data);
}