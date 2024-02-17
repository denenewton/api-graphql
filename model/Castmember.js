import mongoose, { models } from "mongoose";

const Schema = mongoose.Schema({

    movieID: {
        type: Number,
        ref: "Movie",
        required: true,
      },
  
    adult:{
        type:Boolean,
        required:false,
    },
    gender: {
        type:Number,
        required:false
    },
    id: {
        type:Number,
        required:true
    },
    known_for_department: {
        type:String,
        required:false
    },
    name: {
        type:String,
        //unique:true,
        required:true
    },
    original_name: {
        type:String,
        required:true
    },
    popularity:{
        type:Number,
        required:false,
    },
    profile_path: {
        type:String,
        required:false
    },
    cast_id: {
        type:Number,
        required:false
    },
    character: {
        type:String,
        required:true
    },
    credit_id: {
        type:String,
        required:false
    },
    order: {
        type:Number,
        required:false
    },
   
});


const Castmember = models.Castmember || mongoose.model("Castmember", Schema);
export default Castmember;
