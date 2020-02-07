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



describe("POST to /customer/login", () => {
	it("Should return 200 status on login", async () => {
		const loggedIn = await request(server)
			.post("/customer/login")
			.send({
				username: "Sarahh",
				password: "testie123"
			});
		return expect(loggedIn.body).toHaveProperty("token");
	});

	// it("should include an id in the user object", async () => {
	// 	const info = {
	// 		username: `testingUser${new Date()}`,
	// 		password: "testie123",
	// 		location: "TX",
	// 		email:  `testEmail${new Date()}@abs.com`
	// 	};

	// 	const newUser = await request(server)
	// 		.post("/customer/register")
	// 		.send(info);
	// 		console.log("HHSDFIKSBFI",info)
	// 	const loggedIn = await request(server)
	// 		.post("customer/login")
	// 		.send(`${info.username}, ${info.password}`);
	// 		console.log("HHSDFIKSBFI",info)
	// 	return expect(loggedIn.body.saved.id).toBeDefined();
	//});

	// it("should respond with a token given correct user information", async () => {
	// 	const info = {
	// 		username: `testingUser${new Date()}`,
	// 		password: "testie123",
	// 		location: "TX",
	// 		email:  `testingEmail${new Date()}@abs.com`
	// 	};

	// 	const newUser = await request(server)
	// 		.post("/customer/register")
	// 		.send(info);
	// 	const loggedIn = await request(server)
	// 		.post("/customer/login")
	// 		.send(`${info.username},${info.password}`);
	// 	return expect(loggedIn.body).toHaveProperty("token");
	// });
});
