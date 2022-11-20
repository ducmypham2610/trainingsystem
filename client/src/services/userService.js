import { API_URL_GET_USERS } from "../constants/configUrl";
import axiosClient from "./http-common";

export const getAllUsers = () => {
    return axiosClient.get(API_URL_GET_USERS);
}
