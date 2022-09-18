class CustomError extends Error {
    constructor(message, statusCode) {
      super(message)
      this.statusCode = statusCode
      this.message = message
    }
  
    static badRequest(msg) {
      return new CustomError(msg, 400)
    }
  
    static internalServer(msg) {
      return new CustomError(msg, 500)
    }
  
    static notFound(msg) {
      return new CustomError(msg, 404)
    }
  
}
  
module.exports = CustomError;