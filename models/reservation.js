const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const reservationSchema = new Schema({
    pickupDate: {type: Date, required: true},
    returnDate: {type: Date, required: true},
    user: {type: Schema.Types.ObjectId,ref:"User", required: true},
    car: {type: Schema.Types.ObjectId,ref:"Car", required: true},
}, {
    timestamps: true
})

module.exports = mongoose.model("Reservation", reservationSchema)