const jwt=require('jsonwebtoken')

async function authToken(req,res,next){
    try{
        const token =req.cookies?.token

        // if token not availabe then 
        if(!token){
            return res.status(200).json({
                message:"Please Login... !",
                error:true,
                success:false
            })
        }
        // verify the token 
        jwt.verify(token, process.env.TOKEN_SECRET_KEY,function(err,decoded){
            console.log(err)
            console.log("decoded",decoded)

            if(err){
                console.log("error auth",err)
                return res.status(403).json({
                    message: "Invalid or Expired Token",
                    error: true,
                    success: false
                });
            }
            req.userId=decoded?._id
            next()
        });
        // console.log("token",token)
    }
    catch(err){
        res.status(400).json({
            message:err.message || err,
            data:[],
            error:true,
            success:false
        })
    }
}
module.exports=authToken