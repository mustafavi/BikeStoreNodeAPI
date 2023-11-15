const jwt = require('jsonwebtoken');

module.exports = {
    authenticate: (req, res, next) => {
        const headers = req.headers['authorization'];
        const token = headers && headers.split(' ')[1];
        if (token === undefined) {
            res.status(401).send();
        } else {
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
                if (err) {
                    return res.status(403).send();
                } else {
                    // we got a vlid token
                    req.user = user;
                    next();
                }
            });
        }

    }
};
