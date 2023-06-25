import { SetStateAction } from "react";

export {}

declare global {
/******************************************************************************/
// Types for API requests (function arguments plus request and response bodies)
  type StrOrNull = string | null;

  export type Auth = {
    user: {
      email: StrOrNull,
      id: StrOrNull,
      name: StrOrNull
    } | null,
    token: StrOrNull
  }
  
  export type RequestHeaders = {
    headers: {
      'Authorization': string
    },
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With'
  }
  
  export type AuthResponse = { user: Auth }
  
  export type GetExamsArgs = [
    token: string,
    name: string,
    location: string, 
    formattedDate: string, 
    month: string, 
    year: string, 
    limit: number, 
    page: number, 
    order: string
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
  
  export type GetSingleExamResponse = { exam: Exam }
  
  export type User = {
    id: number,
    email: string,
    name: string
  }
  
  export type GetCandidatesResponse = { users: User[] }
  
  // This is the format of POST request bodies and POST/PUT responses
  type ExamFields = {
    title: string
    description: string,
    candidate_id: string | number,
    candidate_name: string,
    date: string,
    location_name: string,
  }
  
  export type ExamPostRequestBody = ExamFields & {
    latitude: string,
    longitude: string,
    time: string 
  }
  
  export type ExamPutRequestBody = {
    date?: string,
    description?: string,
    location_name?: string
    time?: string,
    title?: string,
  }
  
  export type PostPutExamResponse = ExamFields & { 
    latitude: string,
    longitude: string,
    id: number 
  }

  // This is the structure of the PUT request body
  export type ExamDetails = {
    date: string,
    description: string,
    location_name: string,
    time: string,
    title: string
  }

/******************************************************************************/
// Types for context provider
type ContextValues = {
  loggedInUser: Auth,
  setLoggedInUser?: Dispatch<SetStateAction<Auth>>
}

/******************************************************************************/
// Prop types for pagination/filtering component
  export type DataControlsProps = {
    query: string,
    setQuery: Dispatch<SetStateAction<string>>,
    setDate: Dispatch<SetStateAction<Date | "">>,
    setLocation: Dispatch<SetStateAction<string>>,
    setCandidateName: Dispatch<SetStateAction<string>>,
    setPageControl: Dispatch<SetStateAction<number>>,
    setLimit: Dispatch<SetStateAction<number>>,
    setOrder: Dispatch<SetStateAction<string>>,
    totalResults: string,
    currentPage: number,
    totalPages: string | number,
    pageLinks: PageLinks,
    pageControl: number,
    candidateName: string,
    limit: number,
    order: string,
    view: string,
    location: string
  }

  export type PageLinks = {
    prev: string | null, 
    next: string | null
  }

/******************************************************************************/
// Prop types for component responsible for rendering map/list view
  export type DisplayViewProps = {
    exams: Exam[],
    setExams: Dispatch<SetStateAction<Exam[]>>,
    setConfirmationMsg: Dispatch<SetStateAction<string>>,
    errorMsg: {value: string, show: string},
    isLoading: boolean,
    loggedInUser: Auth,
    date: Date | string,
    month: string,
    year: string,
    view: string
  }

/******************************************************************************/
// Prop types for calendar
  export type CalendarControlsProps = {
    setDate: Dispatch<SetStateAction<Date | ''>>,
    setMonth: Dispatch<SetStateAction<string>>,
    setYear: Dispatch<SetStateAction<string>>,
    exams: Exam[]
  }

  export type CalendarOnChange = (value: Value, event: MouseEvent<HTMLButtonElement, MouseEvent>) => void | undefined;

/******************************************************************************/
// Prop types for component responsible for views control
  export type ViewControlsProps = {
    setView: Dispatch<SetStateAction<string>>,
    loggedInUser: Auth
  }

/******************************************************************************/
// Prop types and state setter for exam form
  export type ExamFormProps = {
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void,
    examDetails: ExamFormFields,
    setExamDetails: Dispatch<SetStateAction<ExamFormFields>>,
    formType: string
  }

  export type ExamFormFields = ExamFields & {
    time: string
  }

/******************************************************************************/
// Prop types for exams list component
  export type ExamsListProps = {
    isLoading: Boolean,
    exams: Exam[],
    loggedInUser: Auth,
    setConfirmationMsg: Dispatch<SetStateAction<string>>,
    setExams: Dispatch<SetStateAction<Exam[] | []>>
  }

/******************************************************************************/
// Prop types for exams map
export type ExamsMapProps = {
  isLoading: boolean,
  exams: Exam[]
}

/******************************************************************************/
// Prop types for error boundary and error notification
  export type ErrorProps = {
    error: Error,
    reset: () => void;
  }

  type ErrorMsg = {
    value: string,
    show: boolean
  }

  export type ErrorMEssage = {
    errorMsg: ErrorMsg,
    setErrorMsg: Dispatch<SetStateAction<ErrorMsg>>
  }

/******************************************************************************/
// Prop types for confiramtion message component
  export type ConfirmationProps = {
    confirmationMsg: string,
    setConfirmationMsg: Dispatch<SetStateAction<string>>
  }

/******************************************************************************/
// Prop types for show/hide toggle buttons on PUT form
  export type ToggleHideButtonsProps = {
    setShowContent: Dispatch<SetStateAction<boolean>>
  }

}