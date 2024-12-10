import axios from "axios";
import { useState, useEffect } from "react";
import ProcessError from "../error";
import { toast } from "sonner";

export function useCreate<T extends object>(params: string) {
   const [loading, setLoading] = useState(false);
   //  const { user } = useUserStore();

   async function create({
      payload,
      infunctionParam,
      errorMessage,
   }: {
      payload: T;
      infunctionParam?: string;
      errorMessage?: string;
   }) {
      try {
         setLoading(true);
         //    await axiosRequest.post({ url: params, payload: payload });

         const response = await axios.post(
            `https://api0.loystar.co/api/v2/${infunctionParam || params}`,
            payload,
            {
               headers: {
                  // client: user?.client,
                  //'access-token': user?.access_token,
                  // uid: user?.uid,
               },
            },
         );

      //   console.log(response);

         return { data: response?.data, headers: response?.headers };

         // console.log(response.data)
      } catch (error: any) {
         if (error?.response?.status === 422 || error?.response?.status === 401) {
            toast.error(errorMessage || "Incomplete Details");
            return null;
         } else {
            ProcessError(error);
            return null;
         }
      } finally {
         setLoading(false);
      }
   }
   return {
      loading,
      create,
   };
}

/**
  
     */

/**
 *
 * @param endpoint
 * @param enable
 * @returns
 */

export function useGetData<TData>(endpoint: string, enable = true) {
   const [loading, setLoading] = useState(false);
   const [data, setData] = useState<TData | null>(null);

   async function fetchData() {
      if (!enable) return;
      try {
         setLoading(true);
         const response = await axios.get(endpoint);

         setData(response?.data);
         //   const total = Math.ceil(response?.data?.totalItems / 20);
      } catch (error: any) {
         ProcessError(error);
         // Handle error
      } finally {
         setLoading(false);
      }
   }

   useEffect(() => {
      fetchData();
   }, [endpoint]);
   return {
      data,
      loading,
      refetch: fetchData,
   };
}

export function useLoystarGetRequest<TData>(endpoint: string, payload: any) {
   const [loading, setLoading] = useState(false);
   const [data, setData] = useState<TData | null>(null);

   async function fetchData() {
      try {
         setLoading(true);
         const response = await axios.post(endpoint, { payload });

         setData(response?.data);
      } catch (error: any) {
         ProcessError(error);
         // Handle error
      } finally {
         setLoading(false);
      }
   }

   async function queryData() {
      try {
         const response = await axios.post(endpoint, { payload });

         return response?.data;
      } catch (error: any) {
         ProcessError(error);
         // Handle error
         return [];
      }
   }

   useEffect(() => {
      fetchData();
   }, [endpoint]);
   return {
      data,
      loading,
      refetch: fetchData,
      queryData,
   };
}

export function useDelete() {
   const [loading, setLoading] = useState(false);
   // const { user } = useUserStore();

   async function deletes(params: string) {
      try {
         setLoading(true);
         await axios.delete(
            `https://api0.loystar.co/api/v2/${params}`,

            {
               headers: {
                  //  client: user?.client,
                  // 'access-token': user?.access_token,
                  // uid: user?.uid,
               },
            },
         );
      } catch (error: any) {
         ProcessError(error);
      } finally {
         setLoading(false);
      }
   }

   //     async function postDeletes(params: string) {
   //       try {
   //         setLoading(true);
   //         await axios.post(
   //           `https://api0.loystar.co/api/v2/${params}`,
   //           {},
   //           {
   //             headers: {
   //               client: user?.client,
   //               'access-token': user?.access_token,
   //               uid: user?.uid,
   //             },
   //           },
   //         );
   //       } catch (error: any) {
   //         processError(error);
   //       } finally {
   //         setLoading(false);
   //       }
   //     }
   //     return {
   //       deleteLoading :loading,
   //       postDeletes,
   //       deletes
   //     };
}

export function useMutate<T extends object>(params: string) {
   const [loading, setLoading] = useState(false);
   ///const { user } = useUserStore();

   async function mutating(payload: T, infunctionParam?: string) {
      try {
         setLoading(true);
         //    await axiosRequest.post({ url: params, payload: payload });

         const response = await axios.put(
            `https://api0.loystar.co/api/v2/${infunctionParam || params}`,
            payload,
            {
               headers: {
                  //  client: user?.client,
                  // 'access-token': user?.access_token,
                  // uid: user?.uid,
               },
            },
         );

         return response.data;
      } catch (error: any) {
         ProcessError(error);

         return null;
      } finally {
         setLoading(false);
      }
   }
   return {
      loading,
      mutating,
   };
}

export function useCreateUserRequest<T extends object>(params: string) {
   const [loading, setLoading] = useState(false);
   const loystarToken = localStorage.getItem("loystarToken");

   async function create({
      payload,
      infunctionParam,
      errorMessage,
   }: {
      payload: T;
      infunctionParam?: string;
      errorMessage?: string;
   }) {
      try {
         setLoading(true);
         //    await axiosRequest.post({ url: params, payload: payload });

         const response = await axios.post(
            `https://api1.loystar.co/api/v2/${infunctionParam || params}`,
            payload,
            {
               headers: {
                  "Authorization": `Bearer `+ loystarToken,
               },
            },
         );

        console.log(response);

         return { data: response?.data, headers: response?.headers };

         // console.log(response.data)
      } catch (error: any) {
         if (error?.response?.status === 422 || error?.response?.status === 401) {
            toast.error(errorMessage || "Incomplete Details");
            return null;
         } else {
            ProcessError(error);
            return null;
         }
      } finally {
         setLoading(false);
      }
   }
   return {
      loading,
      create,
   };
}


export function useMutateRequest<T extends object>(params: string) {
   const [loading, setLoading] = useState(false);
   const loystarToken = localStorage.getItem("loystarToken");

   async function create({
      payload,
      infunctionParam,
      errorMessage,
   }: {
      payload: T;
      infunctionParam?: string;
      errorMessage?: string;
   }) {
      try {
         setLoading(true);
         //    await axiosRequest.post({ url: params, payload: payload });

         const response = await axios.patch(
            `https://api0.loystar.co/api/v2/${infunctionParam || params}`,
            payload,
            {
               headers: {
                  "Authorization": `Bearer `+ loystarToken,
               },
            },
         );

   //     console.log(response);

         return { data: response?.data, headers: response?.headers };

         // console.log(response.data)
      } catch (error: any) {
         if (error?.response?.status === 422 || error?.response?.status === 401) {
            toast.error(errorMessage || "Incomplete Details");
            return null;
         } else {
            ProcessError(error);
            return null;
         }
      } finally {
         setLoading(false);
      }
   }
   return {
      loading,
      create,
   };
}
