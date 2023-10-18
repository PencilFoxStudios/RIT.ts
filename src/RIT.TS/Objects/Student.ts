import { UserType } from "../../API/Users/UserType";
import { ICourse } from "../../ModuleTypes/Courses";
import { IStudent } from "../../ModuleTypes/Users";

export class Student implements IStudent {
    type: UserType.Student;
    plans: string[];
    colleges: string[];
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    displayName: string;
    givenName: string;
    initials: string;
    universityID: string;
    getCourses: () => Promise<ICourse[] | null>;


}