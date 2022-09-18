const { sparrowUrl, smsToken, smsFrom } = require("@config");
const CustomError = require("../errors/CustomError");
const axios = require("axios").default;

console.log("sparrowUrl:", sparrowUrl);
console.log("smsToken:", smsToken);
console.log("smsFrom:", smsFrom);

class SmsService {
    setPhoneNumber(phoneNo){
        this.phoneNo = phoneNo;
        return this;
    }

    setMessage(message){
        this.message = message;
        return this;
    }

    getPhoneNumber(){
        return this.phoneNo;
    }

    getMessage(){
        return this.message;
    }

    async sendSMS() {
        let errorMsg = smsToken == undefined || smsToken == '' ? 'Sparrow token is required!' : undefined;
        console.log("errorMsg:", errorMsg);
        if(errorMsg != undefined) {
            throw CustomError.badRequest(errorMsg);
        }
        const queryStringValues = {
            token: smsToken,
            from: smsFrom,
            to: this.getPhoneNumber(),
            text: this.getMessage()
        };
        const encodedQS = new URLSearchParams(queryStringValues).toString();
        const url = `${sparrowUrl}${encodedQS}`;
        try{
            await axios.get(url);
            console.log("SMS sent successfully!\n");
        }
        catch(err) {
            console.log("Error:", err)
            const {response} = err;
            const code = response.data.response_code;
            if(code === 1007 || code === 1011) {
                throw CustomError.badRequest("Invalid phone number!");
            }
            throw CustomError.internalServer("Oop! Something went wrong.");
        }
    }
}

module.exports = new SmsService();
