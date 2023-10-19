import { TigerClient } from "../../src/RIT.TS/TigerClient";
import 'dotenv/config'
import dayjs from 'dayjs' 
import { Student } from "../../src/RIT.TS/Objects/Student";
import { Building } from "../../src/RIT.TS/Objects/Building";

const Client:TigerClient = new TigerClient(process.env.RIT_API_KEY!)
test('TigerClient gets student correctly', async () => {
  const SelectedStudent:Student = ((await Client.Users("lhw2837").get()) as Student)
  expect(SelectedStudent.firstName).toBe("Liam");
});

test('TigerClient throws error on get user with no username', async () => {
  expect(async () => {
    (await Client.Users().get())
  }).rejects.toThrow()
});

test('TigerClient gets student courses correctly', async () => {
  /** 
   * Not too sure why this takes so long... will explore later.
  */
  expect(await Client.Users("hlo7533").getCourses()).toBeTruthy();
}, 8000);

test('TigerClient gets building correctly', async () => {
  const SelectedBuilding:Building|null = ((await Client.Buildings("006").get()))
  expect(SelectedBuilding).toBeTruthy()
  expect(SelectedBuilding?.name).toBe("Liberal Arts Hall");
});
