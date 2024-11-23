const schedule = require('node-schedule');
const { sendEventReminder } = require('./emailService');

/**
 * Schedule a reminder for an event 30 minutes before its start time.
 * @param {string} userEmail - Email address of the user
 * @param {Object} event - Event details (title, date, time, etc.)
 */
const scheduleReminder = (userEmail, event) => {
  try {
    const { date, time } = event;

    // Combine the event's date and time into a Date object
    const eventTime = new Date(`${date}T${time}`);

    // Calculate the reminder time (30 minutes before the event)
    const reminderTime = new Date(eventTime.getTime() - 30 * 60 * 1000);

    // Check if the reminderTime is valid and in the future
    if (isNaN(reminderTime) || reminderTime < new Date()) {
      console.error('Invalid or past reminder time:', reminderTime);
      return;
    }

    // Schedule the reminder
    schedule.scheduleJob(reminderTime, async () => {
      try {
        console.log(
          `Sending reminder to ${userEmail} for event "${event.title}" at ${reminderTime}`
        );
        await sendEventReminder(userEmail, event); // Use async/await for consistency
      } catch (error) {
        console.error('Error during scheduled job execution:', error.message);
      }
    });

    console.log(
      `Reminder scheduled for ${userEmail} on ${reminderTime} (30 minutes before event).`
    );
  } catch (error) {
    console.error('Error scheduling reminder:', error.message);
  }
};

module.exports = { scheduleReminder };
