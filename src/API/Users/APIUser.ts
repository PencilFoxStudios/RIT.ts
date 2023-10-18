import { UserType } from "./UserType"

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