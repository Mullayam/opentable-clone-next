import axios from "axios";
import React from "react";

interface Data {
  slug: string;
  partySize: string;
  date: string;
  time: string;
  bookerFirstName: string;
  bookerLastName: string;
  bookerEmail: string;
  bookerPhone: string;
  bookerOccasion: string;
  bookerRequest: string;
  setDidBook: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function useReservation() {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const FetchReserveration = async ({
    slug,
    partySize,
    date: day,
    time,
    bookerFirstName,
    bookerLastName,
    bookerEmail,
    bookerPhone,
    bookerOccasion,
    bookerRequest,
    setDidBook,
  }: Data) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `http://localhost:3000/api/restaurant/${slug}/reserve`,
        {
          bookerFirstName,
          bookerLastName,
          bookerEmail,
          bookerPhone,
          bookerOccasion,
          bookerRequest,
        },
        {
          params: {
            slug,
            partySize,
            day,
            time,
          },
        }
      );
      setLoading(false);
      setDidBook(true);
      return response.data;
    } catch (error: any) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };
  return { loading, error, FetchReserveration };
}
