import express from "express";
import _ from "lodash";
import {User, validateUser} from "../models/user";

const router = express.Router();

router.get("/", async (req, res) => {
    // test api to view users
    const users = await User.find().select("-__v").distinct("email");
    res.send(users );
});

router.get("/users", async(req, res) => {
    const users = await User.find({ role: { $ne: 'admin' } }).select("-__v").distinct("email");
    res.send(users);
})

router.get("/admins", async(req, res) => {
    const users = await User.find({ role: { $eq: 'admin' } }).select("-__v").distinct("email");
    res.send(users);
})

router.get("/me", async (req, res) => {
    const user = await User.findOne({email: req.body.email}).select("-__v");
    res.send(user);
});

router.post("/", async(req, res) => {
    //  validate the params
    const {error} = validateUser(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already registered.");

    user = new User(_.pick(req.body, ["name", "email", "password", "role"]));
    await user.save();

    res
    // .header("x-auth-token", token)
    // .header("access-control-expose-headers", "x-auth-token")
    .send(_.pick(user, ["_id", "name", "email"]));
})
export default router;