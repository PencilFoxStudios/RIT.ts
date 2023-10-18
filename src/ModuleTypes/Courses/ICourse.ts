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
    term: string,
    /** 42 */
    studentCount: number,
    meetings: IMeeting[],
    /** Returns the faculty associated with this course, if any. */
    getInstructors: () => Promise<IFaculty[]|null>
}