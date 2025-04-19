import { timeStamp } from "console";
import { CrudTestHelper } from "../utils/CrudTestHelper";
import { TestEnvironment } from "../utils/TestEnvironment";
import { generateMongodbId } from "../../utils/mongodbIdValidator";

class CommentTestHelper extends CrudTestHelper {
  constructor() {
    super("/comment");
  }

  generateCommentPayload() {
    const timestamp = Date.now();
    return {
      review_id: generateMongodbId(),
      user_id: generateMongodbId(),
      content: `Content- ${Date.now().toLocaleString()}`,
    };
  }
}

const commentHelper = new CommentTestHelper();

beforeAll(async () => {
  await TestEnvironment.setup();
  commentHelper.setToken(TestEnvironment.getToken());
}, 10000);

describe("[POST] /comment", () => {
  it("should create a new comment", async () => {
    const payload = commentHelper.generateCommentPayload();
    const response = await commentHelper.create(payload);
    console.log(response.body);
    expect(response.status).toBe(201);
    expect(response.body.data).toHaveProperty("_id");
    expect(response.body.data.review_id).toBe(payload.review_id);
    expect(response.body.data.user_id).toBe(payload.user_id);
  });
});

describe("[GET] /comment", () => {
  it("should return all comments when authorized", async () => {
    const response = await commentHelper.getAll();

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
  });
});

describe("[GET] /comment/:id", () => {
  it("should return a comment by id", async () => {
    const created = await commentHelper.create(
      commentHelper.generateCommentPayload()
    );
    const id = created.body.data._id;
    const response = await commentHelper.getOne(id);

    expect(response.status).toBe(200);
    expect(response.body.data._id).toBe(id);
  });
});

describe("[PUT] /comment/:id", () => {
  it("should update a comment by id", async () => {
    const created = await commentHelper.create(
      commentHelper.generateCommentPayload()
    );
    const id = created.body.data._id;
    const review_id = generateMongodbId();
    const user_id = generateMongodbId();
    const response = await commentHelper.update(id, {
      review_id,
      user_id,
      content: `Update Content - ${Date.now().toLocaleString()}`,
    });

    expect(response.status).toBe(200);
    expect(response.body.data.review_id).toBe(review_id);
    expect(response.body.data.user_id).toBe(user_id);
  });
});

describe("[DELETE] /comment/:id", () => {
  it("should delete a comment by id", async () => {
    const created = await commentHelper.create(
      commentHelper.generateCommentPayload()
    );
    const id = created.body.data._id;

    const response = await commentHelper.delete(id);

    expect(response.status).toBe(200);
  });
});

afterAll(async () => {
  TestEnvironment.teardown();
});
