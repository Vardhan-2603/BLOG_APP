import exp from 'express';
import { connect } from 'mongoose';
import { config } from 'dotenv';
import { userRoute } from './APIs/user_api.js'
import { authorRoute } from './APIs/author_api.js'
import { adminRoute } from './APIs/admin_api.js'
import { commonRoute } from './APIs/common_api.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

config() //process.env
const  app=exp()
// use cors middleware
app.use(cors({origin:['http://localhost:5173'],credentials:true}));
//add body parser middleware
app.use(exp.json());
//add c
app.use(cookieParser());
//connect APIS
app.use('/user-api', userRoute);
app.use('/author-api', authorRoute);
app.use('/admin-api', adminRoute);
app.use('/common-api',commonRoute);

//connect to db
const connectDb=async()=>{
     try{
     await connect(process.env.DB_URL);
     console.log("DB connection successful");
     app.listen(process.env.PORT,()=>console.log("server 4000 started"));
     }catch(err){
          console.log('Error in DB Connection ',err);
     }
}
connectDb();

//dealing with invalid path
app.use((req,res,next)=>{
     //console.log(req.url)
     res.json({message: `${req.url} is invalid path`});
})

//error handling middle ware
app.use((err,req,res,next)=>{
     // console.log("error:",err);
     res.json({message:"Error ",paylood:err.message})
})