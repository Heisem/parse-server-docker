'use strict';

module.exports = {
    development: {
        apiVersion: 1,
        parse: {
            databaseURI: 'mongodb://api-mongo-dev:27017/Api_dev', // Connection string for your MongoDB database
            // databaseURI: `postgres://postgres:password@api-postgres:5432/api`,
            appId: 'apiIdDEV',
            masterKey: 'masterKeyDEV', // Keep this key secret!
            serverURL: `http://localhost:${process.env.PORT || 1337}/parse/1`, // Don't forget to change to https if needed
            mountPath: '/parse/1'
        }
    },
    production: {
        apiVersion: 1,
        parse: {
            databaseURI: 'mongodb://api-mongo-prod:27017/Api_prod', // Connection string for your MongoDB database
            // databaseURI: `postgres://postgres:password@api-postgres:5432/api`,
            appId: 'apiIdPROD',
            masterKey: 'masterKeyPROD', // Keep this key secret!
            serverURL: `http://localhost:${process.env.PORT || 1337}/parse/1`, // Don't forget to change to https if needed
            mountPath: '/parse/1'
        }
    }
}[process.env.NODE_ENV];
