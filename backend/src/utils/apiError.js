class apiError extends Error{
    constructor(statuscode , message){
        super(message);

        this.message = message;
        this.statuscode = statuscode;

    }
}

module.exports = apiError;