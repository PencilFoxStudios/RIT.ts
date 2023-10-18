import { RITClient } from "../API/RITClient";
import { Course } from "../ModuleTypes/Courses";
import { Faculty, Student, User } from "../ModuleTypes/Users";

export class TigerClient {
    private RITAPIKEY:string;
    private RITAPIClient:RITClient;
    constructor(key:string) {
        this.RITAPIKEY = key;
        this.RITAPIClient = new RITClient(this.RITAPIKEY);
    }
    /**
     * Access the RIT API to get information about a user.
     * @param RITUsername the username of the user to get information about.
     */
    Users = (RITUsername:User["username"]) => {
        return {
            getInfo: async ():Promise<Student|Faculty|null> => {
                return null;
            },
            getCourses: async ():Promise<Course[]|null> => {
                return null;
            },
        }
    }

}