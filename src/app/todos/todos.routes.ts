import express, { Request, Response } from "express";
import { client } from "../../config/mongodb";
import { ObjectId } from "mongodb";

export const todosRouter = express.Router();

// Get all todos
todosRouter.get("/", async (req: Request, res: Response) => {
  const db = await client.db("todosDB");
  const todosCollection = await db.collection("todos");

  const cursor = await todosCollection.find({});
  const todos = await cursor.toArray();

  res.json({
    message: "From Todos Router",
    todos,
  });
});

// Post a todo
todosRouter.post("/create-todo", async (req: Request, res: Response) => {
  const { title, description, priority } = req.body;

  const db = await client.db("todosDB");
  const todosCollection = await db.collection("todos");
  await todosCollection.insertOne({
    title: title,
    description: description,
    priority: priority,
    isCompleted: false,
  });

  const cursor = await todosCollection.find({});
  const todos = await cursor.toArray();

  res.json(todos);
});

// Find one todo
todosRouter.get("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const db = await client.db("todosDB");
  const todosCollection = await db.collection("todos");

  const todo = await todosCollection.findOne({ _id: new ObjectId(id) });
  res.json(todo);
});

// Update todo
todosRouter.put("/update-todo/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const { title, description, priority, isCompleted } = req.body;
  const filter = { _id: new ObjectId(id) };

  const db = await client.db("todosDB");
  const todosCollection = await db.collection("todos");

  const updateTodo = await todosCollection.updateOne(
    filter,
    { $set: { title, description, priority, isCompleted } },
    { upsert: true }
  );

  res.json(updateTodo);
});

// Delete todo
todosRouter.delete("/delete-todo/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const db = await client.db("todosDB");
  const todosCollection = await db.collection("todos");

  await todosCollection.deleteOne({ _id: new ObjectId(id) });

  res.json({ message: "Delete Todo" });
});
