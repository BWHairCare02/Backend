const { Stylists } = require('../stylists/stylist-model');

module.exports = (req, res, next) => {
    const stylistId = req.params.stylistId;

    Stylists.findById(stylistId)
        .then(stylist => {
            if (!stylist) {
                res.status(404).json({ error: "Invalid stylist ID. Stylist not found." })
            } else {
                next();
            }
        })
        .catch(() => res.status(500).json({ error: "There was an error finding the stylist." }))
}