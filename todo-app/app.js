/* eslint-disable no-unused-vars */

const express = require("express");
const { Todo } = require("./models");
const app = express();
const bodyParser = require("body-parser");
// const todo = require('./models/todo')
app.use(bodyParser.json());
app.get("/todos", (request, response) => {
  // response.send("Hello World!!!")
  console.log("List");
});
app.post("/todos", async (request, response) => {
  console.log("Creating a todo", request.body);
  try {
    const todo = await Todo.addTodo({
      title: request.body.title,
      dueDate: request.body.dueDate,
      completed: false,
    });
    return response.json(todo);
  } catch (e) {
    console.log(e);
    return response.status(422);
  }
});
app.put("/todos/:id/markascompleted", async (request, response) => {
  console.log("We have to update a TODO with ID:", request.params.id);
  try {
    const todo = await Todo.findByPk(request.params.id);
    const updatedtodo = await todo.markascompleted();
    return response.json(updatedtodo);
  } catch (e) {
    console.log(e);
  }
});
app.delete("/todos/:id", (request, response) => {
  console.log("Delete a todo by ID:", request.params.id);
});
module.exports = app;
