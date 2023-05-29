const express = require('express');
const app=express();
const mongoose=require('mongoose');
const articleRouter=require('./routes/article');
const Article=require('./models/article');
const Login=require('./models/login')
const methodOverride=require('method-override');
const dotenv = require("dotenv");
const { auth, requiresAuth } = require('express-openid-connect');
const article = require('./models/article');

// const config = {
//   authRequired: false,
//   auth0Logout: true,
//   secret: 'a long, randomly-generated string stored in env',
//   baseURL: 'http://localhost:3000',
//   clientID: 'XeAY4NnkdhkJgA8VDmzuwDexv5YBP3AL',
//   issuerBaseURL: 'https://dev-o1vumlsyaizechi4.us.auth0.com'
// };

// // auth router attaches /login, /logout, and /callback routes to the baseURL
// app.use(auth(config));

// // req.isAuthenticated is provided from the auth router
// // app.get('/', (req, res) => {
// //   res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
// // });



// // The /profile route will show the user profile as JSON
// app.get('/profile', requiresAuth(), (req, res) => {
//   res.send(JSON.stringify(req.oidc.user, null, 2));
// });
  

dotenv.config();
// const connectDB = async () => {
//   const conn = await
 mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser:true,
  });
//   console.log(`MongoDB Connected: ${conn.connection.host}`)
// }
// module.exports = {connectDB}


app.set('view engine','ejs');//we have a file inside view folder named ejs and the view engine will basically conevrt the ejs cod einto html

app.use(express.urlencoded({extended:false}));
app.use(methodOverride('_method'));

app.use('/login',Login);

app.use('/articles',articleRouter);//this would tell us that everything we will have in this router will appear as /article 


app.get('/', async(req,res)=>{
    const articles= await Article.find({blogtype:"Public"}).sort({createdAt:'desc'});
    // loginStatus = await req.oidc.isAuthenticated();
    res.render('articles/main2',{articles:articles});
});

app.get('/LoginPage',(req,res)=>{
  res.render('login/main');
})

app.listen(3000);

