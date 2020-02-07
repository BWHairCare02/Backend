const request = require("supertest");
const server = require("../api/server");

describe("customer router", () => {
	describe("POST to /customer/register", () => {
		it("should include the provided username in the response", async () => {
			const info = {
				username: `RegCustTest${ Date()}`,
				password: "testie123",
				location: "TX",
				email:  `testingEmail${ Date()}@abs.com`
			};
			const newUser = await request(server)
				.post("/customer/register")
				.send(info);
			console.log("New User: ", newUser.body, "info:", info);
			return expect(newUser.body.saved.username).toEqual(info.username);
		});
		it("Should return 201 on creation", async () => {
			const response = await request(server)
				.post("/customer/register")
				.send({
					username: `CreationTest${new Date()}`,
					password: "password",
					location: "Test city",
					email:  `testingEmail${new Date()}@abs.com`
				});
			expect(response.status).toBe(201);
		});
		it("should include an id in the user object", async () => {
			const info = {
				username: `IdTesting${new Date()}`,
				password: "testie123",
				location: "TX",
				email:  `testingEmail${new Date()}@abs.com`
			};
			const newUser = await request(server)
				.post("/customer/register")
				.send(info);
				console.log(newUser.body.saved)
			return expect(newUser.body.saved).toHaveProperty("id");
		});
	});
});

