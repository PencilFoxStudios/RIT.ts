import { UserType } from "./UserType"

/**
 * Represents an RIT User, this can be a student or a faculty member
 * @param cn - Contains "0" which is the users RIT username (E.g. abc124), along with a count of usernames associated with this user. 
 * @param colleges - A list of colleges that the user is a member of. Null if they aren't a part of any
 * @param department - Name of the department(S) that the user is a part of with a count of departments. Null if they are not a member of any departments.
 * @param displayname - The display name(s) of the user with a count of display names.
 * @param division - TO BE DOCUMENTED
 * @param gidnumber - The GID number(s) of the user with a count of the entries. Null if they don't have one
 * @param givenname - The name that has been given by the user as their first name with a count of entries.
 * @param initials - The initials of the user (The letters associated with the username) with a count of entries. Null if they don't have any
 * @param jpegphoto - An avatar image for the user if it's available. Null if it is not available
 * @param mail - The email address ending in g.rit.edu of the user with a count of entries. Null if they don't have one
 * @param physicaldeliveryofficename - The name of office to send physical mail to. Null if they don't have one
 * @param plans - A list of 'plans' (academic tracks) that the user is a part of. Null if they don't have any
 * @param sn - The last name of the user with a count of entries. Null if they don't have one
 * @param title - A list of titles that the user has. Null if they don't have any
 * @param type - The type of user represented by UserType
 * @param uid - TO BE DOCUMENTED
 * @param uidnumber - The UID of the user (Not the same as university ID, the long string of digits that are private to each user) with a count of entries
 * @param courses - A link to the courses that the user is taking.
 * 
 * @see UserType
 */
export interface APIUser {
    cn: {
        "0": string,
        count: number
    },
    colleges?: string[],
    department?: {
        "0": string,
        count: number
    },
    displayname: {
        "0": string,
        count: number
    },
    division?: string[],
    gidnumber: {
        "0": string,
        count: number
    },
    givenname: {
        "0": string,
        count: number
    },
    initials: {
        "0": string,
        count: number
    },
    jpegphoto?: string[],
    mail: {
        "0": string,
        count: number
    },
    physicaldeliveryofficename?: string[],
    plans?: string[],
    sn: {
        "0": string,
        count: number
    },
    title?: string[],
    type: {
        "0": UserType,
        count: number
    },
    uid?: {
        "0": string,
        count: number
    },
    uidnumber: {
        "0": string,
        count: number
    },
    courses?: string
}