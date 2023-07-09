import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { z } from "zod";
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const userController = {
  async createToken(req: Request, res: Response) {
    const bodySchema = z.object({
      email: z.string().email(),
      password: z.string(),
    });

    const { email, password } = bodySchema.parse(req.body);

    try {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (user) {
        const isSamePassword = await bcrypt.compare(password, user.password);

        if (!isSamePassword) {
          return res.status(422).json({ message: "Senha inválida." });
        }

        const secret = process.env.SECRET;
        const token = jwt.sign({ id: user.id }, secret as string, {
          expiresIn: "1d",
        });

        return res.json({
          message: "Autenticação realizada com sucesso.",
          token,
        });
      }

      return res.status(404).json({ message: "Usuário não encontrado." });
    } catch (error) {
      return res.status(400).json(error);
    }
  },

  async getOne(req: Request, res: Response) {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: false,
        picture: true,
        tasks: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    return res.status(200).json(user);
  },

  async getAll(req: Request, res: Response) {
    const users = await prisma.user.findMany();
    return res.status(200).json(users);
  },

  async createOne(req: Request, res: Response) {
    const bodySchema = z.object({
      email: z.string().email(),
      name: z.string(),
      password: z.string(),
    });

    try {
      const { email, name, password } = bodySchema.parse(req.body);
      const hashedPassword = await bcrypt.hash(password, 12);

      const userExists = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (userExists) {
        return res
          .status(422)
          .json({ message: "Este e-mail já está cadastrado." });
      }

      await prisma.user.create({
        data: {
          email,
          name,
          password: hashedPassword,
        },
      });

      return res.status(201).json({
        action: "post",
        message: "Usuário criado.",
        success: true,
      });
    } catch (error) {
      return res.status(400).json({ action: "post", error, success: false });
    }
  },

  async deleteOne(req: Request, res: Response) {
    const { id } = req.params;

    try {
      await prisma.user.delete({
        where: {
          id,
        },
      });

      return res.status(200).json({
        action: "delete",
        message: "Usuário deletado.",
        success: true,
      });
    } catch (error) {
      return res.status(400).json({ action: "delete", error, success: false });
    }
  },
};
