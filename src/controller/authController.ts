import jwt, { Secret } from 'jsonwebtoken';
import "dotenv/config";

export class Authcontroller {
  isAuthenticated = async (data: any) => {
    try {
      console.log("Token validating...",data);
      const token = data.token || '';
      const decoded: any = jwt.verify(token, process.env.ACCESS_TOKEN || "suhail" as Secret);
      if (!decoded) {
        return {success:false,userId:null,role:null}
      }
      return {success:true, userId: decoded.id, role: decoded.role };
    } catch (e: any) {
      console.error(e);
      return {success:false,userId:null,role:null}
    }
  }

  verifyToken = async (data: any) => {
    try {
      console.log("Token refreshing...",data);
      const refreshtoken = data.token as string;
      const decoded: any = jwt.verify(refreshtoken, process.env.REFRESH_TOKEN || "suhail" as Secret);
      console.log("Token refreshed");
      if (!decoded) {
        console.error("error")
        return {success:false}
      }
      const refreshToken = jwt.sign({ id: decoded.id, role: decoded.role }, process.env.REFRESH_TOKEN || "suhail" as Secret, {
        expiresIn: "7d"
      });
      const accessToken = jwt.sign({ id: decoded.id, role: decoded.role }, process.env.ACCESS_TOKEN || "suhail" as Secret, {
        expiresIn: "5m"
      });
      return { accessToken, refreshToken };
    } catch (e: any) {
      console.error(e);
      throw new Error("Something went wrong in token verification");
    }
  }
}