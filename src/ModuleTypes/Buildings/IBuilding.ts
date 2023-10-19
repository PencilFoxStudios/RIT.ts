import { DateObject } from "../../RIT.TS/Helpers/DateObject";
import { Meeting } from "../../RIT.TS/Objects/Meeting";
import { IMeeting } from "../Meetings";

export interface IBuilding {
    number:string,
    name:string,
    letterCode:string,
    getMeetings: (beforeDate?:DateObject, afterDate?:DateObject) => Promise<Meeting[]|null>
}