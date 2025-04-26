import { body, param } from "express-validator";
import { isValidMongodbId } from "@/utils/mongodbIdValidator";
export const findOneReviewValidation = () => {
  return [
    param("id")
      .isString()
      .withMessage("id must be a string.")
      .notEmpty()
      .withMessage("id is required.")
      .custom(isValidMongodbId),
  ];
};
export const reviewCreateValidation = () => {
  return [
    body("user_id")
      .isString()
      .withMessage("user_id must be a string.")
      .notEmpty()
      .withMessage("user_id is required.")
      .custom(isValidMongodbId),
    body("movie_id")
      .isString()
      .withMessage("movie_id must be a string.")
      .notEmpty()
      .withMessage("movie_id is required.")
      .custom(isValidMongodbId),
    body("rating")
      .isFloat({ min: 1, max: 5 })
      .withMessage("rating must be a number between 1 and 5.")
      .notEmpty()
      .withMessage("rating is required."),
    body("content")
      .isString()
      .withMessage("content must be a string.")
      .notEmpty()
      .withMessage("content is required.")
      .trim(),
    body("spoiler").isBoolean().withMessage("spoiler must be a boolean."),
  ];
};

export const updateReviewValidation = () => {
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
    body("movie_id")
      .isString()
      .withMessage("movie_id must be a string.")
      .notEmpty()
      .withMessage("movie_id is required.")
      .custom(isValidMongodbId),
    body("rating")
      .isFloat({ min: 1, max: 5 })
      .withMessage("rating must be a number between 1 and 5.")
      .notEmpty()
      .withMessage("rating is required."),
    body("content")
      .isString()
      .withMessage("content must be a string.")
      .notEmpty()
      .withMessage("content is required.")
      .trim(),
    body("spoiler").isBoolean().withMessage("spoiler must be a boolean."),
  ];
};
export const deleteOneReviewValidation = () => {
  return [
    param("id")
      .isString()
      .withMessage("The id must be a string.")
      .notEmpty()
      .withMessage("The id is required.")
      .custom(isValidMongodbId),
  ];
};
