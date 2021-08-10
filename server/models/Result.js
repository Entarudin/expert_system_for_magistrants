
const {Schema,model} = require("mongoose")


const Result = new Schema({
    idUser : {type: String, required: true, unique: true},
    result : {type: String, required: true}
   
})
 module.exports = model("Result",Result)