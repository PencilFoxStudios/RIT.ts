import { APIBuilding } from "../Buildings/APIBuilding";
import { RoomType } from "./RoomType";

/**
 * Represents a physical room at RIT
 * @param id - The ID of the room in the RIT API
 * @param building - The building that the room is in as APIBuilding data
 * @param room - The number of the room as a string
 * @param name - Name of the room
 * @param type - The type of room represented by the RoomType enum
 * @param capacity - The maximum capacity of the room
 * @param created_at - The time that the room was added to the RIT API
 * @param updated_at - The time that the room was last updated in the RIT API
 * @param BuildingName - Name of the building the room is in
 * @param BuildingCode - The code of the building the room is in
 * 
 * @see APIBuilding
 * @see RoomType
 */
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