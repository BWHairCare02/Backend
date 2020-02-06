module.exports = (req, res, next) => {
    const login = req.body;

    if (!login.username || !login.password ) {
        res.status(400).json({ error: "Login requires a username and password." })
    } else {
        next();
    }
}