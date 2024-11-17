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

const Client: TigerClient = new TigerClient(process.env.RIT_API_KEY!)
describe('TigerClient Courses', () => {
  it('TigerClient should return a course object when a valid course ID is provided', async () => {
    const courseId = 'GCIS-123-02';
    const course: Course|null = await Client.Courses(courseId).get();
    expect(course).not.toBeNull();
    expect(course).toBeInstanceOf(Course);
    const [prefix, code, section] = courseId.split('-');
    expect(course?.courseCode).toBe(`${prefix}-${code}`);
  });
})



