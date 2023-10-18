import { RoomType } from "../../API/Rooms/RoomType";

export interface Room {
    id: string,
    type: RoomType,
    buildingCode: string,
    buildingNumber: string,
    buildingFullName: string,
    roomNumber: string,
    roomFullName: string,
    maxCapacity: number,
}