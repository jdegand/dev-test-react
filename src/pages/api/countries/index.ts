import type { NextApiRequest, NextApiResponse } from "next";
import { getCountries } from "@/countries";

export default function indexHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "GET":
      res.status(200).json(getCountries());
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
