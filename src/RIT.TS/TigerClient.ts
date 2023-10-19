import { RITClient } from "../API/RITClient";
import { APIUser } from "../API/Users/APIUser";
import { UserType } from "../API/Users/UserType";
import { ICourse } from "../ModuleTypes/Courses";
import { IUser } from "../ModuleTypes/Users";
import { Faculty } from "./Objects/Faculty";
import { Student } from "./Objects/Student";


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
    Users = (RITUsername:IUser["username"]) => {
        return {
            get: async ():Promise<Student|Faculty|null> => {
                const User:APIUser|null = await this.RITAPIClient.getUser(RITUsername);
                if(User){
                    switch(User.type['0']){
                        case UserType.Faculty:
                            return new Faculty(this.RITAPIClient, User);
                        case UserType.Student:
                            return new Student(this.RITAPIClient, User);
                    }
                }
                return null;
            },
        }
    }

}