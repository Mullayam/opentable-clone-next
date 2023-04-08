"use client";
import React from "react";
import { createContext } from "react";

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
    loading: false,
    data: null,
    error: null,
  });
  return (
    <AuthenticationContext.Provider value={{ ...authState, setAuthState }}>
      {children}
    </AuthenticationContext.Provider>
  );
}
