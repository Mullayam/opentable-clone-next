import React from "react";

interface Props {
  inputs: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    city: string;
    phone: string;
  };
  handleChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isSignIn: Boolean;
}
export default function AuthModalInputs({
  inputs,
  handleChangeInput,
  isSignIn,
}: Props) {
  return (
    <div>
      {!isSignIn && (
        <div className="my-3 flex justify-between text-sm gap-1">
          <input
            type="text"
            className="border rounded p-2 py-3 w-[49%]  "
            placeholder="First Name"
            value={inputs.firstName}
            name="firstName"
            onChange={handleChangeInput}
          />
          <input
            type="text"
            className="border rounded p-2 py-3 w-[49%]"
            placeholder="Last Name"
            value={inputs.lastName}
            name="lastName"
            onChange={handleChangeInput}
          />
        </div>
      )}
      <div className="my-3 flex justify-between text-sm">
        <input
          type="text"
          className="border mb-2 rounded p-2 py-3 w-full"
          placeholder="Email"
          value={inputs.email}
          name="email"
          onChange={handleChangeInput}
        />
      </div>
      <div className="my-3 flex justify-between text-sm">
        <input
          type="password"
          className="border mb-2 rounded p-2 py-3 w-full"
          placeholder="Password"
          value={inputs.password}
          name="password"
          onChange={handleChangeInput}
        />
      </div>
      {!isSignIn && (
        <div className="my-3 flex justify-between text-sm">
          <input
            type="text"
            className="border rounded p-2 py-3 w-[49%]"
            placeholder="City"
            value={inputs.city}
            name="city"
            onChange={handleChangeInput}
          />
          <input
            type="text"
            className="border rounded p-2 py-3 w-[49%]"
            placeholder="phone"
            value={inputs.phone}
            name="phone"
            onChange={handleChangeInput}
          />
        </div>
      )}
    </div>
  );
}
