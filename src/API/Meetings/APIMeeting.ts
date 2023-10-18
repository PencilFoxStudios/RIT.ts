import { APIRoom } from "../Rooms/APIRoom";
import { MeetingType } from "./MeetingType";

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