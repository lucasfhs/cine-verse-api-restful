import { body, param } from "express-validator";
import { isValidMongodbId } from "@/utils/mongodbIdValidator";

export const findOneLikeValidation = () => {
  return [
    param("id")
      .isString()
      .withMessage("id must be a string.")
      .notEmpty()
      .withMessage("id is required.")
      .custom(isValidMongodbId),
  ];
};
export const likeCreateValidation = () => {
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
  ];
};

export const updateLikeValidation = () => {
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
  ];
};
export const deleteOneLikeValidation = () => {
  return [
    param("id")
      .isString()
      .withMessage("The id must be a string.")
      .notEmpty()
      .withMessage("The id is required.")
      .custom(isValidMongodbId),
  ];
};
