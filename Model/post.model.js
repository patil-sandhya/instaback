const mongoose = require("mongoose")

const postSchema = mongoose.Schema({
    title : String,
body : String,
device : String,
userName: String,
userId: String,
no_of_comments : Number
})

const PostModel = mongoose.model("post", postSchema)

module.exports ={
    PostModel
}