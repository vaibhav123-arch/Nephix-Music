const mongoose = require("mongoose");

const songSchema = new mongoose.Schema(
    {
        title:{type:String ,trim:true ,index:true ,required:true},
        artist:{type:mongoose.Schema.Types.ObjectId ,ref:"Artist" ,required:true ,index:true},
        album:{type:mongoose.Schema.Types.ObjectId ,ref:"Album" , required:true ,index:true},
        tracknumber:{type:Number , required:true},
        duration:{type:Number ,required:true},
        fileurl:{type:String , required:true},
        coverimage:{type:String , default:""},
        genre:{type:String , trim:true},
        playcount:{type:Number , default:0}
    },
    {timestamps:true}
);

songSchema.index({title:"text"});
songSchema.index({album:1 , tracknumber:1});

module.exports = mongoose.model("Song",songSchema);