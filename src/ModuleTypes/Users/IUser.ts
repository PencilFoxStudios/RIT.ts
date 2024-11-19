import { UserType } from "../../API/Users/UserType"
import { ICourse } from "../Courses"

export interface IUser {
    type: UserType,
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    displayName: string,
    initials: string,
    /**
     * **NOTE** This is NOT a standard 9-digit UID number.
     * I still have yet to figure out what exactly this is.
     */
    universityID: string,
    getCourses: () => Promise<ICourse[]>
}