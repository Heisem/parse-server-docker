'use strict';

const { ParseRest } = require('../helpers')
const { appId, masterKey } = require('../config');

module.exports = class User {

    constructor(user) {
        this.username = user.username;
        this.createdAt = user.createdAt;
        this.updatedAt = user.updatedAt;
        this.emailVerified = user.emailVerified;
        this.ACL = user.ACL;
        this.__type = user.__type;
        this.className = user.className;
        this.sessionToken = user.sessionToken;
        this.objectId = user.objectId;
    }

    static logIn(req, res) {
        const { username, password } = req.body;

        Parse.User.logIn(username, password).then(
            (user) => {
                res.send({
                    user,
                    appId,
                    masterKey,
                });
            },
            (user, error) => {
                res.status(401).send({
                    user,
                    error
                });
            }
        );
    }

    static logOut(req, res) {
        const parseRest = new ParseRest(req);
        parseRest.post('/logout').then(
            (response) => res.send(response),
            (error) => res.status(400).send(error)
        );
    }

};
