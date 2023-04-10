"use client";
import * as React from "react";
import Link from "next/link";
import AuthModal from "./AuthModal";
import { AuthenticationContext } from "../context/AuthContext";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { data, loading } = React.useContext(AuthenticationContext);
  const { signout } = useAuth();
  return (
    <nav className="bg-white p-2 flex justify-between">
      <Link href="" className="font-bold text-gray-700 text-2xl">
        OpenTable
      </Link>
      <div>
        {loading ? null : (
          <div className="flex">
            {data ? (
              <button
                onClick={signout}
                className="bg-blue-400 text-white  mr-3 border p-1 px-4 rounded"
              >
                Logout
              </button>
            ) : (
              <>
                <AuthModal isSignIn={true} />
                <AuthModal isSignIn={false} />
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
