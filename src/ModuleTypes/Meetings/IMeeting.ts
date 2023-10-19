import { MeetingType } from "../../API/Meetings/MeetingType";
import { Room } from "../../RIT.TS/Objects/Room";
import { IRoom } from "../Rooms";

export interface IMeeting {
    /** 0300d5f396a0937481547afd0db12a27 */
    id: string,
    /** 2024-02-06 */
    date: string,
    /** 10:00:00 */
    timeStart: string,
    /** 11:00:00 */
    timeEnd: string,
    /** Course */
    meetingType: MeetingType,
    /** 2023-08-22T19:19:22.000000Z */
    createdAt: string,
    /** -000001-11-30T05:00:00.000000Z */
    updatedAt: string,
    /** Returns the room the meeting takes place in. */
    getRoom: () => Promise<Room|null>
}