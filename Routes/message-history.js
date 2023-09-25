const express = require('express');
const router = express.Router();
const fs = require('fs');

const filePath = path.join(__dirname, '..', 'SMS', 'smsHistory.json');
const smsHistory = fs.readFileSync(filePath, 'utf-8');
const smsHistoryData = JSON.parse(smsHistory);

router.get('/sms-history', (req, res) => {
  const page = req.query.page || 1;
  const itemsPerPage = 10;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToDisplay = smsHistoryData.slice(startIndex, endIndex);

  res.render('items', { items: itemsToDisplay });
});

module.exports = router;
