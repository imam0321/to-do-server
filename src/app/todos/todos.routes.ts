import express, { Request, Response } from "express";
import fs from "fs";
import path from "path";

const filePath = path.join(__dirname, "../../../db/todos.json");

export const todosRouter = express.Router();

todosRouter.get("/", (req: Request, res: Response) => {
  const data = fs.readFileSync(filePath, { encoding: "utf-8" });
  res.json({
    message: "From Todos Router",
    data,
  });
});

todosRouter.get("/:title", (req: Request, res: Response) => {
  const { title, body } = req.body;
  console.log({ title, body });

  res.json("data");
});

todosRouter.post("/create-todo", (req: Request, res: Response) => {
  const { title, body } = req.body;
  console.log({ title, body });

  res.json("data");
});

todosRouter.put("/update-todo/:title", (req: Request, res: Response) => {
  const { title, body } = req.body;
  console.log({ title, body });

  res.json("data");
});

todosRouter.delete("/delete-todo/:title", (req: Request, res: Response) => {
  const { title, body } = req.body;
  console.log({ title, body });

  res.json("data");
});
