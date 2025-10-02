import { authenticateUser } from "./authentication.middleware";
import { authorizeRoles } from "./authorization.middleware";
import { ROLES } from "../types";

export function withAuth(...roles: ROLES[]) {
  return [authenticateUser, authorizeRoles(...roles)];
}


export { authenticateUser, authorizeRoles };