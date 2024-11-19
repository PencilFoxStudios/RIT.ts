
import { APICourse } from "../../API/Courses/APICourse";
import { RITClient } from "../../API/RITClient";
import { APIUser } from "../../API/Users/APIUser";
import { UserType } from "../../API/Users/UserType";
import { IStaff } from "../../ModuleTypes/Users/IStaff";
import { Course } from "./Course";

export class Staff implements IStaff {
    private RITClient:RITClient;
    // RITClient for methods

    type: UserType.Staff = UserType.Staff; // Assign the specific UserType.
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    displayName: string;
    initials: string;
    universityID: string;
    department: string; // Property specific to IFaculty

    constructor(
        RITClient:RITClient,
        APIUser:APIUser
    ) {
        this.RITClient = RITClient;
        // Get client

        this.username = APIUser.cn["0"];
        this.firstName = APIUser.givenname["0"];
        this.lastName = APIUser.sn["0"];
        this.email = APIUser.mail["0"];
        this.displayName = APIUser.displayname["0"];
        this.initials = APIUser.initials["0"];
        this.universityID = APIUser.uidnumber["0"];
        // These properties will exist if it's a faculty member :)
        this.department = APIUser.department?APIUser.department![0]:"";
    }
    

    async getCourses(): Promise<Course[]> {
        const result: APICourse[] = await this.RITClient.getUserCourses(this.username);
        const courses:Course[] = [];
        for (const C of result){
            courses.push(new Course(this.RITClient, C));
        }
        return courses;
    }
}
