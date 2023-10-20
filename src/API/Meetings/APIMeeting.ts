import { APIRoom } from "../Rooms/APIRoom";
import { MeetingType } from "./MeetingType";

/**
 * Represents a meeting of an RIT course
 * @interface Meeting
 * @param id - The ID of the meeting in the RIT system
 * @param date - The date that the meeing will take place. Format: yyyy-mm-dd
 * @param start - Start time of the meeting
 * @param end - End time of the meeting
 * @param meeting - The given name of the meeting
 * @param meetingtype - The type of meeting represented by the MeetingType enum
 * @param facilitator - The facilitator of the meeting.
 * @param room_id - The ID of the room the meeting is to be held in
 * @param created_at - The time that the meeting was created in the system
 * @param updated_at - Time that the meeting was last updated in the system
 * @param room - The room that the meeting is to be held in as APIRoom data
 * 
 * @see MeetingType
 * @see APIRoom
 */
export interface APIMeeting {
    id: string,
    date: string,
    start: string,
    end: string,
    meeting: string,
    meetingtype: MeetingType,
    facilitator: string,
    room_id: APIRoom["id"],
    created_at: string,
    updated_at: string,
    room: APIRoom
}