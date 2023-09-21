const axios = require('axios');

const sendNotification = async (webhookUrl, message) => {
  var payload = readyPayload(message); 
  try {
    const response = await axios.post(webhookUrl, payload);
    console.log('Notification sent:', response.data);
    return 'Notification sent successfully';
  } catch (error) {
    console.error('Error sending notification:', error);
    throw new Error('Error sending notification');
  }
};


const readyPayload = (data) => {
  var phone = data?.message || "01700000000";
  var message = data?.message || "Test message";
  var channel = data?.channel || "Notification Test";
  var username = data?.username || "Notification Username";

    return {

      "attachments":[
         {
            "fallback":"New open task [Urgent]: <http://url_to_task|Test out Slack message attachments>",
            "pretext":"New open task [Urgent]: <http://url_to_task|Test out Slack message attachments>",
            "color":"#D00000",
            "fields":[
               {
                "title":"Mobile",
                "value":phone,
                "short":false
             },
             {
              "title":"Message",
              "value":message,
              "short":false
           },
            ]
         }
      ]
   }
  };

module.exports = { sendNotification,readyPayload };