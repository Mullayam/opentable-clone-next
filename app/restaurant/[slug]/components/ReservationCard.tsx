import { useState } from "react";
import { partySize, times } from "../../../../data";
import DatePicker from "react-datepicker";
import { time } from "console";

export default function ReservationCard({
  closeTime,
  openTime,
}: {
  closeTime: string;
  openTime: string;
}) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const handleChangedate = (date: Date | null) => {
    if (date) {
      return setSelectedDate(date);
    }
    return setSelectedDate(null);
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
      return timesWindow;
    });
  };
  return (
    <div className="fixed w-[15%] bg-white rounded p-3 shadow">
      <div className="text-center border-b pb-2 font-bold">
        <h4 className="mr-7 text-lg">Make a Reservation</h4>
      </div>
      <div className="my-3 flex flex-col">
        <label htmlFor="">Party size</label>
        <select name="" className="py-3 border-b font-light" id="">
          {partySize.map((partySize) => {
            return <option value={partySize.value}>{partySize.label}</option>;
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
          <select name="" id="" className="py-3 border-b font-light">
            {FilterTimeByRestaurant().map((time) => {
              return <option value={time.time}>{time.displayTime}</option>;
            })}
          </select>
        </div>
      </div>
      <div className="mt-5">
        <button className="bg-red-600 rounded w-full px-4 text-white font-bold h-16">
          Find a Time
        </button>
      </div>
    </div>
  );
}
