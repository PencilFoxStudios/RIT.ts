/**
 * Tests the `TigerClient` class to ensure it gets building information correctly.
 * 
 * @author Liam Weiner
 */
import { TigerClient } from "../../src/RIT.TS/TigerClient";
import 'dotenv/config'
import { Building } from "../../src/RIT.TS/Objects/Building";
import dayjs from "dayjs";
import { DateObject } from "../../src/RIT.TS/Helpers/DateObject";


const Client: TigerClient = new TigerClient(process.env.RIT_API_KEY!)


describe('TigerClient Buildings', () => {
  test('TigerClient gets all buildings correctly', async () => {
    const Buildings: Building[]|null = await Client.Buildings().getAll();
    expect(Buildings).toBeTruthy();
    expect(Buildings).not.toHaveLength(0);
  })
  test('TigerClient gets building correctly', async () => {
    const SelectedBuilding: Building | null = ((await Client.Buildings("006").get()))
    expect(SelectedBuilding).toBeTruthy()
    expect(SelectedBuilding?.name).toBe("Liberal Arts Hall");
  });
  test('TigerClient should return a building object when a valid building ID is provided', async () => {
    const buildingId = '009';
    const building: Building | null = await Client.Buildings(buildingId).get();
    expect(building).not.toBeNull();
    expect(building).toBeInstanceOf(Building);
    expect(building?.number).toBe(buildingId);
  });
  /**
 * Test to verify that the TigerClient correctly retrieves meetings in a building.
 */
  test('TigerClient returns meetings in building', async () => {
    const SelectedBuilding = await Client.Buildings("006").get();
    expect(SelectedBuilding).toBeTruthy();
    const meetings = await SelectedBuilding!.getMeetings();
    expect(meetings).toBeTruthy();
  });

  /**
   * Test to verify that the TigerClient returns null if there are no meetings in a building.
   */
  test('TigerClient returns empty list if no meetings in a building', async () => {
    const SelectedBuilding = await Client.Buildings("002").get();
    expect(SelectedBuilding).toBeTruthy();
    const dateToCheckA = dayjs().add(30, 'year').toDate();
    const dateToCheckB = dayjs().add(30, 'year').toDate();
    const meetings = await SelectedBuilding!.getMeetings(
      new DateObject(12, 12, 1993)
      // // Before 
      // new DateObject(dateToCheckA.getFullYear(), dateToCheckA.getMonth(), dateToCheckA.getDay()),
      // // After
      // new DateObject(dateToCheckB.getFullYear(), dateToCheckB.getMonth(), dateToCheckB.getDay())
    );
    expect(meetings).toHaveLength(0);
  });
})

