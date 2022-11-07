const leaderboardRepo = require("../leaderboard.repository");

describe('leaderboard repo', () => {
    it('should getAllusers', async() => {
        const result = await leaderboardRepo.getAllUser({userId: 1});
        expect(result).toBeInstanceOf(Array);
    });
});
