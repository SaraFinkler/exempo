// import axios from "axios";
// import { useGlobalUser } from "../../context/userContext";

// const UNAUTHORAIZED_CODE = 401;

// export function useHttp(baseURL, commonHeaders) {
//   // const [, setGlobalUser] = useGlobalUser();

//   const instance = axios.create({
//     baseURL,
//     headers: commonHeaders,
//   });

//   async function get(url) {
//     try {
//       const response = await instance.get(url);

//       return response.data;
//     } catch (error) {
//       if (error.response.status === UNAUTHORAIZED_CODE) {
//         // setGlobalUser({});
//       }

//       throw error;
//     }
//   }

//   async function post(url, data, headers) {
//     try {
//       const response = await instance.post(url, data, headers);

//       return response.data;
//     } catch (error) {
//       if (error.response.status === UNAUTHORAIZED_CODE) {
//         // setGlobalUser({});
//       }

//       throw error;
//     }
//   }

//   async function put(url, data) {
//     try {
//       const response = await instance.put(url, data);

//       return response.data;
//     } catch (error) {
//       if (error.response.status === UNAUTHORAIZED_CODE) {
//         // setGlobalUser({});
//       }

//       throw error;
//     }
//   }

//   async function remove(url, data) {
//     try {
//       const response = await instance.delete(url, data);

//       return response.data;
//     } catch (error) {
//       if (error.response.status === UNAUTHORAIZED_CODE) {
//         // setGlobalUser({});
//       }

//       throw error;
//     }
//   }

//   return {
//     get,
//     post,
//     put,
//     remove,
//   };
// }
