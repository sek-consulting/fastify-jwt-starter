import { JwtPayload } from "../entities/jwt-payload";
import { hasAllProperties, softCopy } from "../lib/utils";

const verifyPayload = (payload: any): JwtPayload | false => {
  if (!payload || !hasAllProperties(payload, JwtPayload)) {
    return false;
  }
  return softCopy(payload, JwtPayload);
};

export { verifyPayload };
