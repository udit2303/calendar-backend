const nodemailer = require('nodemailer');
require('dotenv').config(); // Load environment variables

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
      user: process.env.MAIL,
      pass: process.env.MAIL_PASS
  }
});

/**
 * Send a reminder email for an event.
 * @param {string} to - Recipient's email address.
 * @param {Object} event - Event details (title, date, time, description).
 */
const sendEventReminder = async (to, event) => {
  const { title, date, time, description } = event;

  const mailOptions = {
    from: {
      name: "Calendar",
      address: process.env.MAIL, // Use readable sender name
    },
    to,
    subject: `Reminder: ${title}`,
    text: `Hi there,\n\nThis is a reminder for your event:\n\nTitle: ${title}\nDate: ${new Date(date).toLocaleDateString()}\nTime: ${time}\nDescription: ${description || 'No description provided.'}\n\nBest regards,\nYour App`,
    html: `
      <h3>Hi there!</h3>
      <p>This is a reminder for your event:</p>
      <p><strong>Title:</strong> ${title}</p>
      <p><strong>Date:</strong> ${new Date(date).toLocaleDateString()}</p>
      <p><strong>Time:</strong> ${time}</p>
      <p><strong>Description:</strong> ${description || 'No description provided.'}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions); // Send the email
    console.log(`Reminder sent to ${to}`);
  } catch (error) {
    console.error(`Failed to send email to ${to}:`, error.message); // Log detailed error
  }
};

module.exports = { sendEventReminder };
