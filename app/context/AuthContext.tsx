"use client";
import React from "react";
import { createContext } from "react";
import { getCookie } from "cookies-next";
import axios from "axios";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
}
interface State {
  loading: boolean;
  error: string | null;
  data: User | null;
}
interface AuthState extends State {
  setAuthState: React.Dispatch<React.SetStateAction<State>>;
}
export const AuthenticationContext = createContext<AuthState>({
  loading: false,
  data: null,
  error: null,
  setAuthState: () => {},
});
export default function AuthContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authState, setAuthState] = React.useState<State>({
    loading: true,
    data: null,
    error: null,
  });
  const currentUser = async () => {
    setAuthState({ data: null, error: null, loading: true });

    try {
      const jwt = getCookie("jwt");
      if (!jwt) {
        return setAuthState({
          data: null,
          error: "Please Login",
          loading: false,
        });
      }
      const response = await axios.get("http://localhost:3000/api/auth/me", {
        headers: {
          Authorization: "Bearer " + jwt,
        },
      });
      (axios.defaults.headers.common["Authorization"] = "Bearer " + jwt),
        setAuthState({
          data: response.data.message,
          error: null,
          loading: false,
        });
    } catch (error: any) {
      setAuthState({
        data: null,
        error: error.response.data.message,
        loading: false,
      });
    }
  };
  React.useEffect(() => {
    currentUser();
  }, []);

  return (
    <AuthenticationContext.Provider value={{ ...authState, setAuthState }}>
      {children}
    </AuthenticationContext.Provider>
  );
}
