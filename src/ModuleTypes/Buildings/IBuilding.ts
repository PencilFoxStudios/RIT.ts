import { IMeeting } from "../Meetings";

export interface IBuilding {
    number:string,
    name:string,
    letterCode:string,
    getMeetings: (onDate?:Date, beforeDate?:Date, afterDate?:Date) => Promise<IMeeting[]|null>
}