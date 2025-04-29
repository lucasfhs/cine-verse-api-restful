import { body, param } from "express-validator";
import { isValidMongodbId } from "@/utils/mongodbIdValidator";
import { capitalizeName } from "@/utils/stringUtils";

enum UserRole {
  Admin = "admin",
  Common = "common",
  FilmCritic = "film critic",
}

const isValidUserRole = (value: string): boolean => {
  return Object.values(UserRole).includes(value as UserRole);
};

export const findOneUserValidation = () => [
  param("id")
    .isString()
    .withMessage("id must be a string.")
    .notEmpty()
    .withMessage("id is required.")
    .custom(isValidMongodbId),
];

export const userCreateValidation = () => [
  body("name")
    .isString()
    .withMessage("The name must be a string.")
    .notEmpty()
    .withMessage("The name is required.")
    .trim()
    .customSanitizer(capitalizeName),

  body("role")
    .trim()
    .notEmpty()
    .withMessage("The role is required.")
    .custom(isValidUserRole)
    .withMessage(
      "Invalid user role. Accepted values: 'common', 'admin', 'film critic'."
    ),
  body("accountId")
    .isString()
    .withMessage("accountId must be a string.")
    .notEmpty()
    .withMessage("accountId is required.")
    .custom(isValidMongodbId),
  body("avatar")
    .isURL()
    .withMessage("The avatar field must be a valid URL.")
    .optional(),

  body("phoneNumbers")
    .isArray({ min: 1 })
    .withMessage("The phoneNumbers field must be a non-empty array.")
    .optional(),

  body("phoneNumbers.*")
    .isString()
    .withMessage("Each phone number must be a string.")
    .optional()
    .trim(),
  body("address.street")
    .isString()
    .withMessage("Street must be a string.")
    .optional(),
  body("address.neighborhood")
    .isString()
    .withMessage("Neighborhood must be a string.")
    .optional(),
  body("address.city")
    .isString()
    .withMessage("City must be a string.")
    .optional(),
  body("address.state")
    .isString()
    .withMessage("State must be a string.")
    .optional(),
  body("address.postalCode")
    .isString()
    .withMessage("Postal code must be a string.")
    .optional(),
  body("address.country")
    .isString()
    .withMessage("Country must be a string.")
    .optional(),
];

export const updateUserValidation = () => [
  param("id")
    .isString()
    .withMessage("id must be a string.")
    .notEmpty()
    .withMessage("id is required.")
    .custom(isValidMongodbId),

  body("name")
    .isString()
    .withMessage("The name must be a string.")
    .optional()
    .trim()
    .customSanitizer(capitalizeName),

  body("role")
    .optional()
    .trim()
    .custom(isValidUserRole)
    .withMessage(
      "Invalid user role. Accepted values: 'common', 'admin', 'film critic'."
    ),

  body("avatar")
    .isURL()
    .withMessage("The avatar field must be a valid URL.")
    .optional()
    .trim(),

  body("phoneNumbers")
    .isArray()
    .withMessage("The phoneNumbers field must be an array.")
    .optional(),

  body("phoneNumbers.*")
    .isString()
    .withMessage("Each phone number must be a string.")
    .optional()
    .trim(),
  body("address.street")
    .isString()
    .withMessage("Street must be a string.")
    .optional(),
  body("address.neighborhood")
    .isString()
    .withMessage("Neighborhood must be a string.")
    .optional(),
  body("address.city")
    .isString()
    .withMessage("City must be a string.")
    .optional(),
  body("address.state")
    .isString()
    .withMessage("State must be a string.")
    .optional(),
  body("address.postalCode")
    .isString()
    .withMessage("Postal code must be a string.")
    .optional(),
  body("address.country")
    .isString()
    .withMessage("Country must be a string.")
    .optional(),
];

export const deleteOneUserValidation = () => [
  param("id")
    .isString()
    .withMessage("id must be a string.")
    .notEmpty()
    .withMessage("id is required.")
    .custom(isValidMongodbId),
];
