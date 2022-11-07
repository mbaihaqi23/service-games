const { createUser, getUser, getUserEmail, getUserProfile, updateUser, updatePassword } = require("../user.repository");

const testData = {
    fullname: 'test3451',
    email: 'test1@gmail.com',
    password: 'Password@123!'
}

describe('#user.repo.js', () => {
    describe('create user function', () => {
        it('should  create user', async () => {
            const result = await createUser(testData);
            expect(result.fullname).toBe(testData.fullname);
            expect(result.email).toBe(testData.email);
            expect(result.password).toBe(testData.password);
        });

        it("should return error", async function () {
            await createUser(testData);
            const result = await createUser(testData);
            expect(result).toBe("gagal");
          });
    });
    
    describe('get user function', () => {
        it('should get user by id ', async () => {
            const result = await getUser({userId: 1});
            expect(result.fullname).toBe(testData.fullname);
            expect(result.email).toBe(testData.email);
            expect(result.password).toBe(testData.password);
        });
    });

    describe('getUserEmail', () => {
        it('should return user`s fullname by specific email', async () => {
            const result = await getUserEmail({email: "test1@gmail.com"})
            expect(result.fullname).toBe(testData.fullname);
            expect(result.email).toBe(testData.email);
            expect(result.password).toBe(testData.password);
        });
    })

    describe('get user profile', () => {
        it('should get user profile ', async () => {
            const result = await getUserProfile({userId: 1});
            expect(result.fullname).toBe(testData.fullname);
            expect(result.email).toBe(testData.email);
            expect(result.password).toBe(testData.password);
        });   
    });

    describe('update user', () => {
        it('should update user', async () => {
           const result = await updateUser({
            userId: 1,
            fullname: testData.fullname,
            email: testData.email,
            password: testData.password
           });
           expect(result[0]).toEqual(1);
           expect(result[1][0].fullname).toBe(testData.fullname)
           expect(result[1][0].email).toBe(testData.email)
           expect(result[1][0].password).toBe(testData.password)
           //expect(result.fullname).toBe(testData.fullname);
           //console.log(result)
        });     
    });

    describe('updatePassword', () => {
        it('should update user`s password', async () => {
            const result = await updatePassword({userId: 1, password: testData.password})
            expect(result[1][0].password).toBe(testData.password)
        });
    });
});