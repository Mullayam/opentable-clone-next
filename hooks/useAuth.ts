import axios from "axios";
import { useContext } from "react";
import { AuthenticationContext } from "../app/context/AuthContext";

const useAuth = () => {
  const { data, error, loading, setAuthState } = useContext(
    AuthenticationContext
  );
  const signin = async (
    {
      email,
      password,
    }: {
      email: string;
      password: string;
    },
    handleClose: () => void
  ) => {
    try {
      setAuthState({ data: null, error: null, loading: true });
      const response = await axios.post(
        "http://localhost:3000/api/auth/signin",
        {
          email,
          password,
        }
      );
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      setAuthState({ data: response.data, error: null, loading: false });
      handleClose();
    } catch (error: any) {
      setAuthState({
        data: null,
        error: error.response.data.message,
        loading: false,
      });
    }
  };
  const signup = async () => {};

  return { signin, signup };
};

export default useAuth;
