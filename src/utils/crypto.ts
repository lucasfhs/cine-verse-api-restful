import crypto from "crypto";

const algorithm = "aes-256-cbc";
const secretKey = process.env.MESSAGE_SECRET_KEY as string;

if (!secretKey || secretKey.length !== 32) {
  throw new Error(
    "MESSAGE_SECRET_KEY must be defined and be 32 characters long"
  );
}

export function encryptMessage(message: string): string {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey), iv);
  let encrypted = cipher.update(message, "utf-8", "hex");
  encrypted += cipher.final("hex");

  return iv.toString("hex") + ":" + encrypted;
}

export function decryptMessage(encryptedMessage: string): string {
  const [ivHex, encrypted] = encryptedMessage.split(":");
  const iv = Buffer.from(ivHex, "hex");
  const decipher = crypto.createDecipheriv(
    algorithm,
    Buffer.from(secretKey),
    iv
  );
  let decrypted = decipher.update(encrypted, "hex", "utf-8");
  decrypted += decipher.final("utf-8");

  return decrypted;
}
