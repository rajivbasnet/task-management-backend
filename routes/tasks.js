import express from "express";
import bodyParser from "body-parser";
import _ from "lodash";
import {Task, validateTask} from "../models/task";

const jsonParser = bodyParser.json()
const router = express.Router()

router.get("/", async (req, res) => {
    const tasks = await Task.find().sort("projectname").select("-__v");
    res.json(tasks);
})

router.get("/mytasks", async (req, res) => {
    const tasks = await Task.find({assignedto: req.body.assignedto}).sort("projectname").select("-__v");
    res.json(tasks);
})

router.post("/", async(req, res) => {
    const {error} = validateTask(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    let task = await Task.findOne({projectname: req.body.projectname, taskname: req.body.taskname});
    if (task) return res.status(208).send(
        `Task: ${req.body.taskname} already exists for Project: ${req.body.projectname} 
        which is assigned to ${task.assignedto}`
    );
    
    task = new Task(_.pick(req.body, ["projectname", "taskname", "assignedto", "taskstatus"]));
    await task.save();

    return res.status(200).send(`Task ${req.body.taskname} ADDED for 
        Project: ${req.body.projectname} and Assigned To: ${req.body.assignedto}`)
})


router.put("/", async(req, res) => {
    const {error} = validateTask(req.body);
    if (error) return res.send(error.details[0].message);
    console.log(error)
    console.log(req.body)
    let task = await Task.findOne({ projectname: req.body.projectname, taskname: req.body.taskname});
    if (!task) return res.status(404).send(
        `Task: ${req.body.taskname} DOESN'T EXIST for Project: ${req.body.projectname}`
    )

    // user need to exist as well
    // do later

    // find and update one
   await  Task.findOneAndUpdate(
       { projectname: req.body.projectname, taskname: req.body.taskname},
       { taskstatus: req.body.taskstatus} 
    )
    // response
    res.send(
        `Task: ${req.body.taskname} UPDATED for Project: ${req.body.projectname} \n 
         => Status to ${req.body.taskstatus}`
    )
})

export default router;

