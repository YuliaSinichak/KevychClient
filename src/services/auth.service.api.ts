import { LoginRes, LoginReq } from "@/types/auth.login.types";
import { RegisterRes } from "@/types/auth.register.types";

import { appApi } from "./app.service.api";
import axios from "axios";

export const loginFn = async (authData: LoginReq) => {
  const response = await appApi.post<LoginRes>("/auth/login", authData);
  return response.data;
};

export const refreshAccessTokenFn = async () => {
  const response = await axios.get<LoginRes>(
    "https://kevych-49a723d13d60.herokuapp.com/auth/login/access-token"
  );
  return response.data;
};

export const registerFn = async (authData: LoginReq) => {
  const response = await appApi.post<RegisterRes>("/auth/register", authData);
  return response.data;
};

export const logoutFn = async () => {
  const response = await appApi.get("/auth/logout");
  return response.data;
};
