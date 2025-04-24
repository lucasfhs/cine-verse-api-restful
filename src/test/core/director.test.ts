import { timeStamp } from "console";
import { CrudTestHelper } from "../../utils/CrudTestHelper";
import { TestEnvironment } from "../../utils/TestEnvironment";

class DirectorTestHelper extends CrudTestHelper {
  constructor() {
    super("/director");
  }

  generateDirectorPayload() {
    const timestamp = Date.now();
    return {
      name: `Test Director${timestamp}`,
      birthdate: timestamp,
      nationality: "Brazil",
    };
  }
}

const directorHelper = new DirectorTestHelper();

beforeAll(async () => {
  await TestEnvironment.setup();
  directorHelper.setToken(TestEnvironment.getToken());
}, 10000);

describe("[POST] /director", () => {
  it("should create a new director", async () => {
    const payload = directorHelper.generateDirectorPayload();
    const response = await directorHelper.create(payload);

    expect(response.status).toBe(201);
    expect(response.body.data).toHaveProperty("_id");
    expect(response.body.data.name).toBe(payload.name);
  });
});

describe("[GET] /director", () => {
  it("should return all directors when authorized", async () => {
    const response = await directorHelper.getAll();

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
  });
});

describe("[GET] /director/:id", () => {
  it("should return a director by id", async () => {
    const created = await directorHelper.create(
      directorHelper.generateDirectorPayload()
    );
    const id = created.body.data._id;
    const response = await directorHelper.getOne(id);

    expect(response.status).toBe(200);
    expect(response.body.data._id).toBe(id);
  });
});

describe("[PUT] /director/:id", () => {
  it("should update a director by id", async () => {
    const created = await directorHelper.create(
      directorHelper.generateDirectorPayload()
    );
    const id = created.body.data._id;

    const response = await directorHelper.update(id, {
      name: "Updated Name",
    });

    expect(response.status).toBe(200);
    expect(response.body.data.name).toBe("Updated Name");
  });
});

describe("[DELETE] /director/:id", () => {
  it("should delete a director by id", async () => {
    const created = await directorHelper.create(
      directorHelper.generateDirectorPayload()
    );
    const id = created.body.data._id;

    const response = await directorHelper.delete(id);

    expect(response.status).toBe(200);
  });
});

afterAll(async () => {
  TestEnvironment.teardown();
});
