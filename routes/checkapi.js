import express from "express";

const router = express.Router()

router.get("/", async(req, res) => {
    res.send("API is working fine!!!")
})

export default router;