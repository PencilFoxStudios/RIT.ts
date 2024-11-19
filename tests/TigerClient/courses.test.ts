/**
 * Tests the `TigerClient` class to ensure it gets user information correctly.
 * 
 * @author Liam Weiner
 */
import { TigerClient } from "../../src/RIT.TS/TigerClient";
import 'dotenv/config'
import { Course } from "../../src/RIT.TS/Objects/Course";
import { CourseNotFoundError } from "../../src/API/Errors";

const Client: TigerClient = new TigerClient(process.env.RIT_API_KEY!)
describe('TigerClient Courses', () => {
  it('TigerClient should return a course object when a valid course ID is provided', async () => {
    const courseId = 'GCIS-123-02';
    const course: Course|null = await Client.Courses(courseId).get();
    expect(course).not.toBeNull();
    expect(course).toBeInstanceOf(Course);
    const [prefix, code, section] = courseId.split('-');
    expect(course?.courseCode).toBe(`${prefix}-${code}`);
  }, 15000);
  it('TigerClient should get course meetings correctly', async () => {
    const courseId = 'GCIS-123-02';
    const course: Course|null = await Client.Courses(courseId).get();
    expect(course).not.toBeNull();
    const meetings = await course!.getMeetings();
    expect(meetings).toBeTruthy();
  })
  it('TigerClient should get course instructors correctly', async () => {
    const courseId = 'GCIS-123-02';
    const course: Course|null = await Client.Courses(courseId).get();
    expect(course).not.toBeNull();
    const instructors = await course!.getInstructors();
    expect(instructors).toBeTruthy();
  })
  it('TigerClient should throw an error if the course ID is not provided', async () => {
    await expect(Client.Courses().get()).rejects.toThrow('You must provide a course to get information about!');
  });
  it('TigerClient should throw error if the course does not exist', async () => {
    expect(async () => {
      await Client.Courses('invalidCourseId').get();
    }).rejects.toThrow(CourseNotFoundError);
  });


})



