import { Request, Response } from "express";
import { UserModel } from "../../models/core/User";
import Logger from "../../config/logger";

export async function findAllUsers(req: Request, res: Response) {
  try {
    const users: object[] = await UserModel.find();
    if (users.length > 0) {
      res.status(200).json({
        success: true,
        data: users,
      });
    } else {
      res.status(404).json({
        success: false,
        error: {
          code: 404,
          message: "No Users found.",
        },
      });
    }
  } catch (error: any) {
    Logger.error(`Error on find Users: ${error.message}`);
    res.status(500).json({
      success: false,
      error: {
        code: 500,
        message: "Internal server error",
      },
    });
  }
}

export async function findOneUser(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const user = await UserModel.findOne({ _id: id });
    if (user) {
      res.status(200).json({
        success: true,
        data: user,
      });
    } else {
      res.status(404).json({
        success: false,
        error: {
          code: 404,
          message: "User not found.",
        },
      });
    }
  } catch (error: any) {
    Logger.error(`Error on find User: ${error.message}`);
    res.status(500).json({
      success: false,
      error: {
        code: 500,
        message: "Internal server error",
      },
    });
  }
}

export async function updateOneUser(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const { name, nickname, email, password, avatar, phoneNumber } = req.body;
    const user = await UserModel.findOneAndUpdate(
      { _id: id },
      {
        name,
        nickname,
        email,
        password,
        avatar,
        phoneNumber,
      },
      { new: true }
    );
    if (user) {
      res.status(200).json({
        success: true,
        data: user,
      });
    } else {
      res.status(404).json({
        success: false,
        error: {
          code: 404,
          message: "User not found.",
        },
      });
    }
  } catch (error: any) {
    Logger.error(`Error on find User: ${error.message}`);
    res.status(500).json({
      success: false,
      error: {
        code: 500,
        message: "Internal server error",
      },
    });
  }
}

export async function deleteOneUser(req: Request, res: Response) {
  try {
    const id = req.params.id;

    const user = await UserModel.findOneAndDelete({ _id: id });
    if (user) {
      res.status(201).json({
        success: true,
        data: user,
      });
    } else {
      res.status(404).json({
        success: false,
        error: {
          code: 404,
          message: "User not found.",
        },
      });
    }
  } catch (error: any) {
    Logger.error(`Error delete User: ${error.message}`);

    res.status(500).json({
      success: false,
      error: {
        code: 500,
        message: "Internal server error",
      },
    });
  }
}

export async function createOneUser(req: Request, res: Response) {
  try {
    const { name, nickname, email, password, avatar, phoneNumber, role } =
      req.body;
    const newUser = await UserModel.create({
      name,
      nickname,
      email,
      password,
      avatar,
      phoneNumber,
      role,
    });
    res.status(201).json({
      success: true,
      data: newUser,
    });
  } catch (error: any) {
    Logger.error(`Error creating User: ${error.message}`);
    if (error.name === "MongoServerError" && error.code === 11000) {
      res.status(409).json({
        success: false,
        error: {
          code: 409,
          message: "User email must be unique",
        },
      });
    } else {
      res.status(500).json({
        success: false,
        error: {
          code: 500,
          message: "Internal server error",
        },
      });
    }
  }
}
