import axios from "axios";
import React from "react";

const useAxios = () => {
  const axiosPublic = axios.create({
    baseURL: " https://car-rental-bffa8.web.app",
  });
  return axiosPublic;
};

export default useAxios;
