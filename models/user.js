import jwt from "jsonwebtoken";
import Joi from "joi";
import mongoose from "mongoose";
import config from "../config/default"


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
    }, 
    email: {
        type: String,
        required: true,
        minlength: 5, 
        maxlength: 225,
        unique: true,
    },
    password: {
        type: String, 
        required: true, 
        minlength: 5,
        maxlength: 225
    }, 
    role: {
        type: String, 
        required: true, 
        minlength: 2,
        maxlength: 1024
    }
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign(
      {
        _id: this._id,
        name: this.name,
        email: this.email,
        role: this.role
      },
      config.jwtPrivateKey
    );
    return token;
};

export const User = mongoose.model("User", userSchema);

export function validateUser(user) {
    const schema = Joi.object({
      name: Joi.string()
        .min(2)
        .max(50)
        .required(),
      email: Joi.string()
        .min(5)
        .max(255)
        .required()
        .email(),
      password: Joi.string()
        .min(5)
        .max(255)
        .required(),
      role: Joi.string()
        .min(2)
        .max(255)
        .required()
    });
  
    return schema.validate(user);
  }
