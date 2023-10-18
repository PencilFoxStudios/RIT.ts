import { APIUser } from "../Users/APIUser";
import { APIMeeting } from "../Meetings/APIMeeting";

export interface APICourse {
    section: string,
    groupname: string,
    name: string,
    term?: string,
    instructors?: APIUser["cn"]["0"][],
    students: number,
    meetings: APIMeeting[]
}