(async function() {
const carData = [
    {
        name: "lamborghini", 
        image: 'https://wallpapers.com/images/high/lamborghini-urus-4096-x-2304-wallpaper-j6gdm7kkcrqznfso.webp',
        price: 2000,
        currency: "usd",
        city: "Dallas, Houston, Los angeles, Miami, Las vegas, Newyork, Tampa"
    },

    {
        name: "ferrari", 
        image: 'https://wallpapers.com/images/high/caption-ravishing-beauty-and-power-the-ferrari-488-gtb-cep3ecci7dc8xb1y.webp',
        price: 2000,
        currency: "usd",
        city: "Dallas, Houston, Los angeles, Miami, Las vegas, Newyork, Tampa"
    },

    {
        name: "rolls-royce", 
        image: 'https://wallpapers.com/images/high/rolls-royce-1920-x-1080-background-nx24f72uget7wq3q.webp',
        price: 2000,
        currency: "usd",
        city: "Dallas, Houston, Los angeles, Miami, Las vegas, Newyork, Tampa"
    },

    {
        name: "bugatti", 
        image: 'https://wallpapers.com/images/high/bugatti-background-q8pxjgcwj7usezp9.webp',
        price: 2000,
        currency: "usd",
        city: "Dallas, Houston, Los angeles, Miami, Las vegas, Newyork, Tampa"
    },

    {
        name: "mercedes-amg", 
        image: 'https://wallpapers.com/images/high/mercedes-amg-background-kqt8sc4q8ec5gvo7.webp',
        price: 2000,
        currency: "usd",
        city: "Dallas, Houston, Los angeles, Miami, Las vegas, Newyork, Tampa"
    },


    {
        name: "lamborghini-aventador", 
        image: 'https://wallpapers.com/images/high/stylish-lamborghini-aventador-in-vibrant-sunset-ixa2ov4a8iegwsoo.webp',
        price: 2000,
        currency: "usd",
        city: "Dallas, Houston, Los angeles, Miami, Las vegas, Newyork, Tampa"
    },

]
    


const mongoose = require("mongoose");

require("dotenv").config();
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

const Car = require('./models/car')
await Car.deleteMany({})
const cars = await Car.create(carData)
console.log (cars)
process.exit()
})()