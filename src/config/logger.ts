import winston from "winston";
import "dotenv/config";

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3, // Nível específico para logs HTTP
  debug: 4,
};

const level = () => {
  const env = process.env.ENV || "development";
  return env === "development" ? "debug" : "warn"; // Retorna em minúsculo
};

const colors = {
  error: "red",
  warn: "yellow", // Corrigido de "warm" para "warn"
  info: "green",
  http: "magenta", // Cor para logs HTTP
  debug: "white",
};

winston.addColors(colors);

const format = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`
  )
);

const transports = [
  new winston.transports.Console({
    level: "http", // Mostra todos os logs a partir de http
  }),
  new winston.transports.File({
    filename: "src/logs/error/error.log",
    level: "error",
  }),
  new winston.transports.File({
    filename: "src/logs/all.log",
    level: "http", // Grava todos os logs a partir de http
  }),
];

const Logger = winston.createLogger({
  level: level(), // Nível global (só afeta se não tiver nível no transporte)
  levels,
  format,
  transports,
});

export default Logger;
