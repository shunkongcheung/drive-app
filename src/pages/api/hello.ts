// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getIsAuth } from "../../utils";

interface Data {
  name: string;
  isAuth: boolean;
  password: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const password = req.body.password || "";
  const isAuth = getIsAuth(password);

  res.status(200).json({ name: "John Doe", isAuth, password });
}
