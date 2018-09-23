class ValidationError extends Error {
    constructor(params){
        super(params)
    }
}
module.exports = ValidationError;