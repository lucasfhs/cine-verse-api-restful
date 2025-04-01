import winston from "winston";
import "dotenv/config";

/**
 * Logging levels configuration.
 * @type {Object}
 * @property {number} error - Error level (highest priority).
 * @property {number} warn - Warning level.
 * @property {number} info - Information level.
 * @property {number} http - HTTP traffic level.
 * @property {number} debug - Debug level (lowest priority).
 */
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

/**
 * Determines the appropriate logging level based on environment.
 * @returns {string} The logging level ('debug' for development, 'warn' otherwise).
 */
const level = () => {
  const env = process.env.ENV || "development";
  return env === "development" ? "debug" : "warn";
};

/**
 * Color configuration for different log levels.
 * @type {Object}
 * @property {string} error - Red color for errors.
 * @property {string} warn - Yellow color for warnings.
 * @property {string} info - Green color for info.
 * @property {string} http - Magenta color for HTTP logs.
 * @property {string} debug - White color for debug logs.
 */
const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
};

winston.addColors(colors);

/**
 * Log message format configuration.
 * Combines timestamp, colorization, and custom print format.
 * @type {winston.Logform.Format}
 */
const format = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`
  )
);

/**
 * Transport configurations for logging.
 * @type {winston.transport[]}
 * @property {winston.transports.Console} Console - Log to console with HTTP level.
 * @property {winston.transports.File} File (error) - Log errors to error.log file.
 * @property {winston.transports.File} File (all) - Log all messages (HTTP level and above) to all.log file.
 */
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

/**
 * Winston logger instance configuration.
 * @type {winston.Logger}
 * @property {string} level - Current logging level.
 * @property {Object} levels - Available logging levels.
 * @property {winston.Logform.Format} format - Log message format.
 * @property {winston.transport[]} transports - Configured transports.
 */
const Logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
});

export default Logger;
