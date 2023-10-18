import { APIBuilding } from "../Buildings/APIBuilding";
import { RoomType } from "./RoomType";

export interface APIRoom {
    id: string,
    building: APIBuilding["BuildingCode"],
    room: string,
    name: string,
    type: RoomType,
    capacity: number,
    created_at: string,
    updated_at: string,
    BuildingName: APIBuilding["BuildingName"],
    BuildingCode: APIBuilding["BuildingCode"]
}