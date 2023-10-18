import { UserType } from "../../API/Users/UserType";
import { IUser } from "./IUser";

export interface IFaculty extends IUser {
    type: UserType.Faculty,
    department: string,
}