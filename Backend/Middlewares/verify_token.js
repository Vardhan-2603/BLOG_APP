import jwt from 'jsonwebtoken';
import {config} from 'dotenv'
config();

export const verifyToken= (...allowedRoles)=>{
     return async(req,res,next)=>{
     //read token from req
     try{
     let token=req.cookies.token; //{token:""}
     //console.log("token ",token);
     if(!token){
          return res.status(400).json({message:"Unauthorized req.Plz login"})
     }
     //verify the validity of token(decoding the token)
     let decodeToken=jwt.verify(token,process.env.JWT_SECRET);

     // check if role is allowed
     if(!allowedRoles.includes(decodeToken.role)){
          return res.status(403).json({message:"Forbidden.You are not allowed"})
     }
     // Attach the user info for user in route
     req.user=decodeToken;
     //forward to next middleware/route
     next();
     }    
     catch(err){
          // jwt.verify thows if token is invalid or expired
          if(err.name==='TokenExpiredError'){
               return res.status(401).json({message:"session expired.please restart"})
          }
          if(err.name==='JsonWebTokenError'){
               return res.status({message:"Invalid token.Please login again"});
          }
     }

};

     
}