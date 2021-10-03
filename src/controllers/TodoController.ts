import { PrismaClient } from ".prisma/client";
import { Request, Response } from "express";
import { v4 as uuidV4 } from "uuid";

export default class TodoController {
  async create(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { title, deadline } = request.body;

    const prisma = new PrismaClient();

    const deadlineDate = new Date(deadline);

    const todo = await prisma.todo.create({
      data: {
        id: uuidV4(),
        title,
        deadline: deadlineDate,
        userId: id
      },
    });

    return response.status(201).json(todo);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id: todo_id } = request.query;
    const { title, deadline } = request.body;

    if (!todo_id || todo_id instanceof Array) {
      return response.status(404).json({ error: "Todo's id is missing!" });
    }

    const prisma = new PrismaClient();

    const deadlineData = new Date(deadline);

    const todoUpdate = await prisma.todo.update({
      data: {
        title,
        deadline: deadlineData,
      },
      where: {
        id: todo_id as string,
      }
    });

    return response.status(200).json(todoUpdate);
  }
}
