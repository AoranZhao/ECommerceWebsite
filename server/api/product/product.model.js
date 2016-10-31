'use strict';

import mongoose from 'mongoose';

var ProductSchema = new mongoose.Schema({
	title: {
		type: String
	},
	price: {
		type: Number,
		default: 0.00
	},
	quantity: {
		type: Number,
		default: 0
	},
	description: {
		type: String
	},
	imageBin: {
		type: Buffer,
		contentType: String
	},
	imageUrl: {
		type: String,
		default: 'http://placehold.it/300x200'
	},
	created_date: {
		type: Date,
		default: Date.now
	}
})

// var ProductSchema = new mongoose.Schema({
//   name: String,
//   info: String,
//   active: Boolean
// });

export default mongoose.model('Product', ProductSchema);
