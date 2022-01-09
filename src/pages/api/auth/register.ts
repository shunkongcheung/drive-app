// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "firebase-admin";
import bcrypt from "bcryptjs";

import { ROOT_TAG_NAME, TABLE } from "../../../constants";
import { getFirestore } from "../../../utils";

interface Data {
  id: string;
  username: string;
  success: boolean;
  errors?: string;
}

const createUser = async (
  db: firestore.Firestore,
  username: string,
  hash: string
) => {
  const res = await db.collection(TABLE.USER).add({
    username,
    password: hash,
    createdAt: new Date(),
  });

  return res.id;
};

const createRootTag = async (db: firestore.Firestore, userId: string) => {
  const res = await db.collection(TABLE.TAG).add({
    name: ROOT_TAG_NAME,
    createdById: userId,
    createdAt: new Date(),
  });
  return res;
};

const getIsUsernameExist = async (
  db: firestore.Firestore,
  username: string
) => {
  const docRef = db.collection(TABLE.USER).doc(username);
  const doc = await docRef.get();
  return doc.exists;
};

const getPasswordHash = (password: string) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // retrieve input
  const username = req.body.username || "";
  const password = req.body.password || "";

  // validate input
  if (!username)
    return res.status(400).json({
      id: "",
      username,
      success: false,
      errors: "Uername is required.",
    });
  if (!password)
    return res.status(400).json({
      id: "",
      username,
      success: false,
      errors: "Password is required.",
    });

  // retrieve db
  const db = getFirestore();

  // check if username already exists
  const isExist = getIsUsernameExist(db, username);
  if (!isExist)
    return res.status(400).json({
      id: "",
      username,
      success: false,
      errors: "Uername already exists.",
    });

  // create user
  const hash = getPasswordHash(password);
  const userId = await createUser(db, username, hash);

  // create root directory for user
  await createRootTag(db, userId);

  // finish
  res.status(200).json({ id: userId, username, success: true });
}
