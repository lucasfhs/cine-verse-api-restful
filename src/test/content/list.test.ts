import { timeStamp } from "console";
import { CrudTestHelper } from "../../utils/CrudTestHelper";
import { TestEnvironment } from "../../utils/TestEnvironment";
import { generateMongodbId } from "../../utils/mongodbIdValidator";

class ListTestHelper extends CrudTestHelper {
  constructor() {
    super("/list");
  }

  /*
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      unique: true,
      required: true,
    },
    description: { type: String, required: true },
    movies: [{ type: Schema.Types.ObjectId, ref: "Movie" }],  

*/

  generateListPayload() {
    const timestamp = Date.now();
    return {
      user_id: generateMongodbId(),
      name: `List Name Test ${Date.now().toLocaleString()}`,
      description: `${Date.now().toLocaleString()}`,
      movies: [generateMongodbId()],
    };
  }
}

const listHelper = new ListTestHelper();

beforeAll(async () => {
  await TestEnvironment.setup();
  listHelper.setToken(TestEnvironment.getToken());
}, 10000);

describe("[POST] /list", () => {
  it("should create a new list", async () => {
    const payload = listHelper.generateListPayload();
    const response = await listHelper.create(payload);
    console.log(response.body);
    expect(response.status).toBe(201);
    expect(response.body.data).toHaveProperty("_id");
    expect(response.body.data.name).toBe(payload.name);
    expect(response.body.data.description).toBe(payload.description);
    expect(response.body.data.user_id).toBe(payload.user_id);
  });
});

describe("[GET] /list", () => {
  it("should return all lists when authorized", async () => {
    const response = await listHelper.getAll();

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
  });
});

describe("[GET] /list/:id", () => {
  it("should return a list by id", async () => {
    const created = await listHelper.create(listHelper.generateListPayload());
    const id = created.body.data._id;
    const response = await listHelper.getOne(id);

    expect(response.status).toBe(200);
    expect(response.body.data._id).toBe(id);
  });
});

describe("[PUT] /list/:id", () => {
  it("should update a list by id", async () => {
    const created = await listHelper.create(listHelper.generateListPayload());
    const id = created.body.data._id;
    const payload = {
      user_id: generateMongodbId(),
      name: `List Name Test ${Date.now().toLocaleString()}`,
      description: `${Date.now().toLocaleString()}`,
      movies: [generateMongodbId()],
    };
    const response = await listHelper.update(id, {
      user_id: payload.user_id,
      name: payload.name,
      description: payload.description,
      movies: payload.movies,
    });
    expect(response.status).toBe(200);
    expect(response.body.data.name).toBe(payload.name);
    expect(response.body.data.description).toBe(payload.description);
    expect(response.body.data.user_id).toBe(payload.user_id);
  });
});

describe("[DELETE] /list/:id", () => {
  it("should delete a list by id", async () => {
    const created = await listHelper.create(listHelper.generateListPayload());
    const id = created.body.data._id;

    const response = await listHelper.delete(id);

    expect(response.status).toBe(200);
  });
});

afterAll(async () => {
  TestEnvironment.teardown();
});
