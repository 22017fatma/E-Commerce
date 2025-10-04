import { Request, Response, NextFunction } from "express";
import { ROLES } from "../types";
import { returnUserValid } from "../services/users.service";

export function authorizeRoles(...allowedRoles: ROLES[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
   const user = res.locals.user;

   if (!user || !allowedRoles.includes(user.role)) {
     return res
       .status(403)
       .json({ message: "Forbidden: insufficient permissions" });
   }

   if (!user.id || isNaN(+user.id)) {
     console.error(" Invalid user id from token:", user.id);
     return res.status(401).json({ message: "Invalid user id in token" });
   }

   const returnUser = await returnUserValid(+user.id);
   console.log("return user", returnUser);

   if (!returnUser || returnUser.role !== user.role) {
     return res
       .status(403)
       .json({ message: "Forbidden: insufficient permissions" });
   }
    next();
  };
}
