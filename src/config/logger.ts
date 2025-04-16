import winston from "winston";
import "dotenv/config";
// Log configurations
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const level = () => {
  const env = process.env.ENV || "development";
  return env === "development" ? "debug" : "warn";
};

const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
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
    level: "http",
  }),
  new winston.transports.File({
    filename: "src/logs/error/error.log",
    level: "error",
  }),
  new winston.transports.File({
    filename: "src/logs/all.log",
    level: "http",
  }),
];

// Singleton
class Logger {
  private static instance: winston.Logger;

  private constructor() {}

  public static getInstance(): winston.Logger {
    if (!Logger.instance) {
      Logger.instance = winston.createLogger({
        level: level(),
        levels,
        format,
        transports,
      });
    }
    return Logger.instance;
  }
}

export default Logger.getInstance();
