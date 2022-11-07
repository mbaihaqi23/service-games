const roomRepo = require("../room.repo");

const testData = {
  roomName: "room test",
  hostUserId: 1,
};

describe("room.repo.test", () => {
  describe("test createRoom", () => {
    it("should create a new room", async () => {
      const result = await roomRepo.createRoom(testData);

      expect(result.roomName).toBe(testData.roomName);
      expect(result.hostUserId).toBe(testData.hostUserId);
    });
  });

  describe("test findRoomWithCode", () => {
    it("should return the room object for the given roomCode", async () => {
      const expectedRoom = await roomRepo.findRoom(1);

      const result = await roomRepo.findRoomWithCode({ roomCode: expectedRoom.roomCode });

      expect(result.roomName).toBe(testData.roomName);
      expect(result.hostUserId).toBe(testData.hostUserId);
    });
  });

  describe("test findRoom", () => {
    it("should return the room for the given roomId", async () => {
      const result = await roomRepo.findRoom(1);

      expect(result.roomName).toBe("room test");
      expect(result.hostUserId).toBe(testData.hostUserId);
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

      await roomRepo.updateRoom(
        newValues.id,
        newValues.guestUserId,
        newValues.hostScore,
        newValues.guestScore,
        newValues.hostSelection,
        newValues.guestSelection,
        newValues.turn,
        newValues.isFinished,
      );
      const updatedRoom = await roomRepo.findRoom(1);


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

      await roomRepo.updateGuestUser(newValues)
      const updatedRoom = await roomRepo.findRoom(1);

      expect(updatedRoom.guestUserId).toBe(newValues.guestUserId);
    });
  });

  describe('test getAllRoom', () => {
    it('should return an array of room', async () => {
      const result = await roomRepo.getAllRoom()

      expect(result[0].roomName).toBeTruthy();
      expect(result[0].roomCode).toBeTruthy();
    });
  });
});