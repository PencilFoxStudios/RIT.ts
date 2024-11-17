/**
 * Tests the `TigerClient` class to ensure it gets building information correctly.
 * 
 * @author Liam Weiner
 */
import { TigerClient } from "../../src/RIT.TS/TigerClient";
import 'dotenv/config'
import { Building } from "../../src/RIT.TS/Objects/Building";


const Client: TigerClient = new TigerClient(process.env.RIT_API_KEY!)


describe('TigerClient Buildings', () => {
  test('TigerClient gets building correctly', async () => {
    const SelectedBuilding: Building | null = ((await Client.Buildings("006").get()))
    expect(SelectedBuilding).toBeTruthy()
    expect(SelectedBuilding?.name).toBe("Liberal Arts Hall");
  });
  it('TigerClient should return a building object when a valid building ID is provided', async () => {
    const buildingId = '009';
    const building: Building|null = await Client.Buildings(buildingId).get();
    expect(building).not.toBeNull();
    expect(building).toBeInstanceOf(Building);
    expect(building?.number).toBe(buildingId);
  });
})

