import { authenticateUser } from "./authentication.middleware";
import { authorizeRoles } from "./authorization.middleware";


export function withAuth(...roles: string[]) {
  return [authenticateUser, authorizeRoles(...roles)];
}


export { authenticateUser, authorizeRoles };