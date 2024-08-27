const express = require('express');
const router = express.Router();
const Reservation = require('../models/reservation');
const Car = require('../models/car');

// Display reservation page for a car
router.get('/cars/:id/reservations', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    res.render('reservations/new.ejs', { car });
  } catch (err) {
    console.log(err)
    res.status(500).send('Error retrieving data');
  }
});

// create a reservation for a car
router.post('/cars/:id/reservations', async (req, res) => {
  try {
    req.body.user = req.user._id;
    req.body.car = req.params.id;
    await Reservation.create(req.body)
    res.redirect('/reservations' );
  } catch (err) {
    console.log(err)
    res.status(500).send('Error retrieving data');
  }
});

// this is a  user reservations index
router.get('/reservations', async (req, res) => {
  try {
    const reservations = await Reservation.find({user:  req.user._id}).populate("car")
    res.render('reservations/index.ejs', { reservations });
  } catch (err) {
    res.status(500).send('Error retrieving data');
  }
});

// This is delete reservation
router.delete('/reservations/:id', async (req, res) => {
  try {
    await Reservation.findByIdAndDelete(req.params.id)
    res.redirect('/reservations')
  } catch (err) {
    res.status(500).send('Error retrieving data');
  }
});

// This is update car from inventory
router.put('/:carId', async (req, res) => {
  const updateCar = await Car.findByIdAndUpdate({_id: req.params.carId}, req.body, {new: true});
  res.redirect(`/cars/${updateCar._id}`);
});


module.exports = router;