import { APIBuilding } from "../API/Buildings/APIBuilding";
import { APICourse } from "../API/Courses/APICourse";
import { RITClient } from "../API/RITClient";
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
import { Staff } from "./Objects/Staff";
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
            get: async (): Promise<Student | Faculty | Staff> => {
                if(!RITUsername){
                    throw Error("You must provide a username to get information about!")
                }
                const User: APIUser = await this.RITAPIClient.getUser(RITUsername);
                switch (User.type['0']) {
                    case UserType.Staff:
                        return new Staff(this.RITAPIClient, User);
                    case UserType.Faculty:
                        return new Faculty(this.RITAPIClient, User);
                    case UserType.Student:
                        return new Student(this.RITAPIClient, User);
                }
            },
            getCourses: async (): Promise<Course[]> => {
                if(!RITUsername){
                    throw Error("You must provide a username to get the courses from!")
                }
                try {
                    const result: APICourse[] = await this.RITAPIClient.getUserCourses(RITUsername);
                    const courses:Course[] = [];
                    for (const C of result){
                        courses.push(new Course(this.RITAPIClient, C));
                    }
                    return courses;
                } catch (error) {
                    throw error;
                }
            
                
            }
        }
    }
    /**
     * Get information about rooms.
     * @param RoomID the ID of the room to get information about.
     */
    Rooms = (RoomID?: IRoom["id"]) => {
        return {
            get: async (): Promise<Room> => {
                if(!RoomID){
                    throw Error("You must provide a room ID to get information about!")
                }
                const RoomAPI: APIRoom = await this.RITAPIClient.getRoom(RoomID);
                return new Room(this.RITAPIClient, RoomAPI)
            },
        }
    }
    /**
     * Get information about courses.
     * @param CourseWithSection the **full** course code to look up. (EX: SWEN-261-02)
     */
    Courses = (CourseWithSection?: ICourse["courseCode"]) => {
        return {
            get: async (): Promise<Course> => {
                if(!CourseWithSection){
                    throw Error("You must provide a course to get information about!")
                }
                const CourseAPI: APICourse = await this.RITAPIClient.getCourse(CourseWithSection);
                return new Course(this.RITAPIClient, CourseAPI);
            },
        }
    }
    /**
     * Get information about a building.
     * @param BuildingNumber the building's number (EX: 006)
     */
    Buildings = (BuildingNumber?: IBuilding["number"]) => {
        return {
            get: async (): Promise<Building> => {
                if(!BuildingNumber){
                    throw Error("You must provide a building to get information about!")
                }
                const BuildingAPI: APIBuilding = await this.RITAPIClient.getBuilding(BuildingNumber);
                return new Building(this.RITAPIClient, BuildingAPI)
            },
            getAll: async(): Promise<Building[]> => {
                const BuildingsAPI: APIBuilding[] = await this.RITAPIClient.getAllBuildings();
                const Buildings: Building[] = [];
                for (const APIBuilding of BuildingsAPI){
                    Buildings.push(new Building(this.RITAPIClient, APIBuilding))
                }
                return Buildings;
            }
        }
    }

}