import jwt from "jsonwebtoken";

interface User {
  id: string;
  username: string;
}

const getUserFromToken = (token: string): User => {
  const decoded = jwt.verify(token, process.env.SECRET as string) as any;
  return { id: decoded.id, username: decoded.username };
};

export default getUserFromToken;
