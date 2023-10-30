const express = require("express")
const { UserModel } = require("../Model/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { BlackListModel } = require("../Model/blacklist.model")

const userRouter = express.Router()
userRouter.get("/", (req,res)=>{
    res.send("user data")
})
userRouter.post("/users/register", async(req,res)=>{
    const {name, email, password,gender,age, city,is_married} = req.body
    const user = await UserModel.findOne({email})
    try {
        if(user){
            res.send({msg:"User is already registerd"})
        }else{
            bcrypt.hash(password, 5, async(err,hash)=>{
                if(err){
                    res.send({error:err})
                }else{
                    const newuser = new UserModel({
                        name,email, password:hash,gender,age, city,is_married
                    })
                    await newuser.save()
                    res.status(200).send({msg: "New user rigisterd", newUser: req.body})
                }
            })
        }
    } catch (error) {
        res.send({msg:error})
    }

})

userRouter.post("/users/login", async(req,res)=>{
    const {email, password} = req.body
    try {
        let user = await UserModel.findOne({email})
        if(user){
            bcrypt.compare(password, user.password, (err, result)=>{
                if(err){
                    res.send(err)
                }else{
                    const token = jwt.sign({userName: user.name, userId: user._id}, "insta", {expiresIn: "7D"} )
                    res.status(200).send({"msg": "Login successful", 'token': token})
                }
            })
        }else{
            res.send({"msg": "User not found"})
        }
    } catch (error) {
        res.send(error)
    }
})

userRouter.get("/logout", async(req,res)=>{
    const token = req.headers.authorization?.split(" ")[1]
    try {
        const newlist = new BlackListModel({
            token
        })
        await newlist.save()
        res.status(200).send({"msg":"User logged out"})
    } catch (error) {
        res.send(error)
    }

})

module.exports ={
    userRouter
}