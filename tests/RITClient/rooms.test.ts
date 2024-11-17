
/**
 * Tests for the RITClient class.
 * 
 * This test suite verifies that the RITClient class correctly retrieves room information.
 * 
 * @author Liam Weiner
 */

import { RITClient } from '../../src/API/RITClient';
import 'dotenv/config'
import dayjs from 'dayjs' 
const Client = new RITClient(process.env.RIT_API_KEY!);

/**
 * Test case to verify that the RITClient returns the correct room information.
 */
test('RITClient returns correct room', async () => {

  const SelectedRoom = await Client.getRoom("b07510a8c71c60e722deeb9e67eadb74");
  expect(SelectedRoom).toBeTruthy();
  expect(SelectedRoom!.name).toBe("George Eastman Hall (EAS)-1310");
  expect(SelectedRoom!.BuildingCode).toBe("EAS");
});

