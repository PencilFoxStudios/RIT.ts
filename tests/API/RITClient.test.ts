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

test('RITClient returns correct user courses', async () => {
  const Courses = await Client.getUserCourses("munson");
  expect(Courses).toBeTruthy();
});

test('RITClient returns correct room', async () => {
  const SelectedRoom = await Client.getRoom("b07510a8c71c60e722deeb9e67eadb74");
  expect(SelectedRoom).toBeTruthy();
  expect(SelectedRoom!.name).toBe("George Eastman Hall (EAS)-1310");
  expect(SelectedRoom!.BuildingCode).toBe("EAS");
});

test('RITClient returns correct building', async () => {
  const SelectedBuilding = await Client.getBuilding("011");
  expect(SelectedBuilding).toBeTruthy();
  expect(SelectedBuilding!.name).toBe("SH Explore & Devel");
});

// test('RITClient user does not exist', async () => {
//   expect(Client.getUser("lol129")).toBeNull();
// });


