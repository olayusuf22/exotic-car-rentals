const express = require('express');
const router = express.Router();
const Reservation = require('../models/reservation');

// READ: Display reservation page for a car
router.get('/cars/:id/reservations', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    res.render('reservations/new.ejs', { car });
  } catch (err) {
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
    res.status(500).send('Error retrieving data');
  }
});

// this is a  user reservations index
router.get('/reservations', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    res.render('reservations/new.ejs', { car });
  } catch (err) {
    res.status(500).send('Error retrieving data');
  }
});


module.exports = router;