const express = require("express")
const { PostModel } = require("../Model/post.model")
const {auth}= require("../Middleware/auth")
const postRouter = express.Router()

postRouter.use(auth)

postRouter.post("/posts/add", async(req,res)=>{
    const {title,body,device,no_of_comments,userName,userId} = req.body
    try {
        let newpost = new PostModel({
            title,body,device,no_of_comments,userName,userId
        })

        await newpost.save()
        res.send({"msg":"Post added", newPost: req.body})
    } catch (error) {
        res.send(error)
    }
})

postRouter.get("/posts", async(req,res)=>{
    try {
        let list = await PostModel.find({userId: req.body.userId})
        res.status(200).send({"list": list})
    } catch (error) {
        res.send(error)
    }
})

postRouter.patch("/posts/update/:id", async(req,res)=>{
    const {id} = req.params
    const curPost = await PostModel.findOne({_id:id})
    try {
        if(req.body.userId === curPost.userId){
            await PostModel.findByIdAndUpdate({_id:id}, req.body)
            res.status(200).send({"msg":"Post is updated"})
        }else{
            res.status(400).send({"msg":"You are not authorised"})
        }
    } catch (error) {
        res.send(error)
    }
})

postRouter.delete("/posts/delete/:id", async(req,res)=>{
    const {id} = req.params
    const curPost = await PostModel.findOne({_id:id})
    try {
        if(req.body.userId === curPost.userId){
            await PostModel.findByIdAndDelete({_id:id})
            res.status(200).send({"msg":"Post is deleted"})
        }else{
            res.status(400).send({"msg":"You are not authorised"})
        }
    } catch (error) {
        res.send(error)
    }
})

module.exports ={
    postRouter
}