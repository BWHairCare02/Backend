const db = require("../data/dbConfig.js");

module.exports = {
	add,
	find,
	findBy,
	findById,
	updateProfile,
	submitReview,
	findReviewById,
	updateReview,
	getReviews,
	deleteReview,
	findByUsername
};

function find() {
	return db("customers").select(
		"id",
		"username",
		"password",
		"email",
		"location"
	);
}

function findBy(filter) {
	return db("customers").where(filter);
}

async function add(user) {
	const [id] = await db("customers").insert(user);

	return findById(id);
}

function findById(id) {
	return db("customers")
		.where({ id })
		.first();
}

function findReviewById(id) {
	return db("reviews")
		.where({ id })
		.first();
}

function updateProfile(id, update) {
	return db("customers")
		.where("id", id)
		.update(update);
}

function submitReview(review) {
	return db("reviews")
		.insert(review, "id")
		.then(ids => {
			const [id] = ids;
			return findReviewById(id);
		});
}

function updateReview(id, update) {
	return db("reviews")
		.where("id", id)
		.update(update);
}

function getReviews(id) {
	return db("reviews").where("customer_id", id);
}

function deleteReview(id) {
	return db('reviews')
		.where('id', id)
		.del();
}

function findByUsername(username) {
	return db("stylists").select("username").where("username", '=', username);
}