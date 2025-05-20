import axios from "axios";
import { url } from "./url";

export const axiosInstance = axios.create({
    baseURL:url,
    withCredentials:true
});
