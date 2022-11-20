import {
    API_URL_GET_CATEGORIES,
    API_URL_DELETE_CATEGORIES,
    API_URL_UPDATE_CATEGORIES,
  } from "../constants/configUrl";
  import axiosClient from "./http-common";
  
  export const getAllCategories = () => {
    return axiosClient.get(API_URL_GET_CATEGORIES);
  };
  
  export const deleteCategories = (id) => {
    return axiosClient.delete(API_URL_DELETE_CATEGORIES + "/" + id);
  };
  
  export const updateCategories = (id) => {
    return axiosClient.put(API_URL_UPDATE_CATEGORIES + "/" + id);
  };