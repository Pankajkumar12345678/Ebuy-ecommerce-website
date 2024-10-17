const addToCartModel = require("../../models/cartProduct");

const deleteAddToCartProduct = async (req, res) => {
    try {
        const currentUserId = req?.userId;
        const addToCartProductId = req.body._id;

        // Ensure both product ID and user ID are used in the query
        const deleteProduct = await addToCartModel.deleteOne({
            _id: addToCartProductId,
            userId: currentUserId // Ensure the correct user's cart is modified
        });

        res.json({
            message: "Product Deleted From Cart",
            error: false,
            success: true,
            data: deleteProduct
        });
    } catch (err) {
        res.json({
            message: err?.message || err,
            error: true,
            success: false
        });
    }
};

module.exports = deleteAddToCartProduct;
