import { PrismaClient } from ".prisma/client";
import { Request, Response } from "express";
import { v4 as uuidV4 } from "uuid";

interface IRequest {
  name: string;
  email: string;
}

export default class UserController {
  async create(request: Request, response: Response) {
    const { name, email, username } = request.body;

    const prisma = new PrismaClient();

    const userAlreadyExists = await prisma.user.findUnique({
      where: { email }
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
      }
    });

    return response.status(201).json(user);
  }

  async show(request: Request, response: Response) {
    const prisma = new PrismaClient();

    const users = await prisma.user.findMany();

    return response.json(users);
  }

  async update(request: Request, response: Response) {
    const { name, email }: IRequest = request.body;

  }
}
