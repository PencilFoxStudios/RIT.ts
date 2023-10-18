import { UserType } from "../../API/Users/UserType";
import { IUser } from "./IUser";

export interface IStudent extends IUser {
    type: UserType.Student,
    plans: string[],
    colleges: string[]
}