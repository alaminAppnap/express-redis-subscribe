// const MessageHistory = require('../Data/Models/MessageHistory');
// const {db} = require('../Database/mongodb');
const fs = require('fs');
const path = require('path');

async function smsHistoryCreate(message,phoneNumber,response,csmsId){
    try {
        let respoonseData = response?.data || {};

        smsHistoryCreateOnFile(message,phoneNumber,respoonseData,csmsId);

        /**  this code for mode */

        // const newMessageHistory = new MessageHistory({
        //     message,
        //     phoneNumber,
        //     response,
        //     csmsId,
        // });

        // await newMessageHistory.save();

        return { success: true, message: 'Message history created successfully' };
    } catch (error) {
        console.error('Error creating message history:', error);
        return { success: false, error: 'Message history creation failed' };
    }
}


async function smsHistoryCreateOnFile(message,phoneNumber,response,csmsId){
    try {
        const newJsonObject = { message: message,phone: phoneNumber,response: response,csmsId: csmsId};

        const filePath = path.join(__dirname, 'smsHistory.json');

        let existingData = [];

        if (fs.existsSync(filePath).size !=0) {
            const fileData = fs.readFileSync(filePath, 'utf-8');
            existingData = JSON.parse(fileData);
        }

        existingData.push(newJsonObject);

        fs.writeFileSync(filePath, existingData);

        return { success: true, message: 'Message history created successfully' };
    } catch (error) {
        console.error('Error creating message history:', error);
        return { success: false, error: 'Message history creation failed' };
    }
}

module.exports = {
    smsHistoryCreate,smsHistoryCreateOnFile
};