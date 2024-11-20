/**
 * Tests the `RITClient` class to ensure it returns the correct current term.
 * 
 * @author Liam Weiner
 */
import { RITClient } from '../../src/API/RITClient';
import * as Errors from '../../src/API/Errors';
import 'dotenv/config'
import dayjs from 'dayjs' 
import { AxiosHeaders } from 'axios';
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

describe('RITClient Errors and Exceptions', () => {
  test("APIKeyNotValidError", async () => {
    const Client = new RITClient("invalid key");
    expect(() => {
      throw new Errors.APIKeyNotValidError
    }).toThrow("[api.rit.edu] The API key provided is not valid!");
  });
  test("UserNotFoundError", async () => {
    expect(() => {
      throw new Errors.UserNotFoundError("lhw2837")
    }).toThrow("[api.rit.edu] The user lhw2837 was not found!");
  });
  test("CourseNotFoundError", async () => {
    expect(() => {
      throw new Errors.CourseNotFoundError("NARC-123")
    }).toThrow("[api.rit.edu] The course NARC-123 was not found!");
    expect(() => {
      throw new Errors.CourseNotFoundError("NARC-123", "2033")
    }).toThrow("[api.rit.edu] The course NARC-123 in term 2033 was not found!");
  });
  test("BuildingNotFoundError", async () => {
    expect(() => {
      throw new Errors.BuildingNotFoundError("006")
    }).toThrow("[api.rit.edu] The building 006 was not found!");
  });
  test("RoomNotFoundError", async () => {
    expect(() => {
      throw new Errors.RoomNotFoundError("006")
    }).toThrow("[api.rit.edu] The room 006 was not found!");
  });
  test("RateLimitError", async () => {
    expect(() => {
      throw new Errors.RateLimitError()
    }).toThrow("[api.rit.edu] The API rate limit has been reached!");
  });
  test("MeetingNotFoundError", async () => {
    expect(() => {
      throw new Errors.MeetingNotFoundError("efwiogjgow")
    }).toThrow("[api.rit.edu] The meeting efwiogjgow was not found!");
  });
  test("UserIsStudentError", async () => {
    expect(() => {
      throw new Errors.UserIsStudentError("lhw2837")
    }).toThrow("[api.rit.edu] The user lhw2837 is not a faculty member!\nAs of early 2024, fetching student courses is disabled.");
  });
  test("GeneralAxiosError", async () => {
    expect(() => {
      throw new Errors.GeneralAxiosError({status: 404, statusText: "Not Found"})
    }).toThrow("[api.rit.edu] An error occurred while making a request to the RIT API: 404 Not Found");
  });
  test("RITAPIError", async () => {
    expect(() => {
      throw new Errors.RITAPIError("An error occurred")
    }).toThrow("[api.rit.edu] An error occurred");
  });
})