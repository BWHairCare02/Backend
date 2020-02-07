exports.seed = function(knex) {
	return knex("reviews")
		.del().truncate() // Deletes ALL existing entries
		.then(function() {
			// Inserts seed entries
			return knex("reviews").insert([
				{
					description: "So good so good",
					rating: 5,
					image: "",
					stylist_id: 2,
					customer_id: 1
				},
				{
					description: "Was just okay",
					rating: 3,
					image: "",
					stylist_id: 1,
					customer_id: 1
				},
				{
					description: "Incredible",
					rating: 5,
					image: "",
					stylist_id: 2,
					customer_id: 2
				},
				{
					description: "Disappointing",
					rating: 2,
					image: "",
					stylist_id: 1,
					customer_id: 2
				},
				{
					description: "So good so good",
					rating: 5,
					image: "",
					stylist_id: 3,
					customer_id: 4
				},
				{
					description: "Was just okay",
					rating: 3,
					image: "",
					stylist_id: 6,
					customer_id: 2
				},
				{
					description: "Incredible",
					rating: 5,
					image: "",
					stylist_id: 2,
					customer_id: 5
				},
				{
					description: "Disappointing",
					rating: 2,
					image: "",
					stylist_id: 5,
					customer_id: 3
				}
			]);
		});
};
