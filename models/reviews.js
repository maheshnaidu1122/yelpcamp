const mongoose = require('mongoose');

// Define the schema for Review
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    body: String,
    rating: Number,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

// Create the model using the schema
const Reviews = mongoose.model('Reviews', reviewSchema);

module.exports = Reviews;
