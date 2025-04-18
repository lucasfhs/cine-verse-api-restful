// test/utils/TestEnvironment.ts
import Database from "../../config/database";
import RedisDB from "../../config/redis";
import request from "supertest";
import app from "../../app";

export class TestEnvironment {
  private static token: string;

  static async setup(): Promise<void> {
    await Database.getInstance();
    await RedisDB.getInstance();
    if (!TestEnvironment.token) {
      const loginResponse = await request(app)
        .post("/login")
        .send({ email: "admin@admin.com", password: "admin" });
      if (!loginResponse) {
        console.log(
          "Please register the user with the email 'admin@admin.com' and password 'admin' to run the tests."
        );
      }
      this.token = loginResponse.body.accessToken;
    }
  }

  static async teardown(): Promise<void> {
    if (Database.getConnectionStatus && Database.getConnectionStatus()) {
      await Database.disconnect();
    }
    if (RedisDB.getConnectionStatus && RedisDB.getConnectionStatus()) {
      await RedisDB.disconnect();
    }
  }

  static getToken(): string {
    return this.token;
  }
}
