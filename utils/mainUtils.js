import { randomBytes } from "crypto";

export function generateObjectId() {
  const timeStamp = Math.floor(Date.now() / 1000).toString(16);
  const random = randomBytes(8).toString("hex");
  // console.log(timeStamp, random);
  return timeStamp + random;
}
