module.exports = (req, res, next) => {
	const register = req.body;

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
	} else {
		next();
	}
}
