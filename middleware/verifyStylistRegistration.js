const { Stylists } = require("../stylists/stylist-model");

module.exports = (req, res, next) => {
	const register = req.body;
	const stylist = req.body.username;

	if (
		!register.username ||
		!register.password ||
		!register.location ||
		!register.email
	) {
		res.status(400).json({
			error:
				"Please review your registration again. A username, password, location and email address are required."
		});
	} else if (stylist) {
		Stylists.findBy(stylist)
			.then(stylist => {
				if (!stylist) {
					next();
				} else {
					res.status(400).json({
						error: "Please choose another username. This one is taken."
					});
				}
			})
			.catch(() =>
				res
					.status(500)
					.json({ error: "There was an error finding the customer." })
			);
	}
}
