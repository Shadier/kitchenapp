'use strict'

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Report  = require('./report').schema

const TagteamSchema = Schema({
	date: Date,
	userMorning: String,
	userAfternoon: String,
});

module.exports = mongoose.model('Tagteam', TagteamSchema);