import express from "express";
import checkapi from "../routes/checkapi"
import users from "../routes/users"
import tasks from "../routes/tasks"
import payments from "../routes/payments"
import auth from "../routes/auth"

export default function getRoutes(app) {
    app.use(express.json());
    app.use("/api/", checkapi);
    app.use("/api/users", users);
    app.use("/api/auth", auth);
    app.use("/api/tasks", tasks);
    app.use("/api/payments", payments);

    
}