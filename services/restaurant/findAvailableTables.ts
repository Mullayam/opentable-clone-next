import { PrismaClient, Table } from "@prisma/client";
import { times } from "../../data";
import { NextApiResponse } from "next";
const prisma = new PrismaClient();
export const FindAvailableTables = async ({
  time,
  day,
  res,
  resaturant,
}: {
  time: string;
  resaturant: {
    tables: Table[];
    open_time: string;
    close_time: string;
  };

  day: string;
  res: NextApiResponse;
}) => {
  const searchTimes = times.find((t) => {
    return t.time === time;
  })?.searchTimes;
  if (!searchTimes) {
    return res
      .status(200)
      .json({ message: "Invalid Data Provided", sucess: false });
  }
  const bookings = await prisma.booking.findMany({
    where: {
      booking_time: {
        gte: new Date(`${day}T${time}`) as any,
        lte: new Date(`${day}T${searchTimes.length - 1}`) as any,
      },
    },
    select: {
      number_of_people: true,
      booking_time: true,
      tables: true,
    },
  });

  const bookingTableObj: { [key: string]: { [key: number]: true } } = {};
  bookings.forEach((booking) => {
    bookingTableObj[booking.booking_time.toString()] = booking.tables.reduce(
      (obj: any, table: any) => {
        return { ...obj, [table.table_id]: true };
      }
    );
  });

  if (!resaturant) {
    return res
      .status(200)
      .json({ message: "Invalid Data Provided", sucess: false });
  }
  const tables = resaturant.tables;
  const searchTimesWithTables = searchTimes.map((st) => {
    return { date: new Date(), time: st, tables };
  });

  searchTimesWithTables.map((t) => {
    t.tables = t.tables.filter((table) => {
      if (bookingTableObj[t.date.toISOString()]) {
        if (bookingTableObj[t.date.toISOString()][table.id]) {
          return false;
        }
      }
    });
  });
  return searchTimesWithTables;
};
