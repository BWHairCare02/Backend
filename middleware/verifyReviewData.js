module.exports = (res, req, next) => {
    const review = req.body;

    if (!review.description || !review.rating || !review.customer_id || !review.stylist_id) {
        res.status(400).json({ error: "Reviews require a description, rating, customer ID, and stylist ID." })
    } else {
        next();
    }
}