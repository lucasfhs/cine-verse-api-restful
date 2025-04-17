import morgan from "morgan";
import { StreamOptions } from "morgan";
import Logger from "../config/logger";

const stream: StreamOptions = {
  write: (message) => {
    Logger.http(message.trim());
  },
};

const skip = () => {
  const env = process.env.ENV || "development";
  return env !== "development";
};

const morganMiddleware = morgan(
  ":method :url :status :res[content-length] :response-time ms",
  { stream, skip }
);

export default morganMiddleware;
