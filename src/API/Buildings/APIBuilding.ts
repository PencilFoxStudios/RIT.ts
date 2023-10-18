/**
 * Represents an RIT Building object
 * @interface Building
 * @param building - The building alphanumeric code (EX: 006)
 * @param name - The building name (EX: Liberal Arts Hall)
 * @param BuildingName - The building name (EX: Liberal Arts Hall)
 * @param BuildingCode - The building letter code (EX: LBR)
 */
export interface APIBuilding {
    building: string,
    name: string,
    BuildingName: string,
    BuildingCode: string
}