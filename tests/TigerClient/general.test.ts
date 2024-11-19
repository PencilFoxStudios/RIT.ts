/**
 * Tests the `TigerClient` class to ensure its general functionality.
 * 
 * @author Liam Weiner
 */
import { TigerClient } from "../../src/RIT.TS/TigerClient";
import 'dotenv/config'
import { APIKeyNotValidError } from "../../src/API/Errors";
describe('TigerClient General Functionality', () => {
  it('TigerClient should initialize with a valid API key', () => {
    const Client: TigerClient = new TigerClient(process.env.RIT_API_KEY!)
    expect(Client).toBeInstanceOf(TigerClient);
  });
  it('TigerClient should throw error if methods are called with an invalid API key', async () => {
    const Client: TigerClient = new TigerClient("invalid key");
    
    expect(async() => {
      await Client.Users("lhw2837").get()
    }).rejects.toThrow(APIKeyNotValidError);
    expect(async () => {
      await Client.Buildings("006").get();
    }).rejects.toThrow(APIKeyNotValidError);
    expect(async () => {
      await Client.Courses("CSCI-261").get();
    }).rejects.toThrow(APIKeyNotValidError);
    expect(async () => {
      await Client.Rooms("006").get();
    }).rejects.toThrow(APIKeyNotValidError);
    expect(async () => {
      await Client.Users("lhw2837").get();
    }).rejects.toThrow(APIKeyNotValidError);
    expect(async () => {
      await Client.Buildings().getAll();
    }).rejects.toThrow(APIKeyNotValidError);




});
});


