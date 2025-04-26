import { body, param } from "express-validator";
import { isValidMongodbId } from "@/utils/mongodbIdValidator";
import { capitalizeName } from "@/utils/stringUtils";

export const findOneListValidation = () => {
  return [
    param("id")
      .isString()
      .withMessage("id must be a string.")
      .notEmpty()
      .withMessage("id is required.")
      .custom(isValidMongodbId),
  ];
};
export const listCreateValidation = () => {
  return [
    body("user_id")
      .isString()
      .withMessage("user_id must be a string.")
      .notEmpty()
      .withMessage("user_id is required.")
      .custom(isValidMongodbId),
    body("description")
      .isString()
      .withMessage("description must be a string.")
      .notEmpty()
      .withMessage("description is required.")
      .trim(),
    body("name")
      .isString()
      .withMessage("name must be a string.")
      .notEmpty()
      .withMessage("name is required.")
      .trim()
      .customSanitizer(capitalizeName),
    body("movies")
      .isArray()
      .withMessage("movies must be a array.")
      .notEmpty()
      .withMessage("movies is required."),
  ];
};

export const updateListValidation = () => {
  return [
    param("id")
      .isString()
      .withMessage("The id must be a string.")
      .notEmpty()
      .withMessage("The id is required.")
      .custom(isValidMongodbId),
    body("user_id")
      .isString()
      .withMessage("user_id must be a string.")
      .notEmpty()
      .withMessage("user_id is required.")
      .custom(isValidMongodbId),
    body("description")
      .isString()
      .withMessage("description must be a string.")
      .notEmpty()
      .withMessage("description is required.")
      .trim(),
    body("name")
      .isString()
      .withMessage("name must be a string.")
      .notEmpty()
      .withMessage("name is required.")
      .trim()
      .customSanitizer(capitalizeName),
    body("movies")
      .isArray()
      .withMessage("movies must be a array.")
      .notEmpty()
      .withMessage("movies is required."),
  ];
};
export const deleteOneListValidation = () => {
  return [
    param("id")
      .isString()
      .withMessage("The id must be a string.")
      .notEmpty()
      .withMessage("The id is required.")
      .custom(isValidMongodbId),
  ];
};
