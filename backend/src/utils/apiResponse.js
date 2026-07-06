class apiResponse {
    constructor(message , data=null){
        this.message = message;
        this.data = data;
    }
}

module.exports = apiResponse;