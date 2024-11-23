const { Event, User } = require("../models");
const { Op } = require("sequelize");
const { scheduleReminder } = require('../utils/scheduleService');

const getEvents = async (req, res) => {
  try {
    const userEmail = req.user.email; 
    const events = await Event.findAll({
      where: {
        userEmail: userEmail,
      },
    });


    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching events', error: error.message });
  }
};

const createEvent = async (req, res) => {
  try {
    const userEmail = req.user.email; 
    const { title, date, time, endTime, description } = req.body;

    if (!title || !date || !time || !endTime) {
      return res.status(400).json({ message: 'Title, date, time, and endTime are required' });
    }

    const event = await Event.create({
      title,
      date,
      time,
      endTime,
      description,
      userEmail,
    });
    scheduleReminder(userEmail, event);

    res.status(201).json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating event', error: error.message });
  }
};

const updateEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const userEmail = req.user.email; 
    const { title, date, time, endTime, description } = req.body;

    const event = await Event.findByPk(eventId);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.userEmail !== userEmail) {
      return res.status(403).json({ message: 'Unauthorized to update this event' });
    }

    await event.update({
      title,
      date,
      time,
      endTime,
      description,
    });

    res.status(200).json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating event', error: error.message });
  }
};

const getEventsByMonthAndYear = async (req, res) => {
  try {
    const userEmail = req.user.email;
    const { month, year } = req.query;
    if (!month || !year) {
      return res.status(400).json({ message: 'Month and year are required' });
    }

    const events = await Event.findAll({
      where: {
        userEmail: userEmail,
        date: {
          [Op.between]: [
            new Date(`${year}-${month}-01`),
            new Date(`${year}-${month}-31`),
          ],
        },
      },
    });
    
   
    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching events by month and year', error: error.message });
  }
};
const getEventById = async (req, res) => {
  try {
    const userEmail = req.user.email;
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ message: 'id is required' });
    }

    const event = await Event.findAll({
      where: {
        userEmail: userEmail,
        id
      },
    });
    
   
    res.status(200).json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching event', error: error.message });
  }
};
const deleteEvent = async (req, res) => {
  try {
    console.log(req.params)
    const userEmail = req.user.email; // Get the authenticated user's email from req.user
    const id = parseInt(req.params.id); // Get the event ID from query params

    if (!id) {
      return res.status(400).json({ message: 'Event ID is required' });
    }

    // Fetch the event from the database by both id and userEmail
    const event = await Event.findOne({
      where: {
        id,
        userEmail
      }
    });

    if (!event) {
      return res.status(404).json({ message: 'Event not found or you do not have permission to delete this event' });
    }

    // Proceed to delete the event
   await event.destroy();

    // Respond with a success message
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting event', error: error.message });
  }
};

module.exports = { getEvents, createEvent, updateEvent, getEventsByMonthAndYear, getEventById, deleteEvent };
