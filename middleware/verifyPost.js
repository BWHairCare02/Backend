const Stylists = require("../stylists/stylist-model");

module.exports = (req, res, next) => {
    const postId = req.params.postId;

    Stylists.findPostById(postId)
        .then(post => {
            if (!post) {
                res.status(404).json({ error: "Invalid post ID: Portfolio post not found."})
            } else {
                next();
            }
        })
        .catch(() => res.status(500).json({ error: "There was an error finding the post."}))
}