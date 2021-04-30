import Joi from "joi";
import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    payeeEmail: {
        type: String, 
        required: true,
        minlength: 5,
        maxlength: 255
    },
    paidAt: {
        type: Date, 
        required: true,
        minlength: 5,
        maxlength: 255, 
    },
    amountPaid: {
        type: Number,
        required: true,
    }
}, {collection: 'payments-db'})

export const Payment = mongoose.model("Payments", paymentSchema);