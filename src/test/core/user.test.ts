import { CrudTestHelper } from "../utils/CrudTestHelper";
import { TestEnvironment } from "../utils/TestEnvironment";

class UserTestHelper extends CrudTestHelper {
  constructor() {
    super("/user");
  }

  generateUserPayload() {
    const timestamp = Date.now();
    return {
      name: "Test User",
      nickname: `user_${timestamp}`,
      email: `user_${timestamp}@example.com`,
      password: "123456",
      avatar: "https://www.google.com/",
      phoneNumber: ["3133888395"],
      role: "common",
    };
  }
}

const userHelper = new UserTestHelper();

beforeAll(async () => {
  await TestEnvironment.setup();
  userHelper.setToken(TestEnvironment.getToken());
}, 10000);

describe("[POST] /user", () => {
  it("should create a new user", async () => {
    const payload = userHelper.generateUserPayload();
    const response = await userHelper.create(payload);

    expect(response.status).toBe(201);
    expect(response.body.data).toHaveProperty("_id");
    expect(response.body.data.name).toBe(payload.name);
  });
});

describe("[GET] /user", () => {
  it("should return all users when authorized", async () => {
    const response = await userHelper.getAll();

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
  });
});

describe("[PUT] /user/:id", () => {
  it("should update a user by id", async () => {
    const created = await userHelper.create(userHelper.generateUserPayload());
    const id = created.body.data._id;

    const response = await userHelper.update(id, { name: "Updated Name" });

    expect(response.status).toBe(200);
    expect(response.body.data.name).toBe("Updated Name");
  });
});

describe("[DELETE] /user/:id", () => {
  it("should delete a user by id", async () => {
    const created = await userHelper.create(userHelper.generateUserPayload());
    const id = created.body.data._id;

    const response = await userHelper.delete(id);

    expect(response.status).toBe(200);
  });
});

afterAll(async () => {
  TestEnvironment.teardown();
});
