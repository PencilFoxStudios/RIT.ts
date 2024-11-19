import { DateObject } from "../../RIT.TS/Helpers/DateObject";
import { Meeting } from "../../RIT.TS/Objects/Meeting";
import { IMeeting } from "../Meetings";

export interface IBuilding {
    number:string,
    name:string,
    letterCode:string,
    getMeetings: (onDate?:DateObject) => Promise<Meeting[]>
}