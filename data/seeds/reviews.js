exports.seed = function(knex) {
	// Deletes ALL existing entries
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
		}
	]);
};
