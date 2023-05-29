//This would contain all our routes of the blog like the show routes,the delete routes and the edit routes.
const express=require('express');
const router=express.Router();
const Article=require('./../models/article');
const article = require('./../models/article');




router.get('/new',(req,res)=>{
    res.render('articles/new',{article:new Article()});//this will direct to the new page on clicking the button in the main page

});

router.get('/edit/:id',async(req,res)=>{
    const article=await Article.findById(req.params.id);
    res.render('articles/edit',{article:article});
});



router.get('/:slug',async(req,res)=>{//everytime we creatte something which does not have new it will get redirected to this
    const article= await Article.findOne({slug:req.params.slug});

    if(article==null){ 
        res.redirect('articles/new');
    }else{
        res.render('articles/show',{article:article});
    }
   
    
})


  

router.post('/',async(req,res)=>{
    console.log("working",req.body);
   let article=new Article({
    title:req.body.title,
    description:req.body.description,
    markdown:req.body.markdown,
    blogtype:req.body.blogtype
   })
    try{
       
        article=await article.save();//we are updating the article variable with the newly saved 
        res.redirect(`/articles/${article.slug}`);
      
    }catch(e){
        res.render('articles/new',{article:article});
        // console.log("no");
    }
  
})



// router.post('/private',async(req,res)=>{

//     let article=new Article({
//         title:req.body.title,
//         description:req.body.description,
//         markdown:req.body.markdown,
//         blogtype:"Private",
       
//        })
     
//         try{
//             article=await article.save();
//             //we are updating the article variable with the newly saved 
//             console.log("Svedd");
//             console.log("hi");
//             res.redirect(`/articles/${article.slug}`);
          
//         }catch(e){
//             res.render('articles/new',{article:article});
//         }
// })

router.put('/:id',async(req,res)=>{
    let article={
     title:req.body.title,
     description:req.body.description,
     markdown:req.body.markdown
    }
     try{
        const art = await Article.findByIdAndUpdate(req.params.id,article);
         res.redirect(`/articles/${art.slug}`);
       
     }catch(e){
         res.render('articles/new',{article:article});
         // console.log("no");
     }
   
 })




//delete :

router.delete('/:id',async(req,res)=>{
    // console.log("Hi");
    await Article.findByIdAndDelete(req.params.id);
    return res.redirect('/');
});

//to actually access this router we need to export it to the index.js
module.exports=router