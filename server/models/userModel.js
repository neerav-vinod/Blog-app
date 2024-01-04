const mongoose = require('mongoose')
const {Schema,model} = mongoose;

const UserSchema = new Schema({
    name :{type:String, required: true, min: 4, unique:true},
    email:{type:String, required: true, unique:true},
    password:{type:String,required:true},
    picture:{type:String}
})

const UserModel = model('User',UserSchema);

module.exports = UserModel;