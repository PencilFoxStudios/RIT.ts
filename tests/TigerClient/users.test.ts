/**
 * Tests the `TigerClient` class to ensure it gets user information correctly.
 * 
 * @author Liam Weiner
 */
import { TigerClient } from "../../src/RIT.TS/TigerClient";
import 'dotenv/config'
import dayjs from 'dayjs'
import { Student } from "../../src/RIT.TS/Objects/Student";
import { Building } from "../../src/RIT.TS/Objects/Building";
import { RITUserIsNotFacultyError } from "../../src/API/RITClient";
import { Faculty } from "../../src/RIT.TS/Objects/Faculty";
import { Course } from "../../src/RIT.TS/Objects/Course";
import { Staff } from "../../src/RIT.TS/Objects/Staff";

const Client: TigerClient = new TigerClient(process.env.RIT_API_KEY!)
describe('TigerClient Users',  () => {
  test('TigerClient should return a student object when a valid student ID is provided', async () => {
    const student: Student|Faculty|Staff|null = await Client.Users("lhw2837").get();
    expect(student).toBeInstanceOf(Student);
    expect(student!.firstName).toBe("Liam");
    expect(student!.username).toBe("lhw2837");
    // shouldn't be possible to get courses for a student
    await expect(student!.getCourses()).rejects.toThrowError(RITUserIsNotFacultyError);
  }, 15000);

  test('TigerClient throws error on get user with no username', async () => {
    expect(async () => {
      (await Client.Users().get())
    }).rejects.toThrow()
  });

  test('TigerClient gets faculty correctly', async () => {
    const SelectedFaculty: Faculty = ((await Client.Users("gpavks").get()) as Faculty)
    expect(SelectedFaculty.firstName).toBe("Garret"); 
    expect(SelectedFaculty.username).toBe("gpavks");
    expect(SelectedFaculty).toBeInstanceOf(Faculty);
    expect(await SelectedFaculty.getCourses()).toBeTruthy();
    expect(SelectedFaculty.department).not.toBe("");
  }, 15000);
  
  test('TigerClient gets staff correctly', async () => {
    const SelectedFaculty: Staff = ((await Client.Users("kehrli").get()) as Staff)
    expect(SelectedFaculty.firstName).toBe("Kathryn"); 
    expect(SelectedFaculty.username).toBe("kehrli");
    expect(SelectedFaculty).toBeInstanceOf(Staff);
    expect(await SelectedFaculty.getCourses()).toBeTruthy();
    expect(SelectedFaculty.department).not.toBe("");
  }, 7500);

  test('TigerClient cannot get student courses', async () => {
    /** 
     * Not too sure why this takes so long... will explore later.
    */
    await expect(Client.Users("hlo7533").getCourses()).rejects.toThrowError(RITUserIsNotFacultyError);
  }, 8000);
  
  test('TigerClient gets faculty courses correctly', async () => {
    const Courses: Course[] = ((await Client.Users("munson").getCourses()) as Course[]);
    expect(Courses).toBeTruthy();
  });


})



