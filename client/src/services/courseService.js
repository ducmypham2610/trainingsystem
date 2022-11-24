import {
    API_URL_GET_COURSES,
    API_URL_DELETE_COURSE,
    API_URL_UPDATE_COURSE,
  } from "../constants/configUrl";
  import axiosClient from "./http-common";
  
  export const getAllCourses = () => {
    return axiosClient.get(API_URL_GET_COURSES);
  };
  
  export const deleteCourse = (id) => {
    return axiosClient.delete(API_URL_DELETE_COURSE + "/" + id);
  };
  
  export const updateCourse = (id) => {
    return axiosClient.put(API_URL_UPDATE_COURSE + "/" + id);
  };