(async function() {
const carData = [
    {
        name: "lamborghini", 
        image: 'https://wallpapers.com/images/high/lamborghini-urus-4096-x-2304-wallpaper-j6gdm7kkcrqznfso.webp',
        price: 2000,
        currency: "usd",
        city: "Dallas"
    },

    {
        name: "ferrari", 
        image: 'https://wallpapers.com/images/high/caption-ravishing-beauty-and-power-the-ferrari-488-gtb-cep3ecci7dc8xb1y.webp',
        price: 2000,
        currency: "usd",
        city: "Dallas"
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