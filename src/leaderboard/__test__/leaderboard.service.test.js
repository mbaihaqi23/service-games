
const leaderboardService = require("../leaderboard.service")

describe("leaderboard.services.test", () => {
  describe('test getAllUser', () => {
    it("should return an array of users", async () => {
      const result = await leaderboardService.getAllUser();

      expect(result).toBeInstanceOf(Array);
    });

    it("should have less than 11 of elements", async function () {
      const result = await leaderboardService.getAllUser();

      expect(result.length).toBeLessThanOrEqual(10);
    });
  });
});