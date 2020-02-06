const Stylists = require("../stylists/stylist-model");

module.exports = (req, res, next) => {
    Stylists.findByUsername(req.body.username)
        .then(user => {
            if (user) {
                res.status(400).json({ error: "This username is already taken." })
            } else {
                next();
            }
        })
}