"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcryptjs");
const express_1 = require("express");
const jwt = require("jsonwebtoken");
const shared_middlewares_1 = require("./shared-middlewares");
const constants_1 = require("./constants");
/**
 * Validate email and password
 */
const validate = ({ required }) => (req, res, next) => {
    const { user_email, user_password } = req.body;
    if (required && (!user_email || !user_email.trim() || !user_password || !user_password.trim())) {
        res.status(400).jsonp('信箱及密碼需要輸入');
        return;
    }
    if (user_email && !user_email.match(constants_1.EMAIL_REGEX)) {
        res.status(400).jsonp('信箱格式驗證失敗');
        return;
    }
    if (user_password && user_password.length < constants_1.MIN_PASSWORD_LENGTH) {
        res.status(400).jsonp('密碼請超過4碼');
        return;
    }
    next();
};
/**
 * Register / Create a user
 */
const create = (req, res, next) => {
    const _a = req.body, { user_email, user_password } = _a, rest = __rest(_a, ["user_email", "user_password"]);
    console.log('create');
    console.log(req.body);

    const { db } = req.app;
    if (db == null) {
        // json-server CLI expose the router db to the app
        // (https://github.com/typicode/json-server/blob/master/src/cli/run.js#L74),
        // but if we use the json-server module API, we must do the same.
        throw Error('You must bind the router db to the app');
    }
    const existingUser = db.get('usersData').find({ user_email }).value();

    if (existingUser) {
        res.status(400).jsonp('此信箱已被註冊');
        return;
    }
    bcrypt
        .hash(user_password, constants_1.SALT_LENGTH)
        .then((hash) => {
            try {
                return db
                    .get('usersData')
                    .insert(Object.assign({ user_email, user_password: hash }, rest))
                    .write();
            }
            catch (error) {
                console.log(error);
                throw Error('You must add a "usersData" collection to your db');
            }
        })
        .then((user) => {
            return new Promise((resolve, reject) => {
                jwt.sign({ user_email }, constants_1.JWT_SECRET_KEY, { expiresIn: constants_1.JWT_EXPIRES_IN, subject: String(user.id) }, (error, accessToken) => {
                    if (error)
                        reject(error);
                    else
                        resolve({ accessToken: accessToken, user });
                });
            });
        })
        .then(({ accessToken, user }) => {
            const { user_password: _ } = user, userWithoutPassword = __rest(user, ["user_password"]);
            res.status(201).jsonp({ accessToken, user: userWithoutPassword });
        })
        .catch(next);
};
/**
 * Login
 */
const login = (req, res, next) => {
    const { user_email, user_password } = req.body;
    console.log(user_email, user_password);

    const { db } = req.app;
    if (db == null) {
        throw Error('You must bind the router db to the app');
    }
    const user = db.get('usersData').find({ user_email }).value();
    console.log(user);

    if (!user) {
        res.status(400).jsonp('查無此帳號，請先註冊');
        return;
    }
    bcrypt
        .compare(user_password, user.user_password)
        .then((same) => {
            console.log(user_password, user.user_password);

            if (!same) {
                throw 401;
            }
            return new Promise((resolve, reject) => {
                jwt.sign({ user_email }, constants_1.JWT_SECRET_KEY, { expiresIn: constants_1.JWT_EXPIRES_IN, subject: String(user.id) }, (error, accessToken) => {
                    if (error)
                        reject(error);
                    else
                        resolve(accessToken);
                });
            });
        })
        .then((accessToken) => {
            const { password: _ } = user, userWithoutPassword = __rest(user, ["user_password"]);
            res.status(200).jsonp({ accessToken, user: userWithoutPassword });
        })
        .catch((err) => {
            if (err === 400)
                res.status(400).jsonp('密碼錯誤，請重新確認');
            else
                next(err);
        });
};

/**
 * Patch and Put user
 */
// TODO: create new access token when password or email changes
const update = (req, res, next) => {
    const { user_password } = req.body;
    if (!user_password) {
        next(); // Simply continue with json-server router
        return;
    }
    bcrypt
        .hash(user_password, constants_1.SALT_LENGTH)
        .then((hash) => {
            req.body.user_password = hash;
            next();
        })
        .catch(next);
};
/**
 * Users router
 */
// Must match routes with and without guards
exports.default = express_1.Router()
    .use(shared_middlewares_1.bodyParsingHandler)
    .post('/usersData|register|signup', validate({ required: true }), create)
    .post('/[640]{3}/usersData', validate({ required: true }), create)
    .post('/login|signin', validate({ required: true }), login)
    .put('/usersData/:id', validate({ required: true }), update)
    .put('/[640]{3}/usersData/:id', validate({ required: true }), update)
    .patch('/usersData/:id', validate({ required: false }), update)
    .patch('/[640]{3}/usersData/:id', validate({ required: false }), update)
    .use(shared_middlewares_1.errorHandler);
