import { APIUser } from "../Users/APIUser";
import { APIMeeting } from "../Meetings/APIMeeting";

/**
 * Represents an RIT course object
 * @interface Course 
 * @param section - The section of the course
 * @param name - The name of the course
 * @param term - The term that the course is being taught
 * @param instructors - The instructor(s) of the course as APIUser data.
 * @param students - Number of students enrolled in course
 * @param meetings - Meetings of the course as APIMeeting data
 * @see APIUser
 * @see APIMeeting
 */
export interface APICourse {
    section: string,
    groupname: string,
    name: string,
    term?: string,
    instructors?: APIUser["cn"]["0"][],
    students: number,
    meetings: APIMeeting[]
}