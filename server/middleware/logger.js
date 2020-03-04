function log(req,res,next) {
    console.log("Activity @",req.path);
    next()
}

module.exports = log