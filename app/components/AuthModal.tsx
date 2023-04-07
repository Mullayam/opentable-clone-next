"use client";
import * as React from "react";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AuthModalInputs from "./AuthModalInputs";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 410,
  bgcolor: "background.paper",

  boxShadow: 24,
  p: 4,
};

export default function AuthModal({ isSignIn }: { isSignIn: Boolean }) {
  const [open, setOpen] = React.useState(false);
  const [inputs, setInputs] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    city: "",
    phone: "",
  });
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  const RenderContent = (SignIn: String, SignUp: String) => {
    return isSignIn ? SignIn : SignUp;
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button
        onClick={handleClickOpen}
        className={`${RenderContent(
          "bg-blue-400 text-white  mr-3",
          ""
        )} border p-1 px-4 rounded`}
      >
        {RenderContent("Login", "Sign Up")}
      </button>

      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="p-2 h-[600px]">
              <div className="uppercase font-bold text-center pb-2 border-b mb-2">
                <p className="text-small">
                  {RenderContent("Login", "Create An Account")}
                </p>
                <div className="m-auto">
                  <div className="text-xl font-light text-center">
                    {RenderContent(
                      "Login Into Your Account",
                      "Create Your OpenTable Account"
                    )}
                    <AuthModalInputs
                      inputs={inputs}
                      handleChangeInput={handleChangeInput}
                      isSignIn={isSignIn}
                    />
                    <button
                      onClick={handleClickOpen}
                      className="uppercase font-bold bg-red-600 w-full text-white p-3 rounded text-sm mb-5 s disabled:bg-gray-400"
                    >
                      {RenderContent("Sign In", "Sign Up")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
}
