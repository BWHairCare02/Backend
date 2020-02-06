const Customers = require("../customers/customer-model");

module.exports = (req, res, next) => {
	const customerId = req.params.customerId;

	Customers.findById(customerId)
		.then(customer => {
			if (!customer) {
				res
					.status(404)
					.json({ error: "Invalid customer ID: Customer not found." });
			} else {
				next();
			}
		})
		.catch(() =>
			res
				.status(500)
				.json({ error: "There was an error finding the customer." })
		);
};
