import { body, param } from "express-validator";
import { isValidMongodbId } from "@/utils/mongodbIdValidator";
import { strongPasswordValidator } from "@/utils/passwordValidator"; // ajuste o caminho se precisar

export const findOneAccountValidation = () => {
  return [
    param("id")
      .isString()
      .withMessage("id must be a string.")
      .notEmpty()
      .withMessage("id is required.")
      .custom(isValidMongodbId),
  ];
};

export const accountCreateValidation = () => {
  return [
    body("username")
      .isString()
      .withMessage("The username must be a string.")
      .notEmpty()
      .withMessage("The username is required.")
      .trim(),

    body("password")
      .isString()
      .withMessage("The password must be a string.")
      .notEmpty()
      .withMessage("The password is required.")
      .custom((password) => {
        if (!strongPasswordValidator(password)) {
          throw new Error("The password is not strong enough.");
        }
        return true;
      }),

    body("rePassword")
      .isString()
      .withMessage("The confirmation password must be a string.")
      .notEmpty()
      .withMessage("The confirmation password is required.")
      .custom((rePassword, { req }) => {
        if (rePassword !== req.body.password) {
          throw new Error("Passwords do not match.");
        }
        return true;
      }),

    body("email")
      .isEmail()
      .withMessage("Invalid email format.")
      .normalizeEmail(),

    body("recoveryEmail")
      .optional()
      .isEmail()
      .withMessage("Invalid recovery email format.")
      .normalizeEmail(),

    body("securityAnswer")
      .isString()
      .withMessage("The security answer must be a string.")
      .notEmpty()
      .withMessage("The security answer is required.")
      .trim(),
  ];
};

export const updateAccountValidation = () => {
  return [
    param("id")
      .isString()
      .withMessage("id must be a string.")
      .notEmpty()
      .withMessage("id is required.")
      .custom(isValidMongodbId),

    body("username")
      .optional()
      .isString()
      .withMessage("The username must be a string.")
      .notEmpty()
      .withMessage("The username cannot be empty.")
      .trim(),

    body("password")
      .optional()
      .isString()
      .withMessage("The password must be a string.")
      .custom((password) => {
        if (password && !strongPasswordValidator(password)) {
          throw new Error("The password is not strong enough.");
        }
        return true;
      }),

    body("rePassword")
      .optional()
      .isString()
      .withMessage("The confirmation password must be a string.")
      .custom((rePassword, { req }) => {
        if (rePassword && rePassword !== req.body.password) {
          throw new Error("Passwords do not match.");
        }
        return true;
      }),

    body("email")
      .optional()
      .isEmail()
      .withMessage("Invalid email format.")
      .normalizeEmail(),

    body("recoveryEmail")
      .optional()
      .isEmail()
      .withMessage("Invalid recovery email format.")
      .normalizeEmail(),

    body("securityAnswer")
      .optional()
      .isString()
      .withMessage("The security answer must be a string.")
      .notEmpty()
      .withMessage("The security answer cannot be empty.")
      .trim(),
  ];
};

export const deleteOneAccountValidation = () => {
  return [
    param("id")
      .isString()
      .withMessage("id must be a string.")
      .notEmpty()
      .withMessage("id is required.")
      .custom(isValidMongodbId),
  ];
};
