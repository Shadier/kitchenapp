'use strict'

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ItemSchema = Schema({
	description: String,
    turn: Number,
    checked: Boolean
});

module.exports = mongoose.model('Item', ItemSchema);