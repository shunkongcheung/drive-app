// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { getFirestore } from "../../../utils";

interface Doc {
  updatedAt: Date;
}

interface Data {
  errors?: string;
  data: Doc;
}

export default async function handler(
  _: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const db = getFirestore();

  try {
    // create or update a document
    await db.collection("misc").doc("ping-test").set({ updatedAt: new Date() });
    // retrieve document
    const docRef = await db.collection("misc").doc("ping-test").get();
    const docData = docRef.data() as any;
    // convert to js object
    const data = {
      updatedAt: docData.updatedAt.toDate(),
    };

    // return
    res.status(200).json({ data });
  } catch (ex: any) {
    // invalid date
    const data = {
      updatedAt: new Date("2001-01-01"),
    };
    res.status(200).json({ errors: ex.message, data });
  }
}
