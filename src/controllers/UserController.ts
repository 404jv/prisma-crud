import { PrismaClient } from ".prisma/client";
import { Request, Response } from "express";
import { v4 as uuidV4 } from "uuid";

interface IRequest {
  name: string;
  email: string;
  username: string;
}

export default class UserController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, email, username }: IRequest = request.body;

    const prisma = new PrismaClient();

    const userAlreadyExists = await prisma.user.findFirst({
      where: {
        username
      }
    });

    if (userAlreadyExists) {
      return response.status(400).json({
        error: "User already exists with this email"
      });
    }

    const user = await prisma.user.create({
      data: {
        id: uuidV4(),
        name,
        email,
        username
      },
    });

    return response.status(201).json(user);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const prisma = new PrismaClient();

    const users = await prisma.user.findMany({
      include: {
        todos: true
      }
    });

    return response.json(users);
  }
}
