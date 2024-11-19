import { APIMeeting } from "../../API/Meetings/APIMeeting";
import { MeetingType } from "../../API/Meetings/MeetingType";
import { RITClient } from "../../API/RITClient";
import { IMeeting } from "../../ModuleTypes/Meetings";
import { IRoom } from "../../ModuleTypes/Rooms";
import { Room } from "./Room";

export class Meeting implements IMeeting{
    private RITClient:RITClient;
    // RITClient for methods
    
    id: string;
    date: string;
    day: string;
    timeStart: string;
    timeEnd: string;
    meetingType: MeetingType;
    createdAt: string;
    updatedAt: string;
    roomID: string;
    getRoom: () => Promise<Room>;
    constructor(
        RITClient:RITClient,
        MeetingData:APIMeeting
    ) {
        this.RITClient = RITClient;
        // Get client

        this.id = MeetingData.id;
        this.date = MeetingData.date;
        this.day = MeetingData.day;
        this.timeStart = MeetingData.start;
        this.timeEnd = MeetingData.end;
        this.meetingType = MeetingData.meetingtype;
        this.createdAt = MeetingData.created_at;
        this.updatedAt = MeetingData.updated_at;
        this.roomID = MeetingData.room_id;
        this.getRoom = async () : Promise<Room> => {
            const resRoom = await this.RITClient.getRoom(this.roomID);
            return new Room(this.RITClient, resRoom)
           
        }
    }
  
    

    
}