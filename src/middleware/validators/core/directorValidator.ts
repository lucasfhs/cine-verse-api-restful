import { body, param } from "express-validator";
import { isValidMongodbId } from "../../../utils/mongodbIdValidator";
import { capitalizeName } from "../../../utils/stringUtils";

export const findOneDirectorValidation = () => {
  return [
    param("id")
      .isString()
      .withMessage("id must be a string.")
      .notEmpty()
      .withMessage("id is required.")
      .custom(isValidMongodbId),
  ];
};
// # TODO: Criar uma validação para data no formato ISO
export const directorCreateValidation = () => {
  return [
    body("name")
      .isString()
      .withMessage("The name must be a string.")
      .notEmpty()
      .withMessage("The name is required.")
      .trim()
      .customSanitizer(capitalizeName),
    body("birthdate")
      .optional()
      // .isDate()
      // .withMessage("The birthdate must be a valid past date.")
      .toDate(),
    body("nationality")
      .optional()
      .isString()
      .withMessage("The nationality must be a string.")
      .trim(),
  ];
};

export const updateDirectorValidation = () => {
  return [
    param("id")
      .isString()
      .withMessage("id must be a string.")
      .notEmpty()
      .withMessage("id is required.")
      .custom(isValidMongodbId),
    body("name")
      .optional()
      .isString()
      .withMessage("The name must be a string.")
      .trim()
      .customSanitizer(capitalizeName),
    body("birthdate")
      .optional()
      .isDate()
      .withMessage("The birthdate must be a valid date."),
    body("nationality")
      .optional()
      .isString()
      .withMessage("The nationality must be a string."),
  ];
};
export const deleteOneDirectorValidation = () => {
  return [
    param("id")
      .isString()
      .withMessage("id must be a string.")
      .notEmpty()
      .withMessage("id is required.")
      .custom(isValidMongodbId),
  ];
};

// TODO: FALTA VERIFICAR SE AS ROTAS FUNCIONAM LEGAL
