import exp from 'express'
import { register } from '../services/auth_service.js'
import { ArticleTypeModel } from '../Models/article_model.js'
import { checkAuthor } from '../Middlewares/check_author.js'
import { authenticate } from '../services/auth_service.js';
import { verifyToken } from '../Middlewares/verify_token.js';
export const authorRoute=exp.Router();

//Register author(public)
authorRoute.post('/users',async(req,res)=>{
     //get user obj from req
     let userObj =req.body;
     //call register
     const newUserObj= await register({...userObj,role:"AUTHOR"});
     //send res
     res.status(201).json({message:"User Created",payloadd:newUserObj});
})
//create artical (protected)
authorRoute.post('/article',verifyToken("AUTHOR"),async(req,res)=>{
     //get artical from req
     let artical = req.body;
     //create artical document
     let newArticalDoc = new ArticleTypeModel(artical)
     //save
     let createArticalDoc = await newArticalDoc.save()
     //send res
      res.status(201).json({message:"artical created",payload:createArticalDoc})
})
//read articals of author(protected)
authorRoute.get("/articles/:authorId",verifyToken("AUTHOR"),async(req,res)=>{
     //get authorID
     let authorId= req.params.authorId;
     //read artical by the author
     let article = await ArticleTypeModel.find({author:authorId,isArticalActive:true}).populate('author','firstName email')
     //send res
     return res.status(400).json({message:"article",payload:article})
})
//edit aritcal (protected)
authorRoute.put("/articles",verifyToken("AUTHOR"),async(req,res)=>{
     //get modified artical from request
     let {author,articleId,title,category,content}=req.body;
     //find the article
     let article= await ArticleTypeModel.findById({_id:articleId,author:author});
     //if artical not found
     if(!article){
          return res.status(400).json({message:"article not found"});
     }
     
     //update the article
     let updatedArticle=await ArticleTypeModel.findByIdAndUpdate(articleId,{
          $set:{title,category,content}}
     ,{
          new:true
     })
     //send res
     return res.status(400).json({message:'artical updated',payload:updatedArticle})
})

//delect(soft copy) aritical (protected)
authorRoute.patch('/articles/:id',verifyToken("AUTHOR"),async(req,res)=>{
     const { id } = req.params;
     const { isArticleActive } = req.body;
     //check article
     let article=await ArticleTypeModel.findById(id);
     if(!article){
          return res.status(400).json({message:"article not found"});
     }
     // console.log(req.user.userId,article.author.toString())
     // AUTHOR can only modify their own articles
     if (req.user.role === "AUTHOR" && 
     article.author.toString() !== req.user.userId) {
     return res
     .status(403)
     .json({ message: "Forbidden. You can only modify your own articles" });
     }
     // Already in requested state
     if(article.isArticalActive===isArticleActive){
          return res.status(400).json({
               message:`Article is already ${isArticleActive?"active":"deleted"}`
          })
     }

     // update status
     article.isArticalActive=isArticleActive;
     await article.save();

     //return res
     return res.status(400).json({message:`Article ${isArticleActive ? "restored" : "deleted"} successfully,article`})
})

