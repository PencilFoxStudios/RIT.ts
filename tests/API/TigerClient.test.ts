import { TigerClient } from "../../src/RIT.TS/TigerClient";
import 'dotenv/config'
import dayjs from 'dayjs' 
import { Student } from "../../src/RIT.TS/Objects/Student";

const Client:TigerClient = new TigerClient(process.env.RIT_API_KEY!)
test('TigerClient gets student correctly', async () => {
  const SelectedStudent:Student = ((await Client.Users("lhw2837").get()) as Student)
  expect(SelectedStudent.firstName).toBe("Liam");
});