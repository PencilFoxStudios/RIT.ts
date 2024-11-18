import { UserType } from "../../API/Users/UserType";
import { IFaculty } from "./IFaculty";
import { IUser } from "./IUser";

export interface IStaff extends IUser {
    type: UserType.Staff,
    department: string,
}