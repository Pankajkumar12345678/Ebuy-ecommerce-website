const bcrypt = require('bcryptjs')
const userModel = require('../../models/userModel')
const jwt=require('jsonwebtoken');
async function userSignInController(req,res){
    try{
        const {email , password}=req.body

        // Check if email is provided
        if(!email){
            throw new Error("Please Provide Email")
        }
        // Check if password is provided
        if(!password){
            throw new Error("Please Provide Password")
        }
        // Find the user by email
        const user=await userModel.findOne({email})

        // If user is not found
        if(!user){
            throw new Error("User not found")
        }

        // Check if the password matches
        const checkPassword =await bcrypt.compare(password,user.password)
        console.log("checkPassword",checkPassword)
        
        // create the token after login
        if (checkPassword) {
            const tokenData={
                _id : user._id,
                email : user.email,
            }
            const token= await jwt.sign(tokenData , process.env.TOKEN_SECRET_KEY ,{expiresIn: 60*60*8 });
            
            const tokenOption = {
                httpOnly:true,
                secure:true,
                sameSite : 'None'    // sameSite additional adding for security perpose
            }

            res.cookie("token",token,tokenOption).json({
                message: "Login Successfully",
                data:token,
                success:true,
                error:false
            })

        }
        else{
            throw new Error("Incorrect password");
        }

    }
    catch(err){
        res.json({
            message:err.message ||err,
            error:true,
            success:false,
        })
    }
}

// module.exports=userSignInController
module.exports=userSignInController