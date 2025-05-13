import axios from "axios";

const useAxios = () => {
  const axiosPublic = axios.create({
    baseURL: "https://car-rental-bffa8.web.app",
  });
  return axiosPublic;
};

export default useAxios;
