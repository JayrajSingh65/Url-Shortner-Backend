const express = require('express');
const router = express.Router();

const {handelGenerateNewShortUrl,handleGetAnalytics} = require('../controllers/url')


router.post('/', handelGenerateNewShortUrl);
router.get('/analytics/:shortId', handleGetAnalytics )

// router.route('/:shortId').get(handelRedirectToUrl)

module.exports = router;