const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { refreshAccessToken } = require("../utils/generateTokens");

const userSchema = new mongoose.Schema(
    {
     username:{
        type:String , required:true , unique:true , trim:true , lowercase:true , minlength:3 , maxlength:30 ,index:true
     }  , 
     email:{
        type:String , required:true , unique:true , lowercase:true,trim:true,index:true
     },
     password:{
        type:String ,required:true , minlength:6 ,select:false
     },
     avatar:{
        type:String,default:""
     },
     role:{
        type:String , enum:["user","admin"],default: "user"
     },
     refreshToken:{
        type:String , select:false
     },
    
    },
    {timestamps:true}
)

userSchema.pre("save",async function(next){
 if(!this.isModified(password))return (next);
 this.password = bcrypt.hash(this.password,10);
 next();
});

userSchema.methods.isPasswordCorrect = async function(plainpassword){
    return bcrypt.compare(plainpassword,this.password);
} ;

module.exports = mongoose.model("User",userSchema
);