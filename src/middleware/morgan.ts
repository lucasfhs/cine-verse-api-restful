/**
 * Module for HTTP request logging middleware using Morgan.
 * @module middlewares/morganMiddleware
 */

import morgan from "morgan";
import { StreamOptions } from "morgan";
import Logger from "../config/logger";

/**
 * Stream options for Morgan to direct output to Winston logger.
 * @type {StreamOptions}
 */
const stream: StreamOptions = {
  /**
   * Writes the log message to the HTTP transport of the Winston logger.
   * @function
   * @param {string} message - The log message from Morgan.
   */
  write: (message) => {
    Logger.http(message.trim());
  },
};

/**
 * Determines whether to skip logging based on the current environment.
 * @function
 * @returns {boolean} True if environment is not 'development', false otherwise.
 */
const skip = () => {
  const env = process.env.ENV || "development";
  return env !== "development";
};

/**
 * Morgan middleware configured with custom stream and skip options.
 * Logs HTTP requests with method, URL, status, content length, and response time.
 * @type {import('express').RequestHandler}
 */
const morganMiddleware = morgan(
  ":method :url :status :res[content-length] :response-time ms",
  { stream, skip }
);

export default morganMiddleware;
