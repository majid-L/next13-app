import deleteExam from '../api/apiRequests';

const handleDelete = (loggedInUser, id) => {
    deleteExam(loggedInUser, id)
    .then(res => {
      console.log(res);
    })
};

export default handleDelete;