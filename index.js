import express, { json } from "express";
import bodyparser from "body-parser";
import winston from "winston"; //for logging
import {dbconn} from "./startup/db";
import getCors from "./startup/cors";
import getRoutes from "./startup/routes";
import config from "./config/default";

const jsonparser = bodyparser.json()
const app = express();
app.use(jsonparser);

getCors(app);
getRoutes(app);

const port = process.env.PORT || config.port;
const server = app.listen(port, () => {
    // winston.info(`Listening to port ${port}...`);  // for logging unit tests
    console.log(`Listening to port ${port}...`);
});

export default server;
