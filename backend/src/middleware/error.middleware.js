const errormiddleware = (err , req, res, next)=>{

    const message = err.message || "Internal server error"
    const statuscode = err.statuscode || 500

    return res.status(statuscode).json({
        message,
        success:false
    })

}

module.exports = errormiddleware;