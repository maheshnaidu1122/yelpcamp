const mongoose = require('mongoose');
const Reviews = require('./reviews'); // Assuming the reviews model is in the 'reviews.js' file
const ImageSchema=new mongoose.Schema({
      Url:String,
      filename:String
})
ImageSchema.virtual('thumbnail').get(function(){
  return this.Url.replace('/upload','/upload/w_200');
})
const opts={toJSON:{virtuals:true}};
// Define the schema for Campground
const campgroundSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  geometry: {
    type: {
        type: String,
        enum: ['Point'],
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
},
  price: Number,
  image:[ImageSchema] ,
  description: String,
  location: String,
  author:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Reviews'  
    }
  ]
},opts);
campgroundSchema.virtual('properties.popUpMark').get(function(){
  return `<strong><a href="/campground/${this._id}">${this.title}</a></strong>
  <p>${this.description.substring(0,20)}...`;
})
// Post middleware for findOneAndDelete
campgroundSchema.post('findOneAndDelete', async function(doc) {
  if (doc) {
      await Reviews.deleteMany({
        _id: { $in: doc.reviews }
      });
}
});

// Create the model using the schema
const Campground = mongoose.model('Campground', campgroundSchema);

module.exports = Campground;
