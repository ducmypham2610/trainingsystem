import { API_URL_GET_COURSES } from "../constants/configUrl";
import axiosClient from "./http-common";

export const getAllCourses = () => {
    return axiosClient.get(API_URL_GET_COURSES);
}