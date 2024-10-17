const addToCartModel = require("../../models/cartProduct")

const addToCartController = async(req,res)=>{
    try{
        const { productId } = req?.body;
        const currentUser = req?.userId;

        // Check if the user is logged in
        if (!currentUser) {
            return res.status(401).json({
                message: "User Not Exits Please Login... !",
                success: false,
                error: true
            });
        }

        // Check if the product is already in the cart for the current user
        const isProductAvailable = await addToCartModel.findOne({ productId, userId: currentUser });

        if(isProductAvailable){
            return res.json({
                message : "Already exits in Add to Cart",
                success : false,
                error : true
            })
        }

        const payload = {
            productId : productId,
            quantity : 1,
            userId : currentUser,
        }

        const newAddToCart = new addToCartModel(payload)
        const saveProduct = await newAddToCart.save()

        res.json({
            data : saveProduct,
            message : "Product Added in Cart Successfully",
            success : true,
            error : false
        })

    }catch(err){
        res.json({
            message:err?.message ||err,
            error:true,
            success:false
        })
    }
}

module.exports = addToCartController