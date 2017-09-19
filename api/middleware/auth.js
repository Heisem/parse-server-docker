'use strict';

const { ParseRest } = require('../helpers');
const { User } = require('../api');

module.exports = class Auth {

    // Verify sessionToken
    static isAuthenticated(req, res, next) {
        const parseRest = new ParseRest(req);
        parseRest.get('/users/me').then(
            (user) => {
                const parseUser = new User(user);
                req.User = parseUser;
                return next();
            },
            (error) => res.status(401).send(error)
        );
    }

};
