const request = require("supertest");
const server = require("../api/server");

describe("POST to /stylist/login", () => {
	it("Should return 200 status on login", async () => {
		const loggedIn = await request(server)
			.post("/stylist/login")
			.send({
				username: "testingstylist1",
				password: "password"
			});
		return expect(loggedIn.status).toBe(200);
	});
});

describe("Stylist router", () => {
	describe("POST to /stylist/register", () => {
		it("Should return 201 on creation", async () => {
			const response = await request(server)
				.post("/stylist/register")
				.send({
					username: "testingstylist1",
					password: "password",
					location: "Test city",
					email: "test@gmail.com"
				});
			expect(response.status).toBe(201);
		});

		it("should include the provided username in the response", async () => {
			const info = {
				username: `testStylist${new Date.bind()}`,
				password: "testie123",
				location: "TX",
				email: `testingEmail${new Date.bind()}@abs.com`
			};
			const newUser = await request(server)
				.post("/stylist/register")
				.send(info);
			console.log("New User: ", newUser.body, "info:", info);
			return expect(newUser.body.saved.username).toEqual(info.username);
		});
		it("should include an id in the user object", async () => {
			const info = {
				username: `testingUser${new Date.bind()}`,
				password: "testie123",
				location: "TX",
				email: `testingEmail${new Date.bind()}@abs.com`
			};
			const newUser = await request(server)
				.post("/stylist/register")
				.send(info);
			return expect(newUser.body.saved.id).toBeDefined();
		});
	});
});
