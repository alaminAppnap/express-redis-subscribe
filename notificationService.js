const axios = require('axios');

const sendNotification = async (webhookUrl, notificationPayload) => {
  try {
    const response = await axios.post(webhookUrl, notificationPayload);
    console.log('Notification sent:', response.data);
    return 'Notification sent successfully';
  } catch (error) {
    console.error('Error sending notification:', error);
    throw new Error('Error sending notification');
  }
};


const notificationPayload = async () => {
    return {
        channel: 'your_channel_name',
        username: 'your_username',
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: '*Notification Message*',
            },
          },
        ],
      };
  };

module.exports = { sendNotification,notificationPayload };