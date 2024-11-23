const { Event, User } = require('../models');
const { Op } = require('sequelize');
const { sendEventReminder } = require('../utils/emailService'); // Use emailService

// Function to fetch upcoming events and send reminders
const sendReminders = async () => {
  try {
    // Get the current date and time
    const now = new Date();

    // Set the reminder threshold (e.g., 1 hour before the event)
    const reminderThreshold = new Date(now.getTime() + 60 * 60 * 1000);

    // Fetch events happening within the next hour
    const events = await Event.findAll({
      where: {
        date: {
          [Op.eq]: now.toISOString().split('T')[0], // Same day
        },
        time: {
          [Op.lte]: reminderThreshold.toISOString().split('T')[1], // Within 1 hour
          [Op.gte]: now.toISOString().split('T')[1], // In the future
        },
      },
      include: [
        {
          model: User,
          as: 'user', // Include user data for the email
        },
      ],
    });

    // Loop through events and send emails using the emailService
    for (const event of events) {
      const { title, date, time, description, user } = event;
      if (!user) continue; // Ensure the user exists

      // Call the email service to send the reminder
      await sendEventReminder(user.email, { title, date, time, description });
    }
  } catch (error) {
    console.error('Error sending reminders:', error.message);
  }
};

module.exports = { sendReminders };
