import { APICourse } from "../../API/Courses/APICourse";
import { RITClient } from "../../API/RITClient";
import { ICourse } from "../../ModuleTypes/Courses";
import { IMeeting } from "../../ModuleTypes/Meetings";
import { IFaculty } from "../../ModuleTypes/Users";
import { Faculty } from "./Faculty";
import { Meeting } from "./Meeting";

export class Course implements ICourse{
    private RITClient:RITClient;
    // RITClient for methods

    courseCode: string;
    section: string;
    name: string;
    term?: string;
    studentCount: number;
    getMeetings: () => Promise<Meeting[] | null>;
    getInstructors: () => Promise<Faculty[] | null>;
    
    constructor(RITClient:RITClient, CourseData:APICourse){
        this.RITClient = RITClient;

        const [firstPart, secondPart, thirdPart]:string[] = CourseData.section.split("-")
        this.courseCode = `${firstPart}-${secondPart}`;
        this.section = thirdPart;
        this.name = CourseData.name;
        this.term = CourseData.term;
        this.studentCount = CourseData.students;
        this.getMeetings = async () : Promise<Meeting[] | null> => {
            const meetings:Meeting[] = [];
            for (const meeting of CourseData.meetings){
                meetings.push(new Meeting(this.RITClient, meeting))
            }
            return meetings;
        }
        this.getInstructors = async () : Promise<Faculty[] | null> => {
            const Facs:Faculty[] = [];
            if(CourseData.instructors){
                for (const F of CourseData.instructors){
                    const User = await this.RITClient.getUser(F)
                    if(User){
                        Facs.push(new Faculty(this.RITClient, User))
                    }
                    
                }
            }
            return Facs;
        }
    }

  


    
    
}