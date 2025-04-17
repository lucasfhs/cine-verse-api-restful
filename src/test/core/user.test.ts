import request from "supertest";
import app from "../../app";
import db from "../../config/db";
import mongoose from "mongoose";

let token: string;

beforeAll(async () => {
  console.log("Cheguei aqui");
  await db();
  const response = await request(app)
    .post("/login")
    .send({ email: "admin@admin.com", password: "admin" });

  token = response.body.accessToken;
}, 10000);

describe("[GET] /user", () => {
  it("Find All Users", async () => {
    const response = await request(app)
      .get("/user")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
  });
});
