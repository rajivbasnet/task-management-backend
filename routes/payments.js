import express from "express";
import bodyParser from "body-parser";
import _ from "lodash";
import {Payment} from "../models/payment";

const router = express.Router()

router.get("/", async (req, res) => {
    const payments = await Payment.find().sort("payeeEmail").select("-__v");
    res.json(payments);
})

router.get("/mypayments", async (req, res) => {
    const payments = await Payment.find({payeeEmail: req.body.email}).sort("paidAt").select("-__v");
    res.json(payments);
})


export default router;