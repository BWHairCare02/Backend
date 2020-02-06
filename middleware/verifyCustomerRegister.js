const Customers = require("../customers/customer-model");

module.exports = (req, res, next) => {
	const register = req.body;
	const customer = req.body.username;

	if (
		!register.username ||
		!register.password ||
		!register.location ||
		!register.email
	) {
		res.status(400).json({
			error:
				"Customer registration requires username, password, location, and email. Verify all are filled"
		});
	} else if (customer) {
		Customers.findBy(customer)
			.then(customer => {
				if (!customer) {
					next();
				} else {
					res
						.status(400)
						.json({ error: "That customer username is already taken." });
				}
			})
			.catch(() =>
				res
					.status(500)
					.json({ error: "There was an error finding the customer." })
			);
	}
};
