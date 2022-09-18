const smsService = require('@services/smsService');

const smsController = async (req, res, next) => {
    try {
        await smsService.setPhoneNumber(req.query.phone).setMessage(req.query.message).sendSMS();
        res.json({
            code: 200,
            message: "SMS sent succesfully!"
        })
    } catch (error) {
        console.log("error:", error)
        next(error);
    }
}


module.exports = smsController;