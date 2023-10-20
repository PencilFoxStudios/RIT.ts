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
    getRoom: () => Promise<Room | null>;
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
        this.getRoom = async () : Promise<Room | null> => {
            const resRoom = await this.RITClient.getRoom(this.id);
            if(resRoom){
                return new Room(this.RITClient, resRoom)
            }else{
                return null;
            }
           
        }
    }
    

    
}