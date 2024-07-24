import jwt, { Secret } from 'jsonwebtoken';
import "dotenv/config";

export class Authcontroller {
  isAuthenticated = async (data: any) => {
    try {
      console.log("Token validating...",data);
      const token = data.token || '';
      const decoded: any = jwt.verify(token, process.env.ACCESS_TOKEN || "suhail" as Secret);
      if (!decoded) {
        throw new Error('Invalid token');
      }
      return { userId: decoded.id, role: decoded.role };
    } catch (e: any) {
      console.error(e);
      throw new Error("Something went wrong in authentication");
    }
  }

  verifyToken = async (data: any) => {
    try {
      const refreshtoken = data.token as string;
      const decoded: any = jwt.verify(refreshtoken, process.env.REFRESH_TOKEN || "suhail" as Secret);
      console.log("Token refreshed");
      if (!decoded) {
        throw new Error("Invalid token");
      }
      const refreshToken = jwt.sign({ id: decoded.id, role: decoded.role }, process.env.REFRESH_TOKEN || "suhail" as Secret, {
        expiresIn: "7d"
      });
      const accessToken = jwt.sign({ id: decoded.id, role: decoded.role }, process.env.ACCESS_TOKEN || "suhail" as Secret, {
        expiresIn: "15m"
      });
      return { accessToken, refreshToken };
    } catch (e: any) {
      console.error(e);
      throw new Error("Something went wrong in token verification");
    }
  }
}