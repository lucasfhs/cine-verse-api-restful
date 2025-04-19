import { timeStamp } from "console";
import { CrudTestHelper } from "../utils/CrudTestHelper";
import { TestEnvironment } from "../utils/TestEnvironment";
import { generateMongodbId } from "../../utils/mongodbIdValidator";

class LikeTestHelper extends CrudTestHelper {
  constructor() {
    super("/like");
  }

  generateLikePayload() {
    const timestamp = Date.now();
    return {
      review_id: generateMongodbId(),
      user_id: generateMongodbId(),
    };
  }
}

const likeHelper = new LikeTestHelper();

beforeAll(async () => {
  await TestEnvironment.setup();
  likeHelper.setToken(TestEnvironment.getToken());
}, 10000);

describe("[POST] /like", () => {
  it("should create a new like", async () => {
    const payload = likeHelper.generateLikePayload();
    const response = await likeHelper.create(payload);
    console.log(response.body);
    expect(response.status).toBe(201);
    expect(response.body.data).toHaveProperty("_id");
    expect(response.body.data.review_id).toBe(payload.review_id);
    expect(response.body.data.user_id).toBe(payload.user_id);
  });
});

describe("[GET] /like", () => {
  it("should return all likes when authorized", async () => {
    const response = await likeHelper.getAll();

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
  });
});

describe("[GET] /like/:id", () => {
  it("should return a like by id", async () => {
    const created = await likeHelper.create(likeHelper.generateLikePayload());
    const id = created.body.data._id;
    const response = await likeHelper.getOne(id);

    expect(response.status).toBe(200);
    expect(response.body.data._id).toBe(id);
  });
});

describe("[PUT] /like/:id", () => {
  it("should update a like by id", async () => {
    const created = await likeHelper.create(likeHelper.generateLikePayload());
    const id = created.body.data._id;
    const review_id = generateMongodbId();
    const user_id = generateMongodbId();
    const response = await likeHelper.update(id, {
      review_id,
      user_id,
    });

    expect(response.status).toBe(200);
    expect(response.body.data.review_id).toBe(review_id);
    expect(response.body.data.user_id).toBe(user_id);
  });
});

describe("[DELETE] /like/:id", () => {
  it("should delete a like by id", async () => {
    const created = await likeHelper.create(likeHelper.generateLikePayload());
    const id = created.body.data._id;

    const response = await likeHelper.delete(id);

    expect(response.status).toBe(200);
  });
});

afterAll(async () => {
  TestEnvironment.teardown();
});
