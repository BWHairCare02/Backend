const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authenticate = require('./authenticate-middleware')
const Customers = require("./customer-model");

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

router.post("/login", (req, res) => {
	let { username, password } = req.body;

	Customers.findBy({ username })
		.first()
		.then(user => {
			if (user && bcrypt.compareSync(password, user.password)) {
				const token = signToken(user);

				res.status(200).json({
					token, user: user,
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

router.get("/:id", authenticate, (req, res) => {
	const id = req.params.id;
	const requestOptions = {
		headers: { accept: 'application/json' },
	  };

	Customers.findById(id)
		.first()
		.then(user => {
			if (user && bcrypt.compareSync(password, user.password)) {
				const token = signToken(user);

				res.status(200).json({
					token,
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

const signToken = user => {
	const payload = {
		username: user.username
	};

	const secret = process.env.JWT_SECRET || "FLCL is not rewatchable. Fight me.";

	const options = {
		expiresIn: "1h"
	};

	return jwt.sign(payload, secret, options);
};

module.exports = router;