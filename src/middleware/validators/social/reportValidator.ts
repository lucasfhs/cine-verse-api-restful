import { body, param } from "express-validator";
import { isValidMongodbId } from "@/utils/mongodbIdValidator";

export const findOneReportValidation = () => {
  return [
    param("id")
      .isString()
      .withMessage("id must be a string.")
      .notEmpty()
      .withMessage("id is required.")
      .custom(isValidMongodbId),
  ];
};
export const reportCreateValidation = () => {
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
    body("reason")
      .isString()
      .withMessage("reason must be a string.")
      .notEmpty()
      .withMessage("reason is required."),
  ];
};

export const updateReportValidation = () => {
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
    body("reason")
      .isString()
      .withMessage("The reason must be a string.")
      .notEmpty()
      .withMessage("The reason is required."),
  ];
};
export const deleteOneReportValidation = () => {
  return [
    param("id")
      .isString()
      .withMessage("The id must be a string.")
      .notEmpty()
      .withMessage("The id is required.")
      .custom(isValidMongodbId),
  ];
};
