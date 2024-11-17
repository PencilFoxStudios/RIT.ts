/**
 * Tests the `RITClient` class to ensure it returns the correct current term.
 * 
 * @author Liam Weiner
 */
import { RITClient } from '../../src/API/RITClient';
import 'dotenv/config'
import dayjs from 'dayjs' 
const Client = new RITClient(process.env.RIT_API_KEY!);

describe('RITClient Current Term Information', () => {
  /**
   * Test to verify that the RITClient correctly retrieves the current term.
   */
  test('RITClient returns correct term', async () => {
    const CurrentTerm = await Client.getCurrentTerm();
    expect(CurrentTerm).toBeTruthy();
    expect(dayjs().isBefore(CurrentTerm?.end_date) && dayjs().isAfter(CurrentTerm?.start_date));
  });
});