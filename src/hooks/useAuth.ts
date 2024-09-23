import { loginFn, registerFn } from "@/services/auth.service.api";
import { useMutation } from "@tanstack/react-query";

export const useAuth = () => {
  const loginRequest = useMutation({
    mutationFn: loginFn,
    onSuccess: (data) => {
      console.log("Login successful:", data);
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });

  const registerRequest = useMutation({
    mutationFn: registerFn,
    onSuccess: (data) => {
      console.log("Registration successful:", data);
    },
    onError: (error) => {
      console.error("Registration failed:", error);
    },
  });

  return {
    login: loginRequest,
    register: registerRequest,
  };
};
