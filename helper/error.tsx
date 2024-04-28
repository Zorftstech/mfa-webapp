import { AxiosError } from "axios";
// import toast from 'helper';
import { toast } from "react-toastify";
// import { apiReturnInterface } from 'types';

export const processError = (err: any) => {
   const error = err as AxiosError<any>;
   if (error?.response?.data?.detail) {
      toast.error(error?.response?.data?.detail);
   } else {
      toast.error(error?.message || `An error occurred`);
   }
};
