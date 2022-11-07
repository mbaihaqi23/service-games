const roomService = require("../room.service");
const roomRepo = require("../room.repo");
const { faker } = require("@faker-js/faker");

const testData = {
  roomName: faker.company.name(),
  hostUserId: 1,
};

describe("room.service.test", () => {
  describe("test createRoom", () => {
    it("should create a new room", async () => {
      const result = await roomService.createRoom(testData);

      expect(result.roomName).toBe(testData.roomName);
      expect(result.hostUserId).toBe(testData.hostUserId);

      testData.roomId = result.id;
    });

    it("should returns an error", async function () {
      roomRepo.createRoom = jest.fn().mockRejectedValue(new Error());

      await expect(roomService.createRoom(testData)).rejects.toThrow();
    });
  });

  describe("test getAllRoom", () => {
    it("should return an array of rooms", async () => {
      const result = await roomService.getAllRoom();

      expect(result[0].roomName).toBeTruthy();
      expect(result[0].roomCode).toBeTruthy();
    });

    it("should return error", async () => {
      roomRepo.getAllRoom = jest.fn().mockReturnValue(undefined);

      await expect(roomService.getAllRoom()).rejects.toThrow();
    });
  });

  describe("test findRoom", () => {
    it("should return the room with the given roomId", async () => {
      const result = await roomService.findRoom(testData.roomId);

      expect(result.roomName).toBe(testData.roomName);
      expect(result.hostUserId).toBe(testData.hostUserId);
    });
  });

  describe("test getRoomId", () => {
    it("should return the room object for the given roomCode", async () => {
      const expectedRoom = await roomRepo.findRoom(testData.roomId);

      const result = await roomService.getRoomId({ roomCode: expectedRoom.roomCode });

      expect(result.roomName).toBe(testData.roomName);
      expect(result.hostUserId).toBe(testData.hostUserId);
    });

    it("should return error", async () => {
      roomRepo.findRoomWithCode = jest.fn().mockReturnValue(undefined);

      await expect(roomService.getRoomId({roomCode: "ABCDE"})).rejects.toThrow();
    });
  });

  describe("test updateRoom", () => {
    it("should update the room", async () => {
      const newValues = {
        id: 1,
        guestUserId: 2,
        hostScore: 1,
        guestScore: 1,
        hostSelection: 1,
        guestSelection: 1,
        turn: 1,
        isFinished: true,
      };

      await roomService.updateRoom(
        newValues.id,
        newValues.guestUserId,
        newValues.hostScore,
        newValues.guestScore,
        newValues.hostSelection,
        newValues.guestSelection,
        newValues.turn,
        newValues.isFinished,
      );
      const updatedRoom = await roomRepo.findRoom(newValues.id);


      expect(updatedRoom.guestUserId).toBe(newValues.guestUserId);
      expect(updatedRoom.hostScore).toBe(newValues.hostScore);
      expect(updatedRoom.guestScore).toBe(newValues.guestScore);
      expect(updatedRoom.hostSelection).toBe(newValues.hostSelection);
      expect(updatedRoom.guestSelection).toBe(newValues.guestSelection);
      expect(updatedRoom.turn).toBe(newValues.turn);
      expect(updatedRoom.isFinished).toBe(newValues.isFinished);
    });
  });

  describe("test updateGuestUser", () => {
    it("should update the room's guest user id", async () => {
      const newValues = {
        id: 1,
        guestUserId: 3,
      };

      await roomService.updateGuestUser(newValues)
      const updatedRoom = await roomRepo.findRoom(1);

      expect(updatedRoom.guestUserId).toBe(newValues.guestUserId);
    });
  });
});