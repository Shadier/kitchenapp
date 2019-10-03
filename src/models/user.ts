'use strict'

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Report  = require('./report').schema

const UserSchema = Schema({
	name: String,
    lastname: String,
    email: String,
    password: String,
    role: String,
    status:Boolean,
    userIA: Boolean,
    monday: Boolean,
    tuesday: Boolean,
    wednesday: Boolean,
    thursday: Boolean,
    friday: Boolean,
    last_partner: String,
    last_day: Number
});

module.exports = mongoose.model('User', UserSchema);