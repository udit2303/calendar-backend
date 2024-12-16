const schedule = require('node-schedule');
const { sendEventReminder } = require('./emailService');
const { Op } = require("sequelize");
const { Reminder } = require('../models');

const loadReminders = async () => {
  try {
    const reminders = await Reminder.findAll(
      { where: { reminderTime: { [Op.gte]: new Date() } } },
    );
    reminders.forEach(scheduleJob);
    const oldReminders = await Reminder.findMany(
      { where: { reminderTime: { [Op.lt]: new Date() } } },
    );
    oldReminders.forEach(async (reminder) => {
      await Reminder.destroy({ where: { id: reminder.id } });
    });
  } catch (error) {
    console.error('Error loading reminders:', error.message);
  }
};
const scheduleJob = (reminder) => {
  const { id, userEmail, event_title, reminderTime } = reminder;

  schedule.scheduleJob(new Date(reminderTime), async () => {
    try {
      console.log(`Sending reminder to ${userEmail} for event "${event_title}"`);
      await sendEventReminder(userEmail, { title: event_title });
      await Reminder.destroy({ where: { id } });
    } catch (error) {
      console.error('Error during scheduled job execution:', error.message);
    }
  });

  console.log(`Reminder scheduled for ${userEmail} on ${reminderTime}`);
};

const scheduleReminder = async (userEmail, event) => {
  try {
    const { date, time } = event;
    const eventDateTime = new Date(`${date.toISOString().split('T')[0]}T${time}`);  
    if (isNaN(eventDateTime)) {
      console.error('Invalid event time:', eventDateTime);
      return;
    }
    eventDateTime.setHours(eventDateTime.getHours() + 5);
    if (eventDateTime < new Date()) {
      console.error('Reminder time is in the past:', eventDateTime);
      return;
    }
    const reminder = await Reminder.create({
      userEmail,
      eventTitle: event.title,
      reminderTime : eventDateTime,
    });
    scheduleJob(reminder);

    console.log(`Reminder scheduled for ${userEmail} on ${reminderTime}`);
  } catch (error) {
    console.error('Error scheduling reminder:', error.message);
  }
};

module.exports = { scheduleReminder, loadReminders };
