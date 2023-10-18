import { UserType } from "../../API/Users/UserType";
import { User } from "./User";

export interface Faculty extends User {
    type: UserType.Faculty,
    department: string,
}