/**
 * Tests the `TigerClient` class to ensure it gets room information correctly.
 * 
 * @author Liam Weiner
 */
import { TigerClient } from "../../src/RIT.TS/TigerClient";
import 'dotenv/config'
import dayjs from 'dayjs'
import { Student } from "../../src/RIT.TS/Objects/Student";
import { Building } from "../../src/RIT.TS/Objects/Building";
import { Faculty } from "../../src/RIT.TS/Objects/Faculty";
import { Course } from "../../src/RIT.TS/Objects/Course";
import { DateObject } from "../../src/RIT.TS/Helpers/DateObject";
import { Room } from "../../src/RIT.TS/Objects/Room";
import { RoomNotFoundError } from "../../src/API/Errors";

const Client: TigerClient = new TigerClient(process.env.RIT_API_KEY!);

describe('TigerClient Room Information', () => {
  it('TigerClient should get room information correctly', async () => {
    const roomID = "622e73426408fc09c4437ffa846e2441";
    const roomInfo = await Client.Rooms(roomID).get();
    expect(roomInfo).toBeDefined();
    expect(roomInfo?.id).toBe(roomID);

  });

  it('TigerClient should throw an error if the room ID is not provided', async () => {
    await expect(Client.Rooms().get()).rejects.toThrow('You must provide a room ID to get information about!');
  });

  it('TigerClient should throw error if the room does not exist', async () => {
    // const roomInfo = await Client.Rooms('invalidRoomId').get();
    // expect(roomInfo).toBeNull();
    expect(async () => {
      await Client.Rooms('invalidRoomId').get();
    }).rejects.toThrow(RoomNotFoundError);
  });

  /**
   * Test to verify that the TigerClient correctly retrieves a room by its identifier.
   */
  test('TigerClient returns correct room', async () => {
    const SelectedRoom = await Client.Rooms("b07510a8c71c60e722deeb9e67eadb74").get();
    expect(SelectedRoom).toBeTruthy();
    expect(SelectedRoom!.roomFullName).toBe("George Eastman Hall (EAS)-1310");
    expect(SelectedRoom!.buildingCode).toBe("EAS");
  });

  /**
   * Test to verify that the TigerClient throws an error if the room ID is not provided.
   */
  test('TigerClient throws error if room ID is not provided', async () => {
    await expect(Client.Rooms().get()).rejects.toThrow('You must provide a room ID to get information about!');
  });

  /**
   * Test to verify that the TigerClient correctly retrieves meetings in a room.
   */
  test('TigerClient returns meetings in room', async () => {
    const SelectedRoom = await Client.Rooms("b07510a8c71c60e722deeb9e67eadb74").get();
    expect(SelectedRoom).toBeTruthy();
    const meetings = await SelectedRoom!.getMeetings();
    expect(meetings).toBeTruthy();
    expect(async () => {
      await meetings![0].getRoom();
    }).not.toThrow();
  });

  /**
   * Test to verify that the TigerClient returns null if there are no meetings in a room.
   */
  test('TigerClient returns empty list if no meetings in room', async () => {
    const SelectedRoom:Room = await Client.Rooms("b07510a8c71c60e722deeb9e67eadb74").get();
    expect(SelectedRoom).toBeTruthy();
    const dateToCheckA = dayjs().add(1, 'year').toDate();
    const dateToCheckB = dayjs().add(2, 'year').toDate();
    const meetings = await SelectedRoom?.getMeetings(
      new DateObject(12, 12, 1993)
    );
    expect(meetings).toHaveLength(0);
  });

});
