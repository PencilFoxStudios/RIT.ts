import { RITClient } from '../../src/API/RITClient';
import 'dotenv/config'
import dayjs from 'dayjs' 
const Client = new RITClient(process.env.RIT_API_KEY!);
test('RITClient returns correct term', async () => {
  const CurrentTerm = await Client.getCurrentTerm();
  expect(CurrentTerm).toBeTruthy();
  expect(dayjs().isBefore(CurrentTerm?.end_date) && dayjs().isAfter(CurrentTerm?.start_date));
});

test('RITClient returns correct user', async () => {
  const SelectedUser = await Client.getUser("lhw2837");
  expect(SelectedUser).toBeTruthy();
 
  expect(SelectedUser!.initials["0"]).toBe("LW");

});



