const { BlackListModel } = require("../Model/blacklist.model")
const jwt = require("jsonwebtoken")
const auth = async(req, res, next)=>{
    let token = req.headers.authorization?.split(" ")[1]
    if(token){
        let list = await BlackListModel.findOne({token})
        if(list){
            res.send({"msg" : "Login again"})
        }else{
            jwt.verify(token, "insta", (err, decoded)=>{
                if(err){
                    res.send({"err":err})
                }else{
                    req.body.userName= decoded.userName
                    req.body.userId = decoded.userId
                    next()
                }
            })
        }
    }else{
        res.send("register as new user")
    }
}

module.exports={
    auth
}