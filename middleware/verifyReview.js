const Customers = require("../customers/customer-model");

module.exports = (req, res, next) => {
    const reviewId = req.params.reviewId;

    Customers.findReviewById(reviewId)
        .then(review => {
            if (!review) {
                res.status(404).json({ error: "Invalid review ID: Review not found."})
            } else {
                next();
            }
        })
        .catch(() => res.status(500).json({ error: "There was an error finding the review."}))
}