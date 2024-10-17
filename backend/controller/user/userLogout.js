async function userLogout(req,res){
    try{

        const tokenOption = {  //tokenOption additional adding for security perpose
            httpOnly:true,
            secure:true,
            sameSite : 'None'
        }

        res.clearCookie("token",tokenOption)  //tokenOption additional adding for security perpose

        res.json({
            message : "Logged Out Successfully",
            error : false,
            success : true,
            data:[]
        })

    }
    catch(err){
        res.json({
            message : err.message || err,
            error : true,
            success : false,
        })
    }
}

module.exports = userLogout