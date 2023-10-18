import { UserType } from "../../API/Users/UserType";
import { User } from "./User";

export interface Student extends User {
    type: UserType.Student,
    plans: string[],
    colleges: string[]
}