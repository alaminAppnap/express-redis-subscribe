const mongoose = require('mongoose');

const messageHistorySchema = new mongoose.Schema({
    message: String,
    phone_number: String,
    response: mongoose.Schema.Types.Mixed,
    csms_id: String,
});

const MessageHistory = mongoose.model('MessageHistory', messageHistorySchema);

module.exports = MessageHistory;
