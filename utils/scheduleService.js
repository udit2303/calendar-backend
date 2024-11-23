const schedule = require('node-schedule');
const { sendEventReminder } = require('./emailService');

const scheduleReminder = (userEmail, event) => {
  try {
    const { date, time } = event;

    const eventDateTime = new Date(`${date.toISOString().split('T')[0]}T${time}Z`);  
    if (isNaN(eventDateTime)) {
      console.error('Invalid event time:', eventDateTime);
      return;
    }

    const reminderTime = new Date(eventDateTime.getTime() - 30 * 60 * 1000); // Subtract 30 minutes

    if (reminderTime < new Date()) {
      console.error('Reminder time is in the past:', reminderTime);
      return;
    }

    schedule.scheduleJob(reminderTime, async () => {
      try {
        console.log(`Sending reminder to ${userEmail} for event "${event.title}" at ${reminderTime}`);
        await sendEventReminder(userEmail, event); 
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
