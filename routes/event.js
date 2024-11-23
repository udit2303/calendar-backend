const express = require('express');
const router = express.Router();
const { getEvents, createEvent, updateEvent, getEventsByMonthAndYear, getEventById, deleteEvent} = require('../controllers/eventController'); // Import the event controller

// GET /events - Get all events for the authenticated user
router.get('/', getEvents);

// GET /events?month=5&year=2023 - Get events for a specific month and year
router.get('/month', getEventsByMonthAndYear);

// GET /events/:id - Get a single event by ID
// router.get('/:id', eventController.getEventById);

// POST /events - Add a new event
router.post('/', createEvent);

// PUT /events/:id - Update an existing event
router.put('/:id', updateEvent);
router.get('/:id', getEventById);
router.delete('/:id', deleteEvent);
// DELETE /events/:id - Delete an event by ID
// router.delete('/:id', eventController.deleteEvent);

module.exports = router;
