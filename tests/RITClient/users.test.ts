/**
 * Test suite for RITClient's user retrieval functionality.
 * 
 * @author Liam Weiner
 */
import { RITClient } from '../../src/API/RITClient';
import 'dotenv/config'
import dayjs from 'dayjs' 
const Client = new RITClient(process.env.RIT_API_KEY!);

describe('RITClient User Information', () => {
  test('RITClient returns correct user', async () => {
    const SelectedUser = await Client.getUser("lhw2837");
    expect(SelectedUser).toBeTruthy();
    expect(SelectedUser!.initials["0"]).toBe("LW");
  });

  test('RITClient returns correct user courses', async () => {
    const Courses = await Client.getUserCourses("munson");
    expect(Courses).toBeTruthy();
  });

  test('RITClient user does not exist', async () => {
    expect(await Client.getUser("lol129")).toBeNull();
  });
});