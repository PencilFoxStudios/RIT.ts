import { APIMeeting } from "../../API/Meetings/APIMeeting";
import { RITClient } from "../../API/RITClient";
import { APIRoom } from "../../API/Rooms/APIRoom";
import { RoomType } from "../../API/Rooms/RoomType";
import { IRoom } from "../../ModuleTypes/Rooms";
import { DateObject } from "../Helpers/DateObject";
import { Meeting } from "./Meeting";

export class Room implements IRoom {
    private RITClient: RITClient;
    // RITClient for methods

    id: string;
    type: RoomType;
    buildingCode: string;
    buildingNumber: string;
    buildingFullName: string;
    roomNumber: string;
    roomFullName: string;
    maxCapacity: number;
    getMeetings: (onDate?:DateObject) => Promise<Meeting[]>;

    constructor(RITClient: RITClient, RoomData: APIRoom) {
        this.RITClient = RITClient;

        this.id = RoomData.id;
        this.type = RoomData.type;
        this.buildingCode = RoomData.BuildingCode;
        this.buildingNumber = RoomData.building;
        this.buildingFullName = RoomData.BuildingName;
        this.roomNumber = RoomData.room;
        this.roomFullName = RoomData.name;
        this.maxCapacity = RoomData.capacity;
        this.getMeetings = async (onDate?: DateObject): Promise<Meeting[]> => {
            const result: APIMeeting[] = await this.RITClient.getMeetingsInRoomV2(this.id, onDate?.toDateString());
            const meetings:Meeting[] = [];
            for (const M of result){
                meetings.push(new Meeting(this.RITClient, M));
            }
            return meetings;
        }
    }
}