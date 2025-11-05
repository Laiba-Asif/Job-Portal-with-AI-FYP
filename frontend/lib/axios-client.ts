import axios from "axios";

const options = {
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
  timeout: 10000,
};

const API = axios.create(options);
export const APIRefresh = axios.create(options);

let isRefreshing = false;
let refreshSubscribers: ((token?: string) => void)[] = [];

function subscribeTokenRefresh(cb: (token?: string) => void) {
  refreshSubscribers.push(cb);
}

function onRefreshed(token?: string) {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
}

// List of public routes (✅ never redirect on these)
const PUBLIC_ROUTES = ["/", "/about", "/contact", "/auth/login", "/auth/register"];

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const { data, status } = error.response || {};

    if (status === 401 && data?.errorCode === "AUTH_TOKEN_NOT_FOUND") {
      if (!isRefreshing) {
        isRefreshing = true;

        try {
          await APIRefresh.post("/auth/refresh");
          isRefreshing = false;
          onRefreshed();
        } catch (refreshError) {
          isRefreshing = false;

          // Clear local/session storage
          localStorage.removeItem("authUser");
          sessionStorage.clear();

          // 🚀 Only redirect if not on a public route
          const currentPath = window.location.pathname;
          if (!PUBLIC_ROUTES.includes(currentPath)) {
            window.location.replace("/auth/login");
          }

          return Promise.reject(refreshError);
        }
      }

      // Queue pending requests until refresh finishes
      return new Promise((resolve) => {
        subscribeTokenRefresh(() => {
          resolve(API(originalRequest));
        });
      });
    }

    return Promise.reject(error);
  }
);

export default API;




// import axios from 'axios'
// const options = {
//     baseURL : process.env.NEXT_PUBLIC_BACKEND_URL,
//     withCredentials:true,
//     timeout : 10000
// }

// const API = axios.create(options)

// export const APIRefresh = axios.create(options)
// APIRefresh.interceptors.response.use((Response)=>Response)


// API.interceptors.response.use(
//     (response) =>{
//         return response
//     },
//     async (error)=>{
//         const {data, status} = error.response
//         if(data.errorCode==="AUTH_TOKEN_NOT_FOUND" && status === 401){
//             try {
//                 await APIRefresh.post("/auth/refresh")
//                 return APIRefresh(error.config)
//             } catch (error) {
//                 window.location.href = "/"
//             }
//         }
//         return Promise.reject({
//             ...data
//         })
//     }
// )


// export default API