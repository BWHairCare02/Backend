exports.seed = function(knex) {
	// Deletes ALL existing entries
	return knex("stylists")
		.del().truncate()
		.then(function() {
			// Inserts seed entries
			return knex("stylists").insert([
				{
					username: "Stacy",
					password: "testie123",
					location: "GA",
					email: "tedsted@GMAIL.COM"
				},
				{
					username: "Toliver",
					password: "testie123",
					location: "MD",
					email: "susa2@GMAIL.COM"
				},
				{
					username: " Chelsey",
					password: "testie123",
					location: "DE",
					email: "choe243@GMAIL.COM"
				},
				{
					username: "Chloe",
					password: "testie123",
					location: "CA",
					email: "dade4@GMAIL.COM"
				},
				{
					username: "Antoine",
					password: "testie123",
					location: "GA",
					email: "fdgads@GMAIL.COM"
				},
				{
					username: "Toddie",
					password: "testie123",
					location: "NH",
					email: "SSSTWR@GMAIL.COM"
				},
				{
					username: "Gwendolyn",
					password: "testie123",
					location: "GA",
					email: "tingin@GMAIL.COM"
				},
				{
					username: "Todd",
					password: "testie123",
					location: "GA",
					email: "hwcub@GMAIL.COM"
				},
				{
					username: "Yessy",
					password: "testie123",
					location: "GA",
					email: "foddod@GMAIL.COM"
				}
			]);
		});
};