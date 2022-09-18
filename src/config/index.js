const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    sparrowUrl: process.env.SPARROWURL || "http://api.sparrowsms.com/v2/sms?",
    smsFrom: process.env.SMSFROM || "Sparrow SMS Demo",
    smsToken: process.env.SPARROWTOKEN
}