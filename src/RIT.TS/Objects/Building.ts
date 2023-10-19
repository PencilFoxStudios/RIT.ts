import { APIBuilding } from "../../API/Buildings/APIBuilding";
import { APIMeeting } from "../../API/Meetings/APIMeeting";
import { RITClient } from "../../API/RITClient";
import { IBuilding } from "../../ModuleTypes/Buildings";
import { IMeeting } from "../../ModuleTypes/Meetings";
import { DateObject } from "../Helpers/DateObject";
import { Meeting } from "./Meeting";

export class Building implements IBuilding{
    private RITClient: RITClient;
    // RITClient for methods
    
    number: string;
    name: string;
    letterCode: string;
    getMeetings: (beforeDate?: DateObject, afterDate?: DateObject) => Promise<Meeting[] | null>;
    constructor(RITClient: RITClient, BuildingData: APIBuilding) {
        this.RITClient = RITClient;

        this.number = BuildingData.building;
        this.name = BuildingData.name;
        this.letterCode = BuildingData.BuildingCode;
        this.getMeetings = async (beforeDate?: DateObject, afterDate?: DateObject): Promise<Meeting[] | null> => {
            const result: APIMeeting[]|null = await this.RITClient.getMeetingsInBuilding(this.number, beforeDate?.toDateString(), afterDate?.toDateString());
            if(result){
                const meetings:Meeting[] = [];
                for (const M of result){
                    meetings.push(new Meeting(this.RITClient, M));
                }
                return meetings;
            }
            return null;
        }
    }
}