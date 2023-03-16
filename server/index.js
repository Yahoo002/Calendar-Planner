const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES//

//Create a todo
app.post("/todos", async (req, res) => {
  //async waits for the function to complete before it continues
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );

    res.json(newTodo.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

//Get all todos
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
    //no RETURNING * because the purpose of SELECT is to give data back
  } catch (err) {
    console.log(err.message);
  }
});

//Get a single todo
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const oneTodo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json(oneTodo.rows);
  } catch (err) {
    console.log(err.message);
  }
});

//Update a todo
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    );
    res.json("Todo was updated");
  } catch (err) {
    console.log(err.message);
  }
});

//Delete a todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json("Todo was deleted");
  } catch (err) {
    console.log(err.message);
  }
});

app.listen(3000, () => {
  console.log("Server has started on 3000");
});
