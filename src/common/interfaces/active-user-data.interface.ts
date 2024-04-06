import {Role} from "../enums/role.enum";

export interface ActiveUserData {
  id: string;
  phone: string;
  role: Role;
}
