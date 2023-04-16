// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { times } from "../../../../data";

import { FindAvailableTables } from "../../../../services/restaurant/findAvailableTables";

const prisma = new PrismaClient();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { slug, day, time, partySize } = req.query as {
      slug: string;
      day: string;
      partySize: string;
      time: string;
    };
    if (!slug || !day || !time || !partySize) {
      return res
        .status(200)
        .json({ message: "Invalid Data Provided", sucess: false });
    }
    const restaurant = await prisma.restaurant.findUnique({
      where: {
        slug,
      },
      select: {
        tables: true,
        open_time: true,
        close_time: true,
      },
    });
    const searchTimesWithTables = await FindAvailableTables({
      restaurant,
      time,
      day,
      res,
    });
    if (!searchTimesWithTables) {
      return res
        .status(200)
        .json({ message: "Invalid Data Provided", sucess: false });
    }

    const availabilites = searchTimesWithTables
      .map((t) => {
        const sumSeats = t.tables.reduce((sum: any, table: any) => {
          return sum + table.seats;
        }, 0);
        return {
          time: t.time,
          available: sumSeats >= parseInt(partySize),
        };
      })
      .filter((availablity: any) => {
        const TimeIsAfterOpeningHour =
          new Date(`${day}T${availablity.time}`) >=
          new Date(`${day}T${restaurant.open_time}`);
        const TimeIsBeforeClosingHour =
          new Date(`${day}T${availablity.time}`) <=
          new Date(`${day}T${restaurant.close_time}`);
        return TimeIsAfterOpeningHour && TimeIsBeforeClosingHour;
      });
    return res.status(200).json({ message: availabilites, sucess: false });
  }
}