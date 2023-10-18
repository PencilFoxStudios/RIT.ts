import { UserType } from "../../API/Users/UserType"
import { ICourse } from "../Courses"

export interface IUser {
    type: UserType,
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    displayName: string,
    givenName: string,
    initials: string,
    universityID: string,
    getCourses: () => Promise<ICourse[]|null>
}