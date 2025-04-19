import { timeStamp } from "console";
import { CrudTestHelper } from "../utils/CrudTestHelper";
import { TestEnvironment } from "../utils/TestEnvironment";
import { generateMongodbId } from "../../utils/mongodbIdValidator";

class ReviewTestHelper extends CrudTestHelper {
  constructor() {
    super("/review");
  }

  generateReviewPayload() {
    return {
      user_id: generateMongodbId(),
      movie_id: generateMongodbId(),
      rating: Math.floor((Math.random() * 10) % 6),
      content: `Content - ${Date.now().toLocaleString()}`,
      spoiler: true,
    };
  }
}

const reviewHelper = new ReviewTestHelper();

beforeAll(async () => {
  await TestEnvironment.setup();
  reviewHelper.setToken(TestEnvironment.getToken());
}, 10000);

describe("[POST] /review", () => {
  it("should create a new review", async () => {
    const payload = reviewHelper.generateReviewPayload();
    const response = await reviewHelper.create(payload);
    console.log(response.body);
    expect(response.status).toBe(201);
    expect(response.body.data).toHaveProperty("_id");
    expect(response.body.data.movie_id).toBe(payload.movie_id);
    expect(response.body.data.rating).toBe(payload.rating);
    expect(response.body.data.user_id).toBe(payload.user_id);
    expect(response.body.data.spoiler).toBe(payload.spoiler);
  });
});

describe("[GET] /review", () => {
  it("should return all reviews when authorized", async () => {
    const response = await reviewHelper.getAll();

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
  });
});

describe("[GET] /review/:id", () => {
  it("should return a review by id", async () => {
    const created = await reviewHelper.create(
      reviewHelper.generateReviewPayload()
    );
    const id = created.body.data._id;
    const response = await reviewHelper.getOne(id);

    expect(response.status).toBe(200);
    expect(response.body.data._id).toBe(id);
  });
});

describe("[PUT] /review/:id", () => {
  it("should update a review by id", async () => {
    const created = await reviewHelper.create(
      reviewHelper.generateReviewPayload()
    );
    const id = created.body.data._id;
    const payload = {
      user_id: generateMongodbId(),
      movie_id: generateMongodbId(),
      rating: Math.floor((Math.random() * 10) % 6),
      content: `Content - ${Date.now().toLocaleString()}`,
      spoiler: true,
    };
    const response = await reviewHelper.update(id, {
      user_id: payload.user_id,
      movie_id: payload.movie_id,
      rating: payload.rating,
      content: payload.content,
      spoiler: payload.spoiler,
    });
    expect(response.status).toBe(200);
    expect(response.body.data.movie_id).toBe(payload.movie_id);
    expect(response.body.data.rating).toBe(payload.rating);
    expect(response.body.data.user_id).toBe(payload.user_id);
    expect(response.body.data.spoiler).toBe(payload.spoiler);
  });
});

describe("[DELETE] /review/:id", () => {
  it("should delete a review by id", async () => {
    const created = await reviewHelper.create(
      reviewHelper.generateReviewPayload()
    );
    const id = created.body.data._id;

    const response = await reviewHelper.delete(id);

    expect(response.status).toBe(200);
  });
});

afterAll(async () => {
  TestEnvironment.teardown();
});
