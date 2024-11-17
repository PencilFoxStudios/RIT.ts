/**
 * Test suite for RITClient's building retrieval functionality.
 * 
 * @author Liam Weiner
 */
import { RITClient } from '../../src/API/RITClient';
import 'dotenv/config'
import dayjs from 'dayjs' 
const Client = new RITClient(process.env.RIT_API_KEY!);

describe('RITClient Building Information', () => {
  /**
   * Test to verify that the RITClient correctly retrieves a building by its identifier.
   */
  test('RITClient returns correct building', async () => {
    const SelectedBuilding = await Client.getBuilding("011");
    expect(SelectedBuilding).toBeTruthy();
    expect(SelectedBuilding!.name).toBe("SH Explore & Devel");
  });
});