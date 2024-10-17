const express = require('express');
const userModel = require('../../models/userModel');
const bcrypt = require('bcryptjs');
const router = express.Router();

// async function userForgotPasswordController
async function userForgotPasswordController(req,res){
    try {
        const { email, password, confirmPassword } = req.body;

        if (!email) {
            throw new Error("Please provide an email.");
        }
        if (!password) {
            throw new Error("Please provide a new password.");
        }
        if (password !== confirmPassword) {
            throw new Error("Passwords do not match.");
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            throw new Error("User does not exist.");
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hashSync(password, salt);

        if (!hashPassword) {
            throw new Error("Something went wrong with bcrypt password.");
        }

        user.password = hashPassword;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Password reset successfully.",
            error: false,
        });
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
};

module.exports= userForgotPasswordController;

