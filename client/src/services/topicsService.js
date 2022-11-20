import {
    API_URL_GET_TOPICS,
    API_URL_DELETE_TOPIC,
    API_URL_UPDATE_TOPIC,
  } from "../constants/configUrl";
  import axiosClient from "./http-common";
  
  export const getAllTopics = () => {
    return axiosClient.get(API_URL_GET_TOPICS);
  };
  
  export const deleteTopic = (id) => {
    return axiosClient.delete(API_URL_DELETE_TOPIC + "/" + id);
  };
  
  export const updateTopic = (id) => {
    return axiosClient.put(API_URL_UPDATE_TOPIC + "/" + id);
  };