import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { FindAvailableTables } from "../../../../services/restaurant/findAvailableTables";
const prisma = new PrismaClient();

export default async function name(req: NextApiRequest, res: NextApiResponse) {
  const { slug, day, time, partySize } = req.query as {
    slug: string;
    day: string;
    time: string;
    partySize: string;
  };
  const restaurant = await prisma.findUnique({
    where: {
      slug,
    },
  });
  if (!restaurant) {
    return res
      .status(200)
      .json({ message: "Restaurant not found", success: false });
  }
  if (
    new Date(`${day}T${time}}`) < new Date(`${day}T${restaurant.open_time}}`) ||
    new Date(`${day}T${time}}`) > new Date(`${day}T${restaurant.close_time}}`)
  ) {
    return res.status(200).json({
      message: "Restaurant is not open at this time",
      success: false,
    });
  }
  const searchTimesWithTables = await FindAvailableTables({
    restaurant,
    time,
    day,
    res,
  });
  const searchTimesWithTable = searchTimesWithTables.find((t) => {
    return t.date.toISOString() === new Date(`${day}T${time}}`).toISOString();
  });
  if (!searchTimesWithTable) {
    return res
      .status(200)
      .json({ message: "No Availablelity", success: false });
  }
  const tableCount: {
    2: number[];
    4: number[];
  } = { 2: [], 4: [] };
  searchTimesWithTable.forEach((table: any) => {
    if (table.seats === 2) {
      tableCount[2].push(table.id);
    } else {
      tableCount[4].push(table.id);
    }
  });
  const tablesToBook: number[] = [];
  let seatsRemaining = parseInt(partySize);
  while (seatsRemaining > 0) {
    if (seatsRemaining >= 3) {
      if (tableCount[4].length) {
        tablesToBook.push(tableCount[4][0]);
        tableCount[4].shift();
        seatsRemaining = seatsRemaining - 4;
      } else {
        tablesToBook.push(tableCount[2][0]);
        tableCount[2].shift();
        seatsRemaining = seatsRemaining - 2;
      }
    } else {
      if (tableCount[2].length) {
        tablesToBook.push(tableCount[2][0]);
        tableCount[2].shift();
        seatsRemaining = seatsRemaining - 2;
      } else {
        tablesToBook.push(tableCount[4][0]);
        tableCount[4].shift();
        seatsRemaining = seatsRemaining - 4;
      }
    }
  }
  return res.status(200).json({ message: searchTimesWithTable, success: true });
}
