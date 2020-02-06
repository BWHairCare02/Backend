module.exports = (res, req, next) => {
    const post = req.body;

    if (!post.description || !post.image || !post.stylist_id) {
        res.status(400).json({ error: "Portfolio posts are required to have a description, image, and stylist ID." })
    } else {
        next();
    }
}