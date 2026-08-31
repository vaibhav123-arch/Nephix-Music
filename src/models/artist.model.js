const mongoose = require("mongoose");

const artistSchema = new mongoose.Schema(
    {
        name:{type:String , required:true , trim:true , index:true},
        bio:{type:String , default:""},
        image:{type:String ,default:""},
        genre:[{type:string , trim:true}]
    },
    {timestamps:true}
);

artistSchema.index({name:"text"});

module.exports = mongoose.model("Artist",artistSchema);