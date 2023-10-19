import { Faculty } from "../../RIT.TS/Objects/Faculty";
import { Meeting } from "../../RIT.TS/Objects/Meeting";
import { IMeeting } from "../Meetings";
import { IFaculty } from "../Users";

export interface ICourse {
    /** SWEN-261 */
    courseCode: string,
    /** 02 */
    section: string,
    /** Intro to Software Engineering */
    name: string,
    /** 2131 */
    term?: string,
    /** 42 */
    studentCount: number,
    meetings: Meeting[],
    /** Returns the faculty associated with this course, if any. */
    getInstructors: () => Promise<Faculty[]|null>
}