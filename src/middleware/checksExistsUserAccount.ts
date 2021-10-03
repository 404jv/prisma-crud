import { PrismaClient } from ".prisma/client";
import { NextFunction, Request, Response } from "express";

async function checksExistsUserAccount(request: Request, response: Response, next: NextFunction) {
  const { username } = request.headers;

  if (!username || username instanceof Array) {
    return response.status(404).json({ error: "Username is missing!" });
  }

  const prisma = new PrismaClient();

  const user = await prisma.user.findUnique({
    where: { username }
  });

  if (!user) {
    return response.status(404).json({ error: "User not found!" });
  }

  request.user = user;

  next();
}

export default checksExistsUserAccount;
