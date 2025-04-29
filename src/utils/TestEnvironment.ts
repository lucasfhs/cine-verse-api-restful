// test/utils/TestEnvironment.ts
import Database from "../config/database";
import RedisDB from "../config/redis";
import request from "supertest";
import app from "../app";

export class TestEnvironment {
  private static token: string;

  private static async loginTestUser() {
    const loginResponse = await request(app)
      .post("/login")
      .send({ email: "test@test.com", password: "g$ao3~C{E-9)9s[w8;bZ_" });
    return loginResponse;
  }

  private static async testUserSetup() {
    if (TestEnvironment.token) return;

    let userLogin = await TestEnvironment.loginTestUser();

    if (!userLogin.ok) {
      await request(app).post("/register").send({
        username: "test-jest",
        email: "test@test.com",
        password: "g$ao3~C{E-9)9s[w8;bZ_",
        rePassword: "g$ao3~C{E-9)9s[w8;bZ_",
        recoveryEmail: "recoveryEmailTest@test.com",
        securityAnswer: "jest-test",
      });
      userLogin = await TestEnvironment.loginTestUser();
    }

    TestEnvironment.token = userLogin.body.accessToken;
  }
  static async setup(): Promise<void> {
    await RedisDB.getInstance();
    await Database.getInstance();
    await TestEnvironment.testUserSetup();
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
