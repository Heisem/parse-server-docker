const rp = require('request-promise');
const { parse } = require('../config');
const { NODE_ENV } = process.env;

module.exports = class ParseRest {

    constructor(req) {
        this.headers = {
            'X-Parse-Session-Token': req.header('sessionToken') || (req && req.User && req.User.sessionToken),
            'X-Parse-Application-Id': parse.appId,
            'X-Parse-Master-Key': parse.masterKey,
            'Content-Type': 'application/json'
        };
        this.json = true;
    }

    get(uri) {
        this.uri = parse.serverURL + uri;
        this.method = 'GET';
        return rp(this).then(this.successHandler, this.errorHandler);
    }

    post(uri, body) {
        this.uri = parse.serverURL + uri;
        this.method = 'POST';
        this.body = body;
        return rp(this).then(this.successHandler, this.errorHandler);
    }

    put(uri, body) {
        this.uri = parse.serverURL + uri;
        this.method = 'PUT';
        this.body = body;
        return rp(this).then(this.successHandler, this.errorHandler);
    }

    delete(uri) {
        this.uri = parse.serverURL + uri;
        this.method = 'DELETE';
        return rp(this).then(this.successHandler, this.errorHandler);
    }

    successHandler(res) {
        return Promise.resolve(res);
    }

    errorHandler(error) {
        /* WARNING:
         * Returning raw response exposes appId and masterKey during errors
         * this implementation locks raw error only for dev mode
         */
        if (NODE_ENV == 'development')
            return Promise.reject(error);
        return Promise.reject(error.error);
    }

};
