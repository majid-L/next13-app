import { isAxiosError } from "axios";

const errorHandler = (err: object): string => {
  if (isAxiosError(err)) {
    if (err.response?.data?.msg) {
      return err.response.data.msg;
    } else if (err.response?.data?.message) {
      return err.response.data.message;
    } else if (err.message) {
      return err.message;
    }
  } 
  return "Unable to process your request.";
}

export default errorHandler;