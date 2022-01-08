// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import AWS from "aws-sdk";

import { getS3 } from "../../../utils";

interface Entry {
  name: string;
  createdAt: Date;
}

interface Data {
  errors?: string;
  data: Array<Entry>;
}

const getBuckets = (s3: AWS.S3): Promise<Array<Entry>> =>
  new Promise((resolve, reject) => {
    s3.listBuckets((err, data) => {
      if (err) reject(err);
      if (!data || !data.Buckets) resolve([]);
      else
        resolve(
          data.Buckets.map((itm) => ({
            name: itm.Name || "",
            createdAt: new Date(itm.CreationDate || ""),
          }))
        );
    });
  });

export default async function handler(
  _: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const s3 = getS3();

  try {
    const buckets = await getBuckets(s3);
    res.status(200).json({ data: buckets });
  } catch (ex: any) {
    res.status(200).json({ errors: ex.message, data: [] });
  }
}
