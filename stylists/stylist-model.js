const db = require("../data/dbConfig");

function get() {
	return db("stylists").select("username", "location", "email");
}

function find() {
	return db("stylists").select("id", "username");
}

function findBy(filter) {
	return db("stylists").where(filter);
}

async function add(user) {
	let ids = await db("stylists").insert(user, "id");
	const [id] = ids;
	return findById(id);
}

function findById(id) {
	return db("stylists")
		.where({ id })
		.first();
}

function updateProfile(id, update) {
	return db("stylists")
		.where("id", id)
		.update(update);
}

function deleteProfile(id) {
	return db("stylists")
		.where("id", id)
		.del();
}

function getReviews(id) {
	return db("reviews")
		.join("stylists", "stylists.id", "reviews.stylist_id")
		.select(
			"reviews.id",
			"reviews.description",
			"reviews.rating",
			"stylists.username",
			"stylists.location"
		)
		.where("reviews.stylist_id", id);
}

function getPortfolio(id) {
	return db("portfolio").where("stylist_id", id);
}

function addPost(post) {
	return db("portfolio")
		.insert(post, "id");
}

function updatePost(id, update) {
	return db("portfolio")
		.where("id", id)
		.update(update);
}

function deletePost(id) {
	return db("portfolio")
		.where("id", id)
		.del();
}

module.exports = {
	get,
	add,
	find,
	findBy,
	findById,
	updateProfile,
	deleteProfile,
	getReviews,
	getPortfolio,
	addPost,
	deletePost,
	updatePost
};
