// API requests
export type Auth = {
  user: {
    email: string,
    id: string,
    name: string
  },
  token: string
}

export type RequestHeaders = {
  headers: {
    'Authorization': string
  },
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With'
}

export type AuthResponse = {
  user: Auth
}

export type GetExamsArgs = [
  loggedInUser: Auth,
  name: string,
  location: string, 
  formattedDate: string, 
  month: number, 
  year: number, 
  limit: number, 
  page: number, 
  order: number
];

type Exam = {
  id: number,
  title: string,
  candidateId: number,
  candidateName: string,
  date: string,
  description: string,
  latitude: string,
  longitude: string
  locationName: string
}

type ExamLink = {
  url: string | null,
  label: string,
  active: boolean
}

export type GetExamsResponse = {
  exams: Exam[],
  links: {
    first: string,
    last: string,
    next: string | null,
    prev: string | null
  },
  meta: {
    current_page: number,
    from: number,
    last_page: number,
    links: ExamLink[],
    path: string,
    per_page: number,
    to: number,
    total: string
  }
}

export type GetSingleExamResponse = {
  exam: Exam
}

export type User = {
  id: number,
  email: string,
  name: string
}

export type GetCandidatesResponse = {
  users: User[]
}

export type ExamRequestBody = {
  candidate_id: string,
  candidate_name: string,
  date: string,
  description: string,
  latitude: string,
  longitude: string,
  location_name: string,
  time: string,
  title: string
}