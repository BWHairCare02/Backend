const Customers = require("../customers/customer-model");

module.exports = (req, res, next) => {
    Customers.findByUsername(req.body.username)
        .then(user => {
            if (user) {
                res.status(400).json({ error: "This username is already taken." })
            } else {
                next();
            }
        })
}