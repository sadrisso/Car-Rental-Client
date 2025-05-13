import axios from "axios";

const useAxios = () => {
  const axiosPublic = axios.create({
    baseURL: "https://car-rental-server-smoky.vercel.app",
  });
  return axiosPublic;
};

export default useAxios;
