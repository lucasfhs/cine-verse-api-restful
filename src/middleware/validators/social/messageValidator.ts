import { body, param } from "express-validator";
import { isValidMongodbId } from "../../../utils/mongodbIdValidator";
import validateDifferentFrom from "../../../utils/ensureDifferentIds";

//   sender_id: {
//     type: Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
//   receiver_id: {
//     type: Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
//   content: String,
// },
// { timestamps: true }
export const findOneMessageValidation = () => {
  return [
    param("id")
      .isString()
      .withMessage("id must be a string.")
      .notEmpty()
      .withMessage("id is required.")
      .custom(isValidMongodbId),
  ];
};
export const messageCreateValidation = () => {
  return [
    body("sender_id")
      .isString()
      .withMessage("sender_id must be a string.")
      .notEmpty()
      .withMessage("sender_id is required.")
      .custom(isValidMongodbId),
    body("receiver_id")
      .isString()
      .withMessage("receiver_id must be a string.")
      .notEmpty()
      .withMessage("receiver_id is required.")
      .custom(isValidMongodbId),
    body("content")
      .isString()
      .withMessage("Content must be a string.")
      .notEmpty()
      .withMessage("Content is required."),
  ];
};

export const updateMessageValidation = () => {
  return [
    param("id")
      .isString()
      .withMessage("id must be a string.")
      .notEmpty()
      .withMessage("id is required.")
      .custom(isValidMongodbId),
    body("sender_id")
      .isString()
      .withMessage("sender_id must be a string.")
      .notEmpty()
      .withMessage("sender_id is required.")
      .custom(isValidMongodbId),
    body("receiver_id")
      .isString()
      .withMessage("receiver_id must be a string.")
      .notEmpty()
      .withMessage("receiver_id is required.")
      .custom(isValidMongodbId)
      .custom(validateDifferentFrom("sender_id")),
    body("content")
      .isString()
      .withMessage("Content must be a string.")
      .notEmpty()
      .withMessage("Content is required."),
  ];
};
export const deleteOneMessageValidation = () => {
  return [
    param("id")
      .isString()
      .withMessage("id must be a string.")
      .notEmpty()
      .withMessage("id is required.")
      .custom(isValidMongodbId),
  ];
};
