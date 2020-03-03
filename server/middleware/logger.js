function log(req,res,next) {
    console.log("Activity @",req.path);
    console.log(req.body)
    next()
}

module.exports = log