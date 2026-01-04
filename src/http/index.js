import axios from "axios";

export const API_URL = "http://localhost:5239";

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true
      try {
        const response = await axios.get(`${API_URL}/Auth/refresh`, {
          withCredentials: true,
        });
        return $api.request(originalRequest);
      } catch (e) {
        console.log("UnauthorizedError")
      }
    }
    throw(error)
  }
);

export default $api;