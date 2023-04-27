const errorHandler = err => {
  if (err.response?.data?.msg) {
      return err.response.data.msg;
    } else if (err.response?.data?.message) {
      return err.response.data.message;
    } else if (err.message) {
      return err.message;
    } else {
      return "Unable to process your request.";
    }
}

export default errorHandler;