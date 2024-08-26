const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const reservationSchema = new Schema({
    pickupDate: {type: Date, required: true},
    returnDate: {type: Date, required: true},
    user: {type: Schema.Types.ObjectId,ref:"User", required: true},
}, {
    timestamps: true
})

const carSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: false },
  price: { type: Number, required: true },
  currency: { type: String, required: true },
  city: { type: String, required: true },
  reservations: [reservationSchema]
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
