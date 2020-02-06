exports.seed = function(knex) {
	// Deletes ALL existing entries
	return knex("customers")
		.del()
		.then(function() {
			// Inserts seed entries
			return knex("customers").insert([
				{
					username: "Tori",
					password: "testie123",
					location: "GA",
					email: "hammerhead@GMAIL.COM"
				},
				{
					username: "Tabby",
					password: "testie123",
					location: "MD",
					email: "susua121@GMAIL.COM"
				},
				{
					username: " Chester",
					password: "testie123",
					location: "DE",
					email: "choose243@GMAIL.COM"
				},
				{
					username: "Yasmin",
					password: "testie123",
					location: "CA",
					email: "dage4@GMAIL.COM"
				},
				{
					username: "Tonie",
					password: "testie123",
					location: "GA",
					email: "fdga@GMAIL.COM"
				},
				{
					username: "Carlos",
					password: "testie123",
					location: "NH",
					email: "SSSATWR@GMAIL.COM"
				},
				{
					username: "Tina",
					password: "testie123",
					location: "GA",
					email: "tinagina@GMAIL.COM"
				},
				{
					username: "Gina",
					password: "testie123",
					location: "GA",
					email: "hwclub@GMAIL.COM"
				},
				{
					username: "Teddi",
					password: "testie123",
					location: "GA",
					email: "fooddood@GMAIL.COM"
				}
			]);
		});
};
