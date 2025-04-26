import { body, param } from "express-validator";
import { isValidMongodbId } from "@/utils/mongodbIdValidator";
import { capitalizeName } from "@/utils/stringUtils";
enum UserRole {
  Admin = "admin",
  Common = "common",
  FilmCritic = "film critic",
}

const isValidUserRole = (value: string): boolean => {
  return Object.values(UserRole).includes(value as UserRole);
};

export const findOneUserValidation = () => {
  return [
    param("id")
      .isString()
      .withMessage("id must be a string.")
      .notEmpty()
      .withMessage("id is required.")
      .custom(isValidMongodbId),
  ];
};
export const userCreateValidation = () => {
  return [
    body("name")
      .isString()
      .withMessage("The name must be a string.")
      .notEmpty()
      .withMessage("The name is required.")
      .trim()
      .customSanitizer(capitalizeName),
    body("nickname")
      .isString()
      .withMessage("The nickname must be a string.")
      .notEmpty()
      .withMessage("The nickname is required.")
      .trim(),
    body("email")
      .isEmail()
      .withMessage("The email must have a conventional email format.")
      .notEmpty()
      .withMessage("The email is required.")
      .trim(),
    body("password")
      .isString()
      .withMessage("The password must be a string.")
      .notEmpty()
      .withMessage("Password is required.")
      .trim(),
    body("role")
      .trim()
      .notEmpty()
      .withMessage("The role is required.")
      .custom(isValidUserRole)
      .withMessage(
        "Invalid user role. Accepted values: 'common', 'admin', 'film critic'."
      ),
    body("avatar")
      .isURL()
      .withMessage("The avatar field must be a url.")
      .optional(),
    body("phoneNumber")
      .isArray({ min: 1 })
      .withMessage(
        "The phoneNumber must be an array with at least one element."
      )
      .optional(),
  ];
};

export const updateUserValidation = () => {
  return [
    param("id")
      .isString()
      .withMessage("id must be a string.")
      .notEmpty()
      .withMessage("id is required.")
      .custom(isValidMongodbId),
    body("name")
      .isString()
      .withMessage("The name must be a string.")
      .optional()
      .trim()
      .customSanitizer(capitalizeName),
    body("nickname")
      .isString()
      .withMessage("The nickname must be a string.")
      .optional()
      .trim(),
    body("email")
      .isEmail()
      .withMessage("The email must have a conventional email format.")
      .optional()
      .trim(),
    body("password")
      .isString()
      .withMessage("The password must be a string.")
      .optional()
      .trim(),
    body("role")
      .optional()
      .trim()
      .custom(isValidUserRole)
      .withMessage(
        "Invalid user role. Accepted values: 'common', 'admin', 'film critic'."
      ),
    body("avatar")
      .isURL()
      .withMessage("The avatar field must be a url.")
      .optional()
      .trim(),
    body("phoneNumber.*")
      .isString()
      .withMessage("Each phone number must be a string.")
      .optional()
      .trim(),
  ];
};
export const deleteOneUserValidation = () => {
  return [
    param("id")
      .isString()
      .withMessage("id must be a string.")
      .notEmpty()
      .withMessage("id is required.")
      .custom(isValidMongodbId),
  ];
};
