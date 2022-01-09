// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import bcrypt from "bcryptjs";
import type { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "firebase-admin";
import jwt from "jsonwebtoken";

import { TABLE } from "../../../constants";
import { getFirestore } from "../../../utils";

interface Data {
  token: string;
  success: boolean;
  errors?: string;
}

interface User {
  id: string;
  username: string;
}

const getUser = async (
  db: firestore.Firestore,
  username: string,
  password: string
): Promise<User> => {
  return new Promise(async (resolve, reject) => {
    const docRef = db.collection(TABLE.USER).where("username", "==", username);
    const snapshot = await docRef.get();

    if (!snapshot.empty) {
      // loop through all user with this username
      // should only found once
      let finish = false;
      snapshot.forEach((doc) => {
        // only check if not finish
        if (!finish) {
          const user = doc.data() as any;
          // only check if username matches
          if (user.username === username) {
            // check if password matches
            const isMatch = bcrypt.compareSync(password, user.password);
            if (!isMatch) reject("Invalid password.");
            else resolve({ id: doc.id, username });

            // mark done
            finish = true;
          }
        }
      });

      // none is matching
      if (!finish) reject("Invalid username.");
    }

    // no matching is found
    reject("Invalid username.");
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // retrieve input
  const username = req.body.username || "";
  const password = req.body.password || "";

  // retrieve db
  const db = getFirestore();

  try {
    // check if username already exists
    const user = await getUser(db, username, password);
    const token = jwt.sign(user, process.env.SECRET as string);

    // finish
    res.status(200).json({ token, success: true });
  } catch (ex: any) {
    res.status(400).json({ token: "", success: false, errors: ex.message });
  }
}
