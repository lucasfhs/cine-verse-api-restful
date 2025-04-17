import { body, param } from "express-validator";

export const movieCreateValidation = () => {
  return [
    body("title")
      .isString()
      .withMessage("Title must be a string")
      .notEmpty()
      .withMessage("Title is required"),

    body("rating")
      .isNumeric()
      .withMessage("Rating must be a number")
      .notEmpty()
      .withMessage("Rating is required"),

    body("description")
      .isString()
      .withMessage("Description must be a string")
      .notEmpty()
      .withMessage("Description is required"),

    body("director")
      .isString()
      .withMessage("Director must be a string")
      .notEmpty()
      .withMessage("Director is required"),

    body("stars")
      .isInt({ min: 1, max: 5 })
      .withMessage("Stars must be an integer between 1 and 5")
      .notEmpty()
      .withMessage("Stars is required"),

    body("poster").optional().isURL().withMessage("Poster must be a url."),

    body("actors")
      .isArray()
      .withMessage("Actors must be an array")
      .notEmpty()
      .withMessage("Actors is required"),
  ];
};

export const findOneMovieValidation = () => {
  return [
    param("id")
      .isString()
      .withMessage("id must be string.")
      .notEmpty()
      .withMessage("id is required.")
      .equals("id")
      .withMessage("id is required."),
  ];
};

export const updateMovieValidation = () => {
  return [
    param("id")
      .isString()
      .withMessage("id must be string.")
      .notEmpty()
      .withMessage("id is required.")
      .equals("id")
      .withMessage("id is required."),
  ];
};
