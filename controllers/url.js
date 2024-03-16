
const shortid = require('shortid')
const URL = require('../models/url');


async function handelGenerateNewShortUrl(req,res){
    const body = req.body;
    if(!body.url) return res.status(400).json({error: 'Url is Required'});
    const shortID = shortid();

    await URL.create({
    shortId: shortID,
    redirectUrl: body.url,
    visitHistory: []

    });

    return res.json({id: shortID})


};

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    return res.json({
      totalClicks: result.visitHistory.length,
      analytics: result.visitHistory,
    });
  }

// async function handelRedirectToUrl(req,res) {
//     const shortId = await URL.findById(req.params.id)
//     const entery = await URL.findOneAndUpdate({
//         shortId
//     }, {$push: {
//         visitHistory: {
//             timestamp: Date.now()
//         }
//     }});

//     res.redirect(entery.redirectUrl)

// }

module.exports = {
    handelGenerateNewShortUrl,
    handleGetAnalytics
}