import bcrypt from "bcryptjs";

const getIsAuth = (password: string) => {
  const HASH = process.env.USER_PW_HASH as string;

  return bcrypt.compareSync(password, HASH);
};

export default getIsAuth;
