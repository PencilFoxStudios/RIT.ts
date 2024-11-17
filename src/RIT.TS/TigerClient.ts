import { APIBuilding } from "../API/Buildings/APIBuilding";
import { APICourse } from "../API/Courses/APICourse";
import { RITClient, RITUserIsNotFacultyError } from "../API/RITClient";
import { APIRoom } from "../API/Rooms/APIRoom";
import { APIUser } from "../API/Users/APIUser";
import { UserType } from "../API/Users/UserType";
import { IBuilding } from "../ModuleTypes/Buildings";
import { ICourse } from "../ModuleTypes/Courses";
import { IRoom } from "../ModuleTypes/Rooms";
import { IUser } from "../ModuleTypes/Users";
import { Building } from "./Objects/Building";
import { Course } from "./Objects/Course";
import { Faculty } from "./Objects/Faculty";
import { Room } from "./Objects/Room";
import { Student } from "./Objects/Student";


export class TigerClient {
    private RITAPIKEY: string;
    private RITAPIClient: RITClient;
    constructor(key: string) {
        this.RITAPIKEY = key;
        this.RITAPIClient = new RITClient(this.RITAPIKEY);
    }
    /**
     * Get information about users.
     * @param RITUsername the username of the user to get information about.
     */
    Users = (RITUsername?: IUser["username"]) => {
        return {
            get: async (): Promise<Student | Faculty | null> => {
                if(!RITUsername){
                    throw Error("You must provide a username to get information about!")
                }
                const User: APIUser | null = await this.RITAPIClient.getUser(RITUsername);
                if (User) {
                    switch (User.type['0']) {
                        case UserType.Faculty:
                            return new Faculty(this.RITAPIClient, User);
                        case UserType.Student:
                            return new Student(this.RITAPIClient, User);
                    }
                }
                return null;
            },
            getCourses: async (): Promise<Course[] | null> => {
                if(!RITUsername){
                    throw Error("You must provide a username to get the courses from!")
                }
                try {
                    const result: APICourse[]|null = await this.RITAPIClient.getUserCourses(RITUsername);
                    if(result){
                        const courses:Course[] = [];
                        for (const C of result){
                            courses.push(new Course(this.RITAPIClient, C));
                        }
                        return courses;
                    }
                    
                } catch (error) {
                    throw error;
                }
                return null;
                
            }
        }
    }
    /**
     * Get information about rooms.
     * @param RoomID the ID of the room to get information about.
     */
    Rooms = (RoomID?: IRoom["id"]) => {
        return {
            get: async (): Promise<Room | null> => {
                if(!RoomID){
                    throw Error("You must provide a room ID to get information about!")
                }
                const RoomAPI: APIRoom | null = await this.RITAPIClient.getRoom(RoomID);
                if (RoomAPI) {
                    return new Room(this.RITAPIClient, RoomAPI)
                }
                return null;
            },
        }
    }
    /**
     * Get information about courses.
     * @param CourseWithSection the **full** course code to look up. (EX: SWEN-261-02)
     */
    Courses = (CourseWithSection?: ICourse["courseCode"]) => {
        return {
            get: async (): Promise<Course | null> => {
                if(!CourseWithSection){
                    throw Error("You must provide a course to get information about!")
                }
                const CourseAPI: APICourse | null = await this.RITAPIClient.getCourse(CourseWithSection);
                if (CourseAPI) {
                    return new Course(this.RITAPIClient, CourseAPI)
                }
                return null;
            },
        }
    }
    /**
     * Get information about a building.
     * @param BuildingNumber the building's number (EX: 006)
     */
    Buildings = (BuildingNumber?: IBuilding["number"]) => {
        return {
            get: async (): Promise<Building | null> => {
                if(!BuildingNumber){
                    throw Error("You must provide a building to get information about!")
                }
                const BuildingAPI: APIBuilding | null = await this.RITAPIClient.getBuilding(BuildingNumber);
                if (BuildingAPI) {
                    return new Building(this.RITAPIClient, BuildingAPI)
                }
                return null;
            },
            getAll: async(): Promise<Building[]|null> => {
                const BuildingsAPI: APIBuilding[] | null = await this.RITAPIClient.getAllBuildings();
                if (BuildingsAPI) {
                    const Buildings: Building[] = [];
                    for (const APIBuilding of BuildingsAPI){
                        Buildings.push(new Building(this.RITAPIClient, APIBuilding))
                    }
                    return Buildings;
                }
                return null;
            }
        }
    }

}