const request = require("supertest");
const server = require("../api/server");

describe("stylist router", () => {
	describe("POST to /stylist/register", () => {
		it("should include the provided username in the response", async () => {
			const info = {
				username: `RegStylistTest${Date()}`,
				password: "testie123",
				location: "TX",
				email: `testingEmail${Date()}@abs.com`
			};
			const newUser = await request(server)
				.post("/stylist/register")
				.send(info);
			console.log("New User: ", newUser.body, "info:", info);
			return expect(newUser.body.username).toEqual(info.username);
		});
		it("Should return 201 on creation", async () => {
			const response = await request(server)
				.post("/stylist/register")
				.send({
					username: `CreationTest${new Date()}`,
					password: "password",
					location: "Test city",
					email: `testingEmail${new Date()}@abs.com`
				});
			expect(response.status).toBe(201);
		});
		it("should include an id in the user object", async () => {
			const info = {
				username: `IdTesting${new Date()}`,
				password: "testie123",
				location: "TX",
				email: `testingEmail${new Date()}@abs.com`
			};
			const newUser = await request(server)
				.post("/stylist/register")
				.send(info);
			console.log(newUser.body.saved);
			return expect(newUser.body).toHaveProperty("id");
		});
	});

	describe("POST to /stylist/login", () => {
		it("Should return 200 status on login", async () => {
			const loggedIn = await request(server)
				.post("/stylist/login")
				.send({ username: "Stacy", password: "testie123" });
			console.log(loggedIn.body);
			return expect(loggedIn.body).toHaveProperty("token");
		});
	});
});
