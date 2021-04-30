import express from "express";
import _ from "lodash";
import Joi from "joi";
import {User} from "../models/user";

const router = express.Router();

function validate(req) {
    const schema = Joi.object({
      email: Joi.string().min(5).max(255).required().email(),
      password: Joi.string().min(5).max(255).required(),
    });
    return schema.validate(req);
}

router.post("/", async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Invalid email or password.");

    // later need to add encryption here
    const validPassword = user.password === req.body.password
    if (!validPassword) return res.status(400).send("Invalid email or password.");

    res.send(user.generateAuthToken());
} );

export default router;