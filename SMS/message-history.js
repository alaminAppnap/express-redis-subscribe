const MessageHistory = require('../Data/Models/MessageHistory');
const {db} = require('../Database/mongodb');
async function smsHistoryCreate(message,phoneNumber,response,csmsId){
    try {
        const newMessageHistory = new MessageHistory({
            message,
            phoneNumber,
            response,
            csmsId,
        });

        await newMessageHistory.save();

        return { success: true, message: 'Message history created successfully' };
    } catch (error) {
        console.error('Error creating message history:', error);
        return { success: false, error: 'Message history creation failed' };
    }
}

module.exports = {
    smsHistoryCreate
};