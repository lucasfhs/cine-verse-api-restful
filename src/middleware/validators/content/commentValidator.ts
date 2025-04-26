import { body, param } from "express-validator";
import { isValidMongodbId } from "@/utils/mongodbIdValidator";

export const findOneCommentValidation = () => {
  return [
    param("id")
      .isString()
      .withMessage("id must be a string.")
      .notEmpty()
      .withMessage("id is required.")
      .custom(isValidMongodbId),
  ];
};
export const commentCreateValidation = () => {
  return [
    body("user_id")
      .isString()
      .withMessage("user_id must be a string.")
      .notEmpty()
      .withMessage("user_id is required.")
      .custom(isValidMongodbId),
    body("review_id")
      .isString()
      .withMessage("review_id must be a string.")
      .notEmpty()
      .withMessage("review_id is required.")
      .custom(isValidMongodbId),
    body("content")
      .isString()
      .withMessage("content must be a string.")
      .notEmpty()
      .withMessage("content is required."),
  ];
};

export const updateCommentValidation = () => {
  return [
    param("id")
      .isString()
      .withMessage("The id must be a string.")
      .notEmpty()
      .withMessage("The id is required.")
      .custom(isValidMongodbId),
    body("user_id")
      .isString()
      .withMessage("The user_id must be a string.")
      .notEmpty()
      .withMessage("The user_id is required.")
      .custom(isValidMongodbId),
    body("review_id")
      .isString()
      .withMessage("The review_id must be a string.")
      .notEmpty()
      .withMessage("The review_id is required.")
      .custom(isValidMongodbId),
    body("content")
      .isString()
      .withMessage("The content must be a string.")
      .notEmpty()
      .withMessage("The content is required."),
  ];
};
export const deleteOneCommentValidation = () => {
  return [
    param("id")
      .isString()
      .withMessage("The id must be a string.")
      .notEmpty()
      .withMessage("The id is required.")
      .custom(isValidMongodbId),
  ];
};
