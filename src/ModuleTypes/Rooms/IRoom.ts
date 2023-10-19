import { RoomType } from "../../API/Rooms/RoomType";
import { Meeting } from "../../RIT.TS/Objects/Meeting";
import { IMeeting } from "../Meetings";

export interface IRoom {
    id: string,
    type: RoomType,
    buildingCode: string,
    buildingNumber: string,
    buildingFullName: string,
    roomNumber: string,
    roomFullName: string,
    maxCapacity: number,
    /** Returns the meetings that take place in this room. */
    getMeetings: (onDate?:Date, beforeDate?:Date, afterDate?:Date) => Promise<Meeting[]|null>
}