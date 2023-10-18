import { Meeting } from "../Meetings";
import { Faculty } from "../Users";

export interface Course {
    /** SWEN-261 */
    courseCode: string,
    /** 02 */
    section: string,
    /** Intro to Software Engineering */
    name: string,
    /** 2131 */
    term: string,
    /** [ "xxxvse"] */
    instructors: Faculty[],
    /** 42 */
    studentCount: number,
    meetings: Meeting[]
}