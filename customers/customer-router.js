const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authenticate = require("./authenticate-middleware");
const Customers = require("./customer-model");
//const { verifyCustomer } = require('../middleware/index').default

//Endpoints
//New customer registration
router.post("/register", (req, res) => {
	let customer = req.body;
	const hash = bcrypt.hashSync(customer.password, 12);
	customer.password = hash;

	Customers.add(customer)
		.then(saved => {
			res.status(201).json({ saved });
		})
		.catch(err => {
			res.status(500).json(err);
		});
});

//Customer login
router.post("/login", (req, res) => {
	let { username, password } = req.body;

	Customers.findBy({ username })
		.first()
		.then(user => {
			if (user && bcrypt.compareSync(password, user.password)) {
				const token = signToken(user);

				res.status(200).json({
					token,
					user: user,
					message: `Welcome ${user.username}!`
				});
			} else {
				res.status(401).json({ message: "Invalid Credentials" });
			}
		})
		.catch(error => {
			res.status(500).json(error);
		});
});

//Get customer by ID
router.get("/:customerId", authenticate, (req, res) => {
	const id = req.params.customerId;

	Customers.findById(id)
		.then(customer => res.status(200).json(customer))
		.catch(err => res.status(500).json(err));
});

//Update customer profile
router.put("/:customerId", authenticate, (req, res) => {
	const id = req.params.customerId;
	const update = req.body;

	Customers.updateProfile(id, update)
		.then(customer => res.status(200).json(customer))
		.catch(err => res.status(500).json(err));
});

//Adds a customer's review
router.post("/:customerId/reviews", (req, res) => {
	const review = req.body;

	Customers.submitReview(review)
		.then(console.log(review))
		.then(review => res.status(200).json(review))
		.catch(err => {
			console.log(err);
			res.status(500).json(err);
		});
});

//Get all of a customer's reviews
router.get("/:customerId/reviews", authenticate, (req, res) => {
	const id = req.params.customerId;

	Customers.getReviews(id)
		.then(reviews => res.status(200).json(reviews))
		.catch(err => res.status(500).json(err));
});

//get review by id
router.get("/:customerId/reviews/:reviewId", authenticate, (req, res) => {
	const id = req.params.reviewId;

	Customers.findReviewById(id)
		.then(reviews => res.status(200).json(reviews))
		.catch(err => res.status(500).json(err));
});

//Allows a customer to update reviews
router.put("/:customerId/reviews/:reviewId", authenticate, (req, res) => {
	const id = req.params.reviewId;
	const update = req.body;

	Customers.updateReview(id, update)
		.then(review => res.status(200).json(review))
		.catch(err => {
			console.log(err);
			res.status(500).json(err);
		});
});

//Delete a customer's review
router.delete("/:customerId/reviews/:reviewId", authenticate, (req, res) => {
	const id = req.params.reviewId;

	Customers.deleteReview(id)
		.then(review => res.status(200).json(review))
		.catch(err => {
			console.log(err);
			res.status(500).json(err);
		});
});

const signToken = user => {
	const payload = {
		username: user.username
	};

	const secret = process.env.JWT_SECRET || "FLCL is not rewatchable. Fight me.";

	const options = {
		expiresIn: "7d"
	};

	return jwt.sign(payload, secret, options);
};

module.exports = router;
