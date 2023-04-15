"use client";
import React, { useState } from "react";
import { partySize as partySizes, times } from "../../../../data";
import DatePicker from "react-datepicker";
import useAvailability from "../../../../hooks/useAvailability";

import { CircularProgress } from "@mui/material";
import Link from "next/link";
import convertToDisplayTime from "../../../../utils/convertToDisplayTime";

export default function ReservationCard({
  closeTime,
  openTime,
  slug,
}: {
  closeTime: string;
  openTime: string;
  slug: string;
}) {
  const { data, error, loading, FetchAvailability } = useAvailability();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [time, setTime] = useState(openTime);
  const [partySize, setPartySize] = useState("2");
  const [day, setDay] = useState(new Date().toISOString().split("T")[0]);
  const handleChangedate = (date: Date | null) => {
    if (date) {
      setDay(date.toISOString().split("T")[0]);
      return setSelectedDate(date);
    }
    return setSelectedDate(null);
  };
  const handleClick = () => {
    FetchAvailability({
      slug,
      partySize,
      day,
      time,
    });
  };
  const FilterTimeByRestaurant = () => {
    const timesWindow: typeof times = [];
    let isWithinWindow = false;

    times.forEach((time) => {
      if (time.time === openTime) {
        isWithinWindow = true;
      }
      if (isWithinWindow) {
        timesWindow.push(time);
      }
      if (time.time === closeTime) {
        isWithinWindow = false;
      }
    });

    return timesWindow;
  };
  React.useEffect(() => {
    FilterTimeByRestaurant();
  }, []);

  return (
    <div className="fixed w-[15%] bg-white rounded p-3 shadow">
      <div className="text-center border-b pb-2 font-bold">
        <h4 className="mr-7 text-lg">Make a Reservation</h4>
      </div>
      <div className="my-3 flex flex-col">
        <label htmlFor="">Party size</label>
        <select
          name=""
          className="py-3 border-b font-light"
          value={partySize}
          onChange={(e) => setPartySize(e.target.value)}
        >
          {partySizes.map((psize, i) => {
            return (
              <option key={i} value={psize.value}>
                {psize.label}
              </option>
            );
          })}
        </select>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col w-[48%]">
          <label htmlFor="">Date</label>
          <DatePicker
            className="py-3 border-b font-ligh text-reg w-24"
            dateFormat="MMMM d "
            wrapperClassName="w-[48]"
            selected={selectedDate}
            onChange={handleChangedate}
          />
        </div>
        <div className="flex flex-col w-[48%]">
          <label htmlFor="">Time</label>
          <select
            name=""
            id=""
            className="py-3 border-b font-light"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          >
            {FilterTimeByRestaurant().map((time) => {
              return <option value={time.time}>{time.displayTime}</option>;
            })}
          </select>
        </div>
      </div>
      <div className="mt-5">
        <button
          onClick={handleClick}
          disabled={loading}
          className="bg-red-600 rounded w-full px-4 text-white font-bold h-16"
        >
          {loading ? <CircularProgress /> : "  Find a Time"}
        </button>
      </div>
      {data && data.length ? (
        <div className="mt-4">
          <p className="text-reg">Select A Time</p>
          <div className="flex flex-wrap-mt-2">
            {data.map((t) => {
              return t.available ? (
                <Link
                  className="bg-red-600 cursor-pointer p-2 w-24 text-center text-white mb-3 rounded mr-3"
                  href={`/reserve/${slug}?date=${day}T${t.time}&partySize=${partySize}}`}
                >
                  <p className="text-sm font-bold">
                    {convertToDisplayTime("00:00:00.000Z")}
                  </p>
                </Link>
              ) : (
                <p className="p-2 w-24 text-white bg-gray-300 rounded mr-3"></p>
              );
            })}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
