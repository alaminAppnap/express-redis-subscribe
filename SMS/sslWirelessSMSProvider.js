const axios = require('axios');

const apiUrl = process.env.SSL_WIRELESS_MESSAGE_API_URL || 'http://sms.sslwireless.com/pushapi/dynamic/server.php';
const apiToken = process.env.SSL_WIRELESS_MESSAGE_API_TOKEN;
const csmsId = process.env.SSL_WIRELESS_MESSAGE_CSMS_ID;

async function sendSslMessage(number, message) {
    try {
        return await axios.get(apiUrl, {
            params: {
                csms_id: csmsId,
                sms: message,
                msisdn: number,
                api_token: apiToken,
                sid: csmsId,
            },
        });
    } catch (error) {
        throw error;
    }
}

module.exports = {
    sendSslMessage
};