const mongoose=require("mongoose");
const marked=require('marked');
const slugify=require('slugify');
const articleSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },

    description:{
        type:String,
        
    },
    markdown:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now //if we donnot have any date it will give the present date
    },

    blogtype:{
        type:String,
        required:true
    },
    slug:{
        type:String,
        required:true,
        unique:true //url should be unique
    }
});

//anytime we perform a crud operation this function will learn:
articleSchema.pre('validate',function(next){
    if(this.title){
        this.slug=slugify(this.title,{lower:true,strict:true})//lowe will convert it inot lower string and  strict will make sure it does not inlude any unwanted character
    }

    next();
})

module.exports=mongoose.model('Article',articleSchema);