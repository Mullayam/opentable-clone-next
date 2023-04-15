import axios from "axios";
import React from "react";

interface Data {
  slug: string;
  partySize: string;
  day: string;
  time: string;
}
export default function useAvailability() {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [data, setData] = React.useState<
    { time: string; available: boolean }[] | null
  >(null);
  const FetchAvailability = async ({ slug, partySize, day, time }: Data) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:3000/api/restaurant/${slug}/availability?day=${day}&time=${time}&partySize=${partySize}`,
        {
          params: {
            partySize,
            day,
            time,
          },
        }
      );
      setLoading(false);
      setData(response.data);
    } catch (error: any) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };
  return { loading, data, error, FetchAvailability };
}
