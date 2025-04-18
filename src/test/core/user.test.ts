import request from "supertest";
import app from "../../app";
import Database from "../../config/database";
import RedisDB from "../../config/redis";

let token: string;

beforeAll(async () => {
  await Database.getInstance();
  await RedisDB.getInstance();

  const loginResponse = await request(app)
    .post("/login")
    .send({ email: "admin@admin.com", password: "admin" });

  token = loginResponse.body.accessToken;
}, 10000);

describe("[POST] /user", () => {
  it("should create a new user", async () => {
    // arrange:
    const endpoint = "/user";
    const payload = {
      name: "Test User",
      nickname: `user_${Date.now()}`,
      email: `user_${Date.now()}@example.com`,
      password: "123456",
      avatar: "https://www.google.com/",
      phoneNumber: ["3133888395"],
      role: "common",
    };
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const expectedStatusCode = 201;

    // act:
    const response = await request(app)
      .post(endpoint)
      .set(headers)
      .send(payload);

    // assert:
    expect(response.status).toBe(expectedStatusCode);
    expect(response.body.data).toHaveProperty("_id");
    expect(response.body.data.name).toBe(payload.name);
    expect(response.body.data.email).toBe(payload.email);
  });
});

describe("[GET] /user", () => {
  it("should return all users when authorized", async () => {
    // arrange:
    const endpoint = "/user";
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const expectedStatusCode = 200;

    // act:
    const response = await request(app).get(endpoint).set(headers);

    // assert:
    expect(response.status).toBe(expectedStatusCode);
    expect(Array.isArray(response.body.data)).toBe(true);
  });
});

describe("[PUT] /user/:id", () => {
  it("should update a user by id", async () => {
    // arrange:
    const createResponse = await request(app)
      .post("/user")
      .set({ Authorization: `Bearer ${token}` })
      .send({
        name: "Update Test User",
        nickname: `user_update_${Date.now()}`,
        email: `user_update_${Date.now()}@example.com`,
        password: "123456",
        avatar: "https://www.google.com/",
        phoneNumber: ["3133888395"],
        role: "common",
      });

    const userId = createResponse.body.data._id;
    const endpoint = `/user/${userId}`;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const payload = {
      name: "Updated Name",
    };
    const expectedStatusCode = 200;

    // act:
    const response = await request(app)
      .put(endpoint)
      .set(headers)
      .send(payload);

    // assert:
    expect(response.status).toBe(expectedStatusCode);
    expect(response.body.data.name).toBe(payload.name);
  });
});

describe("[DELETE] /user/:id", () => {
  it("should delete a user by id", async () => {
    // arrange:
    const createResponse = await request(app)
      .post("/user")
      .set({ Authorization: `Bearer ${token}` })
      .send({
        name: "Delete User",
        nickname: `user_delete_${Date.now()}`,
        email: `user_delete_${Date.now()}@example.com`,
        password: "123456",
        avatar: "https://www.google.com/",
        phoneNumber: ["3133888395"],
        role: "common",
      });

    const userId = createResponse.body.data._id;
    const endpoint = `/user/${userId}`;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const expectedStatusCode = 200;

    // act:
    const response = await request(app).delete(endpoint).set(headers);

    // assert:
    expect(response.status).toBe(expectedStatusCode);
  });
});

afterAll(async () => {
  if (Database.getConnectionStatus && Database.getConnectionStatus()) {
    await Database.disconnect();
  }
  if (RedisDB.getConnectionStatus && RedisDB.getConnectionStatus()) {
    await RedisDB.disconnect();
  }
});
