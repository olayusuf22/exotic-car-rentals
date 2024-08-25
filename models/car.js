const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const carSchema = new Schema({
    carModel: {
        type: String, 
        required: true, 
    }, 
    year: {
        type: Number,
        required: true,
    }, 
    fastCars: {
        type: String, 
        enum: [
            'Exotic Sports Car', 
            'Convertible', 
            'Coupe', 
            'High-Performance',
            'Luxury Coupe',
        ],
        required: true,
    }, 
    pricePerDay: {
        type: Number, 
        required: true,
    },
    availabilityStatus: {
        type: Boolean,
        default: true,
    }, 
    image: {
        type: String, 
        required: false,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true, 
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Car', carSchema);
