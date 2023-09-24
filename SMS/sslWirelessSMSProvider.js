const axios = require('axios');
const {db} = require('../Database/mongodb');
const {smsHistoryCreate} = require('../SMS/message-history');

const apiUrl = process.env.SSL_WIRELESS_MESSAGE_API_URL || 'http://sms.sslwireless.com/pushapi/dynamic/server.php';
const apiToken = process.env.SSL_WIRELESS_MESSAGE_API_TOKEN;
const csmsId = process.env.SSL_WIRELESS_MESSAGE_CSMS_ID;

async function sendSslMessage(number, message) {
    try {
        let response = await axios.get(apiUrl, {
            params: {
                csms_id: csmsId,
                sms: message,
                msisdn: number,
                api_token: apiToken,
                sid: csmsId,
            },
        });
        smsHistoryCreate(message,number,response,csmsId);
        return response;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    sendSslMessage
};