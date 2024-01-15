/* eslint-disable no-unused-vars */
const express = require("express");
const app = express();
const { Todo } = require("./models");
const bodyParser = require("body-parser");
const path = require("path");
app.use(bodyParser.json());
app.set("view engine","ejs");

app.get("/", async (request, response)=>{
  const allTodos = await Todo.getTodos();
  const dueToday = await Todo.getDueTodayTodos();
  const overDue = await Todo.getOverdueTodos();
  const dueLater = await Todo.getdueLaterTodos();
  if(request.accepts("html")){
    response.render('index',{
      allTodos,
      dueToday,
      dueLater,
      overDue
    });
  }else{
    response.json({ 
      allTodos,
      dueToday,
      dueLater,
      overDue
    })
  }
});
app.use(express.static(path.join(__dirname,'public')))
app.get("/", function (request, response) {
  response.send("Hello World");
});

app.get("/todos", async function (_request, response) {
  console.log("Processing list of all Todos ...");
  // FILL IN YOUR CODE HERE
  try {
    const todo = await Todo.findAll();
    return response.json(todo);
  } catch (e) {
    console.log(e);
    return response.status(422).json(e);
  }
  // First, we have to query our PostgerSQL database using Sequelize to get list of all Todos.
  // Then, we have to respond with all Todos, like:
  // response.send(todos)
});

app.get("/todos/:id", async function (request, response) {
  try {
    const todo = await Todo.findByPk(request.params.id);
    return response.json(todo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.post("/todos", async function (request, response) {
  try {
    const todo = await Todo.addTodo(request.body);
    return response.json(todo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.put("/todos/:id/markAsCompleted", async function (request, response) {
  const todo = await Todo.findByPk(request.params.id);
  try {
    const updatedTodo = await todo.markAsCompleted();
    return response.json(updatedTodo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.delete("/todos/:id", async function (request, response) {
  console.log("We have to delete a Todo with ID: ", request.params.id);
  // FILL IN YOUR CODE HERE
  const todo = await Todo.findByPk(request.params.id);
  if (!todo) {
    // If todo is not found, return 404 Not Found
    return response.status(404).send(false);
  }
  try {
    const updatedTodo = await todo.destroy({
      where:{
        id:request.params.id
      }
    })
    
    return response.send(true);
    
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
  // First, we have to query our database to delete a Todo by ID.
  // Then, we have to respond back with true/false based on whether the Todo was deleted or not.
  // response.send(true)
});
// app.listen(3000, () => {
//   console.log("Started express server at port 3000");
//  });
module.exports = app;
