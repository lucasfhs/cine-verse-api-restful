import jwt from "jsonwebtoken";

/**
 * Gera um Access Token de curta duração
 * @param userId ID do usuário
 * @returns Access Token JWT
 */
export const generateAccessToken = (userId: string): string => {
  const secret = process.env.ACCESS_TOKEN_SECRET;
  const expiresIn = process.env.ACCESS_TOKEN_EXPIRATION ?? "15m"; // Define um tempo padrão

  if (!secret) {
    throw new Error(
      "ACCESS_TOKEN_SECRET is not defined in environment variables"
    );
  }

  return jwt.sign({ userId }, secret, {
    expiresIn: expiresIn as jwt.SignOptions["expiresIn"],
  });
};

/**
 * Gera um Refresh Token de longa duração
 * @param userId ID do usuário
 * @returns Refresh Token JWT
 */
export const generateRefreshToken = (userId: string): string => {
  const secret = process.env.REFRESH_TOKEN_SECRET;
  const expiresIn = process.env.REFRESH_TOKEN_EXPIRATION ?? "7d"; // Define um tempo padrão

  if (!secret) {
    throw new Error(
      "REFRESH_TOKEN_SECRET is not defined in environment variables"
    );
  }

  return jwt.sign({ userId }, secret, {
    expiresIn: expiresIn as jwt.SignOptions["expiresIn"],
  });
};
