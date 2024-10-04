import { useEffect } from "react";
import clientAxios from "../config/axios";
import useSWR from "swr";
import { useNavigate } from "react-router-dom";

export const useAuth = ({ middleware, url }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("AUTH_TOKEN");
  const {
    data: user,
    error,
    mutate,
  } = useSWR("/api/user", () =>
    clientAxios("/api/user", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.data)
      .catch((error) => {
        throw Error(error?.response?.data?.errors);
      })
  );

  const login = async (dataObj, setErrors) => {
    try {
      const { data } = await clientAxios.post("/api/login", dataObj);
      console.log("RESPONSE", data);
      localStorage.setItem("AUTH_TOKEN", data.token);
      setErrors([]);
      await mutate();
    } catch (error) {
      setErrors(Object.values(error.response.data.errors));
    }
  };

  const register = async (dataObj, setErrors) => {
    try {
      const { data } = await clientAxios.post("/api/register", dataObj);
    } catch (error) {
      setErrors(Object.values(error.response.data.errors));
    }
  };

  const logout = () => {};

  useEffect(() => {
    console.log(middleware, url, user);
    if (middleware == "guest" && url && user) {
    //   navigate(url);
    }
  }, [user, error]);

  return {
    login,
    register,
    logout,
  };
};
