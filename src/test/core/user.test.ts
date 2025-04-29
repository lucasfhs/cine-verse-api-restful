import { CrudTestHelper } from "../../utils/CrudTestHelper";
import { TestEnvironment } from "../../utils/TestEnvironment";
import { generateMongodbId } from "../../utils/mongodbIdValidator";
class UserTestHelper extends CrudTestHelper {
  constructor() {
    super("/user");
  }

  generateUserPayload() {
    const timestamp = Date.now();
    return {
      name: `User Test ${timestamp}`,
      accountId: generateMongodbId(),
      role: "common",
      avatar: "https://example.com/avatar.png",
      phoneNumbers: ["+1234567890", "+0987654321"],
      address: {
        street: "123 Main St",
        neighborhood: "Downtown",
        city: "New York",
        state: "NY",
        postalCode: "10001",
        country: "USA",
      },
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
    console.log(response.body);

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

describe("[GET] /user/:id", () => {
  it("should return a user by id", async () => {
    const created = await userHelper.create(userHelper.generateUserPayload());
    const id = created.body.data._id;
    const response = await userHelper.getOne(id);

    expect(response.status).toBe(200);
    expect(response.body.data._id).toBe(id);
  });
});

describe("[PUT] /user/:id", () => {
  it("should update a user by id", async () => {
    const created = await userHelper.create(userHelper.generateUserPayload());
    const id = created.body.data._id;
    const expected = `Updated Name ${Date.now().toLocaleString()}`;
    const response = await userHelper.update(id, {
      name: expected,
    });

    expect(response.status).toBe(200);
    expect(response.body.data.name).toBe(expected);
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
