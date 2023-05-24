const jwt = require('jsonwebtoken');
const JWT_Secret='iamgoodatit';

const fetchuser=(req,res,next)=>
{
    //get the user from jwt tokenand add id to req objct
    const token =req.header('auth-token');
    if(!token)
    {
        res.status(401).send({error:"please authenticate using valid user"});       
    }
    try {
        const data= jwt.verify(token, JWT_Secret);
        req.user= data.user;
        next()   
    } catch (error) {
        res.status(401).send({error:"please authenticate using valid user"});       
    }
}

module.exports= fetchuser;





//middleware is