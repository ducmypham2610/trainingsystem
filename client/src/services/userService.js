import {
  API_URL_GET_USERS,
  API_URL_DELETE_USER,
  API_URL_UPDATE_USER,
  API_URL_GET_USER
} from "../constants/configUrl";
import axiosClient from "./http-common";

export const getAllUsers = () => {
  return axiosClient.get(API_URL_GET_USERS);
};

export const deleteUser = (id) => {
  return axiosClient.delete(API_URL_DELETE_USER + "/" + id);
};

export const updateUser = (id) => {
  return axiosClient.put(API_URL_UPDATE_USER + "/" + id);
};

export const getUser = (id) => {
  return axiosClient.get(API_URL_GET_USER + "/" + id);
}