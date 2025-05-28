import jwt from "jsonwebtoken";
import { users } from "../utils/constants/data.js";

export const Authenticate = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization)
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized access!" });

    const token = authorization.split(" ")[1];
    // console.log("token", token);
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    // console.log("decodedToken", decodedToken);

    const user = users.find((user) => user.email === decodedToken.user.email);

    if (!user)
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized access!" });

    req.user = user;
    next();
  } catch (error) {
    throw new Error(error.message);
  }
};
