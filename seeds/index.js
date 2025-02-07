const mongoose = require('mongoose');
const CampGround=require('../models/campground')
const cities=require('./cities')
const {places,descriptors}=require('./seedHelpers')
// Connect to MongoDB

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')
    .then(() => {
        console.log("MongoDB connection open");
    })
    .catch(e => {
        console.error("MongoDB connection error:", e);
    });
    const sample=array=>array[Math.floor(Math.random()*array.length)]
const seedDB=async()=>{
    await CampGround.deleteMany({})
    const price1=Math.floor(Math.random()*20)+10
    for(let i=0;i<50;i++){
        const random1000=Math.floor(Math.random()*1000)
        const camp=new CampGround({
            
            author:'679a641bb6db7dfa972fd4bd',
            location:`${cities[random1000].city},${cities[random1000].state}`,
            title:`${sample(descriptors)} ${sample(places)}`,
            image: [
                {
                  Url: 'https://res.cloudinary.com/dvk5hnyrv/image/upload/v1738589533/yelcamp/ltoczlgrv4grjw089a0j.png',
                  filename: 'yelcamp/ltoczlgrv4grjw089a0j',
                },
                {
                  Url: 'https://res.cloudinary.com/dvk5hnyrv/image/upload/v1738758977/yelcamp/d5wi0y86kglvezokhft7.png',
                  filename: 'yelcamp/d5wi0y86kglvezokhft7',
                }
              ],
              geometry: {
                type: 'Point',
                coordinates: [cities[random1000].longitude ,cities[random1000].latitude]  
              },
            description:"wkdowodbqyshqhikpam    I0ONZX0IOQJSIBCUHCOLMA  OC[PKAXOQAIHQACJOJ AJCIJCOKOCWOIJJIJSSSIKSIK", 
            price:price1
        })
        await camp.save()
    }
}
seedDB()