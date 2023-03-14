import type { NextApiRequest, NextApiResponse } from "next";
import { getById, update, _delete } from "@/countries";

export default function idHandler(req: NextApiRequest, res: NextApiResponse) {
  const { query, method } = req;
  const id = query.id as string;

  switch (method) {
    case "GET":
      res.status(200).json(getById(id));
      break;
    case "PUT":
      // either parse the body here or in the update function
      res.status(200).json(update(id, JSON.parse(req.body)));
      break;
    case "DELETE":
      res.status(204).json(_delete(id));
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
