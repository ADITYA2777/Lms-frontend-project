

import axios from "axios";

const BASE_URL = "http://localhost:5173/";

const AxiosInstance = axios.create();

AxiosInstance.defaults.baseURL = BASE_URL;
AxiosInstance.defaults.withCredentials = true;

export default AxiosInstance;