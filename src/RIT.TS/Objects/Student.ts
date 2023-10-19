
import { APICourse } from "../../API/Courses/APICourse";
import { RITClient } from "../../API/RITClient";
import { APIUser } from "../../API/Users/APIUser";
import { UserType } from "../../API/Users/UserType";
import { ICourse } from "../../ModuleTypes/Courses";
import { IStudent } from "../../ModuleTypes/Users";
import { TigerClient } from "../TigerClient";
import { Course } from "./Course";

export class Student implements IStudent {
    private RITClient:RITClient;
    // TigerClient for methods

    type: UserType.Student; // Assign the specific UserType
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    displayName: string;
    initials: string;
    universityID: string;
    plans: string[]; // Property specific to IStudent
    colleges: string[]; // Property specific to IStudent

    constructor(
        RITClient:RITClient,
        APIUser:APIUser
    ) {
        this.RITClient = RITClient;
        // Get client

        this.type = UserType.Student;
        this.username = APIUser.cn["0"];
        this.firstName = APIUser.givenname["0"];
        this.lastName = APIUser.sn["0"];
        this.email = APIUser.mail["0"];
        this.displayName = APIUser.displayname["0"];
        this.initials = APIUser.initials["0"];
        this.universityID = APIUser.uidnumber["0"];
        // These properties will exist if it's a student :)
        this.plans = APIUser.plans!;
        this.colleges = APIUser.colleges!;
    }

    async getCourses(): Promise<Course[] | null> {
        const result: APICourse[]|null = await this.RITClient.getUserCourses(this.username);
        if(result){
            const courses:Course[] = [];
            for (const C of result){
                courses.push(new Course(this.RITClient, C));
            }
            return courses;
        }
        return null;
    }
}
