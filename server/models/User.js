
const {Schema,model} = require("mongoose")


const User = new Schema({
    username : {type: String, unique: true, required: true},
    password : {type: String,  required: true},
    prevuniversity : {type: String,  required: true},
    speciality : {type: String,  required: true},
    dateofbirth : {type: String,  required: true},
    phonenumber : {type: String,  required: true, unique: true},
    fullname : {type: String,  required: true},
    roles: [{type:String , ref:'Role'}]
})
 module.exports = model("User",User)