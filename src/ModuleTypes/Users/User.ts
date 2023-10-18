import { UserType } from "../../API/Users/UserType"

export interface User {
    type: UserType,
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    displayName: string,
    givenName: string,
    initials: string,
    universityID: string
}