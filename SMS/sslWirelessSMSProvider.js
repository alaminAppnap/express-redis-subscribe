let request = require('request-promise');

const SMS_API = process.env.SSL_WIRELESS_MESSAGE_API_URL || 'http://sms.sslwireless.com/pushapi/dynamic/server.php';
const SMS_API_TOKEN = process.env.SSL_WIRELESS_MESSAGE_API_TOKEN;
const SMS_CSMS_ID = process.env.SSL_WIRELESS_MESSAGE_CSMS_ID;

async function smsSend(receiverNumber,message) {
    let params = getParams(SMS_CSMS_ID, message, receiverNumber, SMS_API_TOKEN, SMS_CSMS_ID, SMS_CSMS_ID);

    return request({
        url: `${ SMS_API }`,
        method: 'GET',
        qs: params,
        json: true
    });

}

function getParams(cSMSId,message,receiverNumber, apiToken, bengaliSId, englishSId) {
    let params = {
        csms_id: cSMSId,
        sms: message,
        msisdn: receiverNumber,
        api_token: apiToken,
        sid: englishSId,

    };

    if (!isEnglishSMS(message)) {
        params.sid = bengaliSId;
        params.sms = bengaliToUnicode(message);
    }

    return params;
}

function isEnglishSMS(message) {
    return Array.from(message).every(char => char.charCodeAt(0) <= 127);
}

function bengaliToUnicode(bengaliText) {
    let length = bengaliText.length;

    let unicode = '';
    for (let i = 0; i < length; i++) {
        unicode += bengaliText.charCodeAt(i).toString(16).padStart(4, '0');
    }

    return unicode;
}

module.exports = {
    smsSend
};