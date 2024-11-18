/**
 * Tests the `RITClient` class to ensure it returns the correct course info for a given term
 * 
 * @author Liam Weiner
 */
import { RITClient } from '../../src/API/RITClient';
import 'dotenv/config'
import dayjs from 'dayjs' 
const Client = new RITClient(process.env.RIT_API_KEY!);

describe('RITClient Course Information', () => {
  test('RITClient should return course information for a given term', async () => {
    const term = '2241';
    const course = await Client.getCourse("GCIS-123-02", term);
    expect(course).toBeTruthy();
    expect(course!.name).toBe("SoftwareDev&ProbSolv_I");
  })
});