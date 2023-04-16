"use client";
import React from "react";
import useReservation from "../../../../hooks/useReservation";
import { CircularProgress } from "@mui/material";
export default function ReservationForm({
  slug,
  partySize,
  day,
}: {
  slug: string;
  day: string;
  partySize: string;
}) {
  const { loading, FetchReserveration } = useReservation();
  const [date, time] = day.split("T");
  const [didBook, setDidBook] = React.useState(false);
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  const [disabled, setDisabled] = React.useState(true);
  const [inputs, setInputs] = React.useState({
    bookerFirstName: "",
    bookerLastName: "",
    bookerEmail: "",
    bookerPhone: "",
    bookerOccasion: "",
    bookerRequest: "",
  });

  const handleREservationSubmit = async () => {
    const booking = await FetchReserveration({
      slug,
      partySize,
      date,
      time,
      bookerFirstName: inputs.bookerFirstName,
      bookerLastName: inputs.bookerLastName,
      bookerEmail: inputs.bookerEmail,
      bookerPhone: inputs.bookerPhone,
      bookerOccasion: inputs.bookerOccasion,
      bookerRequest: inputs.bookerRequest,
      setDidBook,
    });
  };

  React.useEffect(() => {
    if (
      inputs.bookerFirstName &&
      inputs.bookerLastName &&
      inputs.bookerEmail &&
      inputs.bookerPhone
    ) {
      return setDisabled(false);
    }
    setDisabled(true);
  }, [inputs]);

  return (
    <div className="mt-10 flex flex-wrap justify-between w-[660px]">
      {didBook ? (
        <div>
          <h1>You are all booked Up</h1>
          <p className="mt-4 text-sm">Enjoys Your Booking...</p>
        </div>
      ) : (
        <div>
          <input
            onChange={handleChangeInput}
            value={inputs.bookerFirstName}
            name="bookerFirstName"
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="First name"
          />
          <input
            onChange={handleChangeInput}
            value={inputs.bookerLastName}
            name="bookerLastName"
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="Last name"
          />
          <input
            onChange={handleChangeInput}
            value={inputs.bookerPhone}
            name="bookerPhone"
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="Phone number"
          />
          <input
            onChange={handleChangeInput}
            value={inputs.bookerEmail}
            name="bookerEmail"
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="Email"
          />
          <input
            onChange={handleChangeInput}
            value={inputs.bookerOccasion}
            name="bookerOccasion"
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="Occasion (optional)"
          />
          <input
            onChange={handleChangeInput}
            value={inputs.bookerRequest}
            name="bookerRequest"
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="Requests (optional)"
          />
          <button
            disabled={disabled}
            onClick={handleREservationSubmit}
            className="bg-red-600 w-full p-3 text-white font-bold rounded disabled:bg-gray-300"
          >
            {loading ? (
              <CircularProgress color="inherit" />
            ) : (
              " Complete reservation"
            )}
          </button>
          <p className="mt-4 text-sm">
            By clicking “Complete reservation” you agree to the OpenTable Terms
            of Use and Privacy Policy. Standard text message rates may apply.
            You may opt out of receiving text messages at any time.
          </p>
        </div>
      )}
    </div>
  );
}
