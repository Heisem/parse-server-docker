'use strict';

const express = require('express');
const { ParseServer } = require('parse-server');
const bodyParser = require('body-parser');

const { apiVersion, parse } = require('./config');
const { NODE_ENV, PORT } = process.env;
const { User } = require('./api');
const { Auth } = require('./middleware');
const app = express();
const api = new ParseServer(parse);

app.use(bodyParser.json());

// Parse Server Endpoint
app.use(parse.mountPath, api);

app.post(`/api/${apiVersion}/login`, User.logIn);

app.get(`/api/${apiVersion}/logout`, Auth.isAuthenticated, User.logOut);

app.get(`/api/${apiVersion}/users/me`, Auth.isAuthenticated, (req, res) => res.send(req.User));

app.get(`/api/${apiVersion}/ports`, (req, res) => res.send(PORT));

app.listen(PORT || 1337, () => console.log(`parse-server running on port ${PORT || 1337}`));
