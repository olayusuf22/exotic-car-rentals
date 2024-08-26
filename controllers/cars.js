const express = require('express');
const router = express.Router();
const Car = require('../models/car');

// CREATE: Show form to add a new car
router.get('/new', (req, res) => {
  res.render('car-form', { car: {} });
});

// CREATE: Handle the form submission to add a new car
router.post('/', async (req, res) => {
  try {
    const newCar = new Car(req.body);
    await newCar.save();
    res.redirect('/cars');
  } catch (err) {
    res.status(400).send('Unable to save data');
  }
});

// READ: Display all cars (Inventory page)
router.get('/', async (req, res) => {
  try {
    const cars = await Car.find({});
    res.render('cars/index.ejs', { cars });
  } catch (err) {
    console.log(err)
    res.status(500).send(err);
  }
});

// READ: Display a single car's details
router.get('/:id', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    res.render('car-detail', { car });
  } catch (err) {
    res.status(500).send('Error retrieving data');
  }
});

// UPDATE: Show form to edit an existing car
router.get('/:id/edit', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    res.render('car-form', { car });
  } catch (err) {
    res.status(500).send('Error retrieving data');
  }
});

// UPDATE: Handle form submission to update an existing car
router.post('/:id', async (req, res) => {
  try {
    await Car.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/cars');
  } catch (err) {
    res.status(400).send('Unable to update data');
  }
});

// DELETE: Remove a car from the inventory
router.post('/:id/delete', async (req, res) => {
  try {
    await Car.findByIdAndRemove(req.params.id);
    res.redirect('/cars');
  } catch (err) {
    res.status(500).send('Error deleting data');
  }
});

module.exports = router;