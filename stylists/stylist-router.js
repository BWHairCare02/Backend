const bc = require("bcryptjs");
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const authenticate = require("../customers/authenticate-middleware");
const { jwtSecret } = require("../config/secrets");
const Stylists = require("./stylist-model");
const {
  verifyStylist,
  verifyStylistRegistration,
	verifyLogin,
	verifyPostData,
	verifyPost
} = require("../middleware");

//Endpoints
//Stylist registration
router.post("/register", verifyStylistRegistration, (req, res) => {
	let user = req.body;

	const hash = bc.hashSync(user.password, 8);

	user.password = hash;

	Stylists.add(user)
		.then(saved => res.status(201).json(saved))
		.catch(err => res.status(500).json(err));
});

//Stylist login
router.post("/login", verifyLogin, (req, res) => {
	let { username, password } = req.body;

	Stylists.findBy({ username })
		.first()
		.then(user => {
			if (user && bc.compareSync(password, user.password)) {
				const token = signToken(user);

				res
					.status(200)
					.json({ message: `Welcome ${user.username}`, token, user: user });
			} else {
				res.status(401).json({ message: "Invalid credentials" });
			}
		})
		.catch(err => res.status(500).json(err));
});

//Get all stylists
router.get("/", authenticate, (req, res) => {
	Stylists.get()
		.then(stylists => res.status(200).json(stylists))
		.catch(err => res.status(500).json(err));
});

//Get a stylist by ID
router.get("/:stylistId", authenticate, verifyStylist, (req, res) => {
	const id = req.params.stylistId;

	Stylists.findById(id)
		.then(stylist => res.status(200).json(stylist))
		.catch(err => res.status(500).json(err));
});

//Allow a stylist to update their profile
router.put("/:stylistId", authenticate, verifyStylist, (req, res) => {
	const id = req.params.stylistId;
	const update = req.body;

	Stylists.updateProfile(id, update)
		.then(stylist => res.status(200).json(stylist))
		.catch(err => {
			console.log(err);
			res.status(500).json(err);
		});
});

//Allows a stylist to delete their profile
router.delete("/:stylistId", authenticate, verifyStylist, (req, res) => {
	const id = req.params.stylistId;

	Stylists.deleteProfile(id)
		.then(stylist => res.status(200).json(stylist))
		.catch(err => res.status(500).json(err));
});

//Get all reviews for a stylist
router.get("/:stylistId/reviews", verifyStylist, authenticate, (req, res) => {
	const id = req.params.stylistId;

	Stylists.getReviews(id)
		.then(reviews => res.status(200).json(reviews))
		.catch(err => {
			console.log(err);
			res.status(500).json(err);
		});
});

//Retrieve a stylist's image posts
router.get("/:stylistId/portfolio", verifyStylist, authenticate, (req, res) => {
	const id = req.params.stylistId;

	Stylists.getPortfolio(id)
		.then(portfolio => res.status(200).json(portfolio))
		.catch(err => res.status(500).json(err));
});

//Allows a stylist to add a new image post
router.post("/:stylistId/portfolio", authenticate, verifyPostData, (req, res) => {
	const post = req.body;

	Stylists.addPost(post)
		.then(post => res.status(200).json(post))
		.catch(err => {
			console.log(err);
			res.status(500).json(err);
		});
});

//Update an image post
router.put("/:stylistId/portfolio/:postId",verifyStylist, authenticate, verifyPost, (req, res) => {
	const id = req.params.postId;
	const update = req.body;

	Stylists.updatePost(id, update)
		.then(post => res.status(200).json(post))
		.catch(err => res.status(500).json(err));
});

//Delete an image post
router.delete("/:stylistId/portfolio/:postId", authenticate,verifyStylist, (req, res) => {
	const id = req.params.postId;

	Stylists.deletePost(id)
		.then(post => res.status(200).json(post))
		.catch(err => res.status(500).json(err));
});

function signToken(user) {
	const payload = {
		subject: user.id,
		username: user.username
	};

	const options = {
		expiresIn: "7d"
	};

	return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;
