/**
 * Tests the `TigerClient` class to ensure its general functionality.
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
describe('TigerClient General Functionality', () => {
  it('TigerClient should initialize with a valid API key', () => {
    expect(Client).toBeInstanceOf(TigerClient);
  });
});


