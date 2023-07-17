const express = require("express");
const router = express.Router();
const NoteModel = require("../models/Note.model");

router.get("/notes", async (req, res) => {
    try {
        const tasks = await NoteModel.find({});
        res.status(200).send(tasks);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get("/notes/:id", async (req, res) => {
    try {
        const taskId = req.params.id;
        const task = await NoteModel.findById(taskId);

        if (!task) {
            return notFoundError(res);
        }
        res.status(200).send(task);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post("/notes", async (req, res) => {
    try {
        const newTask = new NoteModel(req.body);

        await newTask.save();
        res.status(201).send(newTask);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.patch("/notes/:id", async (req, res) => {
    try {
        const taskId = req.params.id;
        const taskData = req.body;

        const taskToUpdate = await NoteModel.findById(taskId);

        const allowedUpdate = ["isCompleted"];

        const requestedUpdate = Object.keys(taskData);

        for (const update of requestedUpdate) {
            if (allowedUpdate.includes(update)) {
                taskToUpdate[update] = taskData[update];
            } else {
                return res
                    .status(500)
                    .send("um ou mais campos nao sao editaveis");
            }
        }
        await taskToUpdate.save();

        return res.status(200).send(taskToUpdate);
    } catch (error) {
        return res.status(500).send(error.message);
    }
});

router.delete("/notes/:id", async (req, res) => {
    try {
        const taskId = req.params.id;

        const taskToDelete = await NoteModel.findById(taskId);
        if (!taskToDelete) {
            return notFoundError(res);
        }
        const deletedTask = await NoteModel.findByIdAndDelete(taskId);
        res.status(200).send(deletedTask);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.put("/notes/:id", async (req, res) => {
    try {
        const taskId = req.params.id;
        const Task = req.body;
        console.log(Task);

        const result = await NoteModel.findByIdAndUpdate(taskId, {
            title: Task.title,
            description: Task.description,
        });
        console.log(result);
        res.json({ error: false, result });
    } catch (error) {
        console.error("Erro ao atualizar dados", error);
        res.status(500).json({ error: "Erro ao atualizar dados" });
    }
});
module.exports = router;
