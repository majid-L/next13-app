import axios from "axios";

const requestHeaders = (token: string): RequestHeaders => {
  return {
    headers: { 'Authorization': 'Bearer ' + token },
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With'
  }
};

const baseUrl = 'https://laravel-php-api.vercel.app/public/api';

export const signup = (...args: string[]): Promise<Auth> => {
  const [name, email, password, passwordConf] = args;
  return axios.post(`${baseUrl}/signup`, {name, email, password, 'password_confirmation': passwordConf})
  .then(({data}) => data);
}

export const login = (email: string, password: string): Promise<Auth> => {
  return axios.post(`${baseUrl}/login`, {email, password})
  .then(({data}) => data);
}

export const logout = (token: string, id: string): Promise<{msg: string}> => {
  return axios.get(`${baseUrl}/logout/${id}`, requestHeaders(token))
  .then(({data}) => data);
}

export const getExams = (...args: GetExamsArgs): Promise<GetExamsResponse> => {
  const [token, name, location, formattedDate, month, year, limit, page, order] = args;
  return axios({
    method: 'get',
    url: `${baseUrl}/exams`,
    params: { name, location, date: formattedDate, month, year, limit, page, order },
    headers: requestHeaders(token).headers
  })
  .then(({data}) => data);
}

export const getUpcomingExams = (token: string, date: string): Promise<GetExamsResponse> => {
  return axios.get(`${baseUrl}/exams?after=${date}&order=asc&limit=40`, requestHeaders(token))
  .then(({data}) => data);
};

export const getSingleExam = (token: string, id: string): Promise<GetSingleExamResponse> => {
  return axios.get(`${baseUrl}/exams/${id}`, requestHeaders(token))
  .then(({data}) => data);
};

export const getSingleCandidatesExams = (token: string, id: string): Promise<GetExamsResponse> => {
  return axios.get(`${baseUrl}/users/${id}/exams`, requestHeaders(token))
  .then(({data}) => data);
};

export const getCandidates = (token: string): Promise<GetCandidatesResponse> => {
  return axios.get(`${baseUrl}/users`, requestHeaders(token))
  .then(({data}) => data);
};

export const deleteExam = (token: string, id: number): Promise<number> => {
  return axios.delete(`${baseUrl}/exams/${id}`, requestHeaders(token))
  .then(({data}) => data);
}

export const postExam = (token: string, newExam: ExamPostRequestBody): Promise<PostPutExamResponse> => {
  return axios({
    method: 'post',
    url: `${baseUrl}/exams`,
    headers: requestHeaders(token).headers,
    data: newExam
  })
  .then(({data}) => data);
}

export const updateExam = (token: string, id: string, body: ExamPutRequestBody): Promise<PostPutExamResponse> => {
  return axios({
    method: 'put',
    url: `${baseUrl}/exams/${id}`,
    headers: requestHeaders(token).headers,
    data: body
  })
  .then(({data}) => data);
}