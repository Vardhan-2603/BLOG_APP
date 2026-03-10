import exp from 'express'
import { register, authenticate} from '../services/auth_service.js'
import { checkAuthor} from '../Middlewares/check_author.js'
import { verifyToken } from '../Middlewares/verify_token.js';
import { ArticleTypeModel } from '../Models/article_model.js';
export const userRoute=exp.Router();

//Register user
userRoute.post('/users',async(req,res)=>{
     //get user obj from req
     let userObj =req.body;
     //call register
     const newUserObj= await register({...userObj,role:"USER"});
     //send res
     res.status(201).json({message:"User Created",payloadd:newUserObj});
})
//Read all articals(protected )
userRoute.get('/article',verifyToken("USER"),async(req,res)=>{
     //find article
     let articles = await ArticleTypeModel.find();
     //if artical not found
     if(!articles){
          return res.status(400).json({message:"article not found"});
     }
     //send res
     return res.status(200).json({message:"article",payload:articles});
})
//add comment to the artical(procted )
userRoute.put('/articleComment',verifyToken("USER"),async(req,res)=>{
     // get comment obj from req
     let { userId,articleId,comment}=req.body;
     // check user(req.user)
     // console.log(req.user);
     if(userId!==req.user.userId){
          return res.json({message:"Forbidden"})
     }
     // find articleby Id and update
     let article=await ArticleTypeModel.findByIdAndUpdate(articleId);
     let updatedArticle= await ArticleTypeModel.findByIdAndUpdate(articleId,{
          $push:{comments:{user:userId,comment:comment}}},
          {new:true,runValidators:true})
     if(!article){
          return res.status(400).json({message:"Article not found"});
     }
     return res.status(200).json({message:"commented",payload:updatedArticle})
})