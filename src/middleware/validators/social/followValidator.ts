import { body, param } from "express-validator";
import { isValidMongodbId } from "../../../utils/mongodbIdValidator";
import validateDifferentFrom from "../../../utils/ensureDifferentIds";
export const findOneFollowValidation = () => {
  return [
    param("id")
      .isString()
      .withMessage("id must be a string.")
      .notEmpty()
      .withMessage("id is required.")
      .custom(isValidMongodbId),
  ];
};
export const followCreateValidation = () => {
  return [
    body("follower_id")
      .isString()
      .withMessage("follower_id must be a string.")
      .notEmpty()
      .withMessage("follower_id is required.")
      .custom(isValidMongodbId),
    body("followed_id")
      .isString()
      .withMessage("followed_id must be a string.")
      .notEmpty()
      .withMessage("followed_id is required.")
      .custom(isValidMongodbId)
      .custom(validateDifferentFrom("follower_id")),
  ];
};

export const updateFollowValidation = () => {
  return [
    param("id")
      .isString()
      .withMessage("id must be a string.")
      .notEmpty()
      .withMessage("id is required.")
      .custom(isValidMongodbId),
    body("follower_id")
      .isString()
      .withMessage("follower_id must be a string.")
      .optional()
      .custom(isValidMongodbId),
    body("followed_id")
      .isString()
      .withMessage("followed_id must be a string.")
      .optional()
      .custom(isValidMongodbId)
      .custom(validateDifferentFrom("follower_id")),
  ];
};
export const deleteOneFollowValidation = () => {
  return [
    param("id")
      .isString()
      .withMessage("id must be a string.")
      .notEmpty()
      .withMessage("id is required.")
      .custom(isValidMongodbId),
  ];
};
