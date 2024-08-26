const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: false },
  price: { type: Number, required: true },
  currency: { type: String, required: true },
  city: { type: String, required: true },
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
