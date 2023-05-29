const mongoose=require("mongoose");


const loginSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },

    Password:{
        type:String,
        
    },
})



module.exports=mongoose.model('Login',loginSchema);