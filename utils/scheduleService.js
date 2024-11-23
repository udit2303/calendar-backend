const schedule = require('node-schedule');
const { sendEventReminder } = require('./emailService');

/**
 * Schedule a reminder for an event, 30 minutes before the event time
 * @param {string} userEmail - Email address of the user
 * @param {Object} event - Event details (title, date, time, etc.)
 */
const scheduleReminder = (userEmail, event) => {
  try {
    const { date, time } = event;

    // Construct the event time (combine date and time)
    const eventTime = new Date(`${date}T${time}`);

    // Check if the eventTime is valid
    if (isNaN(eventTime)) {
      console.error('Invalid event time:', eventTime);
      return;
    }

    // Calculate the reminder time (30 minutes before the event)
    const reminderTime = new Date(eventTime.getTime() - 30 * 60 * 1000); // Subtract 30 minutes

    // Check if the reminderTime is in the future
    if (reminderTime < new Date()) {
      console.error('Reminder time is in the past:', reminderTime);
      return;
    }

    // Schedule the job for the reminder
    schedule.scheduleJob(reminderTime, async () => {
      try {
        console.log(`Sending reminder to ${userEmail} for event "${event.title}" at ${reminderTime}`);
        await sendEventReminder(userEmail, event); // Use async/await for consistency
      } catch (error) {
        console.error('Error during scheduled job execution:', error.message);
      }
    });

    console.log(`Reminder scheduled for ${userEmail} on ${reminderTime}`);
  } catch (error) {
    console.error('Error scheduling reminder:', error.message);
  }
};

module.exports = { scheduleReminder };
