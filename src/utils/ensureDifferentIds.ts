import { CustomValidator } from "express-validator";

/**
 * Checks if two body fields are different.
 * @param fieldName The name of the field to be compared.
 */
const validateDifferentFrom = (fieldName: string): CustomValidator => {
  return (value, { req }) => {
    if (value === req.body[fieldName]) {
      throw new Error(`${fieldName} must be different from ${value}`);
    }
    return true;
  };
};
export default validateDifferentFrom;
