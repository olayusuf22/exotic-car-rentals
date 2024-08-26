const express = require('express');
const router = express.Router();
const ensureLoggedIn = require('../middleware/ensureLoggedIn');
const Car = require('../models/car');

// all paths start with '/cars'

// GET /cars --> INDEX FUNCTIONALITY
router.get('/', ensureLoggedIn, async (req, res) => {
  const cars = await Car.find({ owner: req.user._id }).populate('owner');
  res.render('cars/index.ejs', { cars });
});

// GET /cars/new --> NEW FUNCTIONALITY 
router.get('/new', ensureLoggedIn, (req, res) => {
  const types = Car.schema.path('type').enumValues;
  res.render('cars/new.ejs', { types });
});

// GET /cars/:carId --> SHOW FUNCTIONALITY 
router.get('/:carId', async (req, res) => {
  const car = await Car.findById(req.params.carId).populate('owner');
  res.render('cars/show.ejs', { car });
});

// GET /cars/:carId/edit --> EDIT FUNCTIONALITY
router.get('/:carId/edit', ensureLoggedIn, async (req, res) => {
  const car = await Car.findById(req.params.carId);
  const types = Car.schema.path('type').enumValues;
  res.render('cars/edit.ejs', { car, types });
});

// POST /cars --> CREATE FUNCTIONALITY 
router.post('/', ensureLoggedIn, async (req, res) => {
  try {
    req.body.owner = req.user._id;
    await Car.create(req.body);
  } catch (error) {
    console.log(error);
  }
  res.redirect('/cars');
});

// DELETE /cars/:carId --> DELETE FUNCTIONALITY 
router.delete('/:carId', ensureLoggedIn, async (req, res) => {
  await Car.findByIdAndDelete(req.params.carId);
  res.redirect('/');
});

// UPDATE /cars/:carId --> UPDATE FUNCTIONALITY 
router.put('/:carId', ensureLoggedIn, async (req, res) => {
  const updateCar = await Car.findByIdAndUpdate({ _id: req.params.carId }, req.body, { new: true });
  res.redirect(`/cars/${updateCar._id}`);
});



module.exports = router;
