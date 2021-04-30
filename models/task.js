import Joi from "joi";
import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    projectname: {
        type: String, 
        required: true,
        minlength: 5,
        maxlength: 255
    },
    taskname: {
        type: String, 
        required: true,
        minlength: 5,
        maxlength: 255, 
    },
    assignedto: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
    },
    taskstatus: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    }
})

export const Task = mongoose.model("Task", taskSchema);

export function validateTask(task) {
    const schema = Joi.object({
        projectname: Joi.string().min(5).max(255).required(),
        taskname: Joi.string().min(5).max(255).required(),
        assignedto: Joi.string().min(5).max(255).email(),
        taskstatus: Joi.string().min(5).max(255).required(),
    });
    return schema.validate(task);
}