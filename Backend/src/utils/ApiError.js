class ApiError extends Error{
 constructor(statusCode,message="something went wrong",errors=[]){
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.error = errors;
    this.success = false;
    this.data = null;
    Error.captureStackTrace(this,this.constructor);
 }
}
module.exports = ApiError;