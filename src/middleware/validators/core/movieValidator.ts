import { body, param } from "express-validator";
import { isValidMongodbId } from "@/utils/mongodbIdValidator";
import { capitalizeName } from "@/utils/stringUtils";
import { NumberRangeValidator } from "@/utils/numberRange";

export const findOneMovieValidation = () => {
  return [
    param("id")
      .isString()
      .withMessage("id must be a string.")
      .notEmpty()
      .withMessage("id is required.")
      .custom(isValidMongodbId),
  ];
};

export const movieCreateValidation = () => {
  return [
    body("title")
      .isString()
      .withMessage("The title must be a string.")
      .notEmpty()
      .withMessage("The name is required.")
      .trim()
      .customSanitizer(capitalizeName),
    body("year")
      .isNumeric()
      .withMessage("The year must be a number.")
      .notEmpty()
      .withMessage("The year is required."),
    body("genre")
      .isArray({ min: 1 })
      .withMessage(
        "The genre must be an array that contains at least 1 element."
      )
      .notEmpty()
      .withMessage("The genre must be required."),
    body("average_rating")
      .isNumeric()
      .withMessage("The average_rating must be a number.")
      .notEmpty()
      .withMessage("The average_rating is required.")
      .custom((value) => new NumberRangeValidator(0, 5).inNumberRange(value))
      .withMessage("The average_rating must be a number between 0 and 5"),
    body("tmdb_id")
      .isString()
      .withMessage("The tmdb_id must be a string.")
      .notEmpty()
      .withMessage("The tmdb_id is required."),
    body("actors")
      .isArray({ min: 1 })
      .withMessage(
        "The actors must be an array that contains at least 1 element."
      )
      .notEmpty()
      .withMessage("The actors must be required."),
    body("directors")
      .isArray({ min: 1 })
      .withMessage(
        "The directos must be an array that contains at least 1 element."
      )
      .notEmpty()
      .withMessage("The directos must be required."),
  ];
};

export const updateMovieValidation = () => {
  return [
    param("id")
      .isString()
      .withMessage("id must be a string.")
      .notEmpty()
      .withMessage("id is required.")
      .custom(isValidMongodbId),
    body("title")
      .isString()
      .withMessage("The title must be a string.")
      .trim()
      .customSanitizer(capitalizeName)
      .optional(),
    body("year")
      .isNumeric()
      .withMessage("The year must be a number.")
      .optional(),
    body("genre")
      .isArray({ min: 1 })
      .withMessage(
        "The genre must be an array that contains at least 1 element."
      )
      .optional(),
    body("average_rating")
      .isNumeric()
      .withMessage("The average_rating must be a number.")
      .toFloat()
      .optional()
      .custom((value) => new NumberRangeValidator(0, 5).inNumberRange(value))
      .withMessage("The average_rating must be a number between 0 and 5"),
    body("tmdb_id")
      .isString()
      .withMessage("The tmdb_id must be a string.")
      .notEmpty()
      .withMessage("The tmdb_id is required.")
      .optional(),
    body("actors")
      .isArray({ min: 1 })
      .withMessage(
        "The actors must be an array that contains at least 1 element."
      )
      .optional(),
    body("directors")
      .isArray({ min: 1 })
      .withMessage(
        "The directos must be an array that contains at least 1 element."
      )
      .optional(),
  ];
};
export const deleteOneMovieValidation = () => {
  return [
    param("id")
      .isString()
      .withMessage("id must be a string.")
      .notEmpty()
      .withMessage("id is required.")
      .custom(isValidMongodbId),
  ];
};
