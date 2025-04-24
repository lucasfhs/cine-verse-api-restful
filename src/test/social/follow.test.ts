import { timeStamp } from "console";
import { CrudTestHelper } from "../../utils/CrudTestHelper";
import { TestEnvironment } from "../../utils/TestEnvironment";
import { generateMongodbId } from "../../utils/mongodbIdValidator";

class FollowTestHelper extends CrudTestHelper {
  constructor() {
    super("/follow");
  }
  /*
      follower_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    followed_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  
  */

  generateFollowPayload() {
    return {
      follower_id: generateMongodbId(),
      followed_id: generateMongodbId(),
    };
  }
}

const followHelper = new FollowTestHelper();

beforeAll(async () => {
  await TestEnvironment.setup();
  followHelper.setToken(TestEnvironment.getToken());
}, 10000);

describe("[POST] /follow", () => {
  it("should create a new follow", async () => {
    const payload = followHelper.generateFollowPayload();
    const response = await followHelper.create(payload);
    console.log(response.body);
    expect(response.status).toBe(201);
    expect(response.body.data).toHaveProperty("_id");
    expect(response.body.data.followed_id).toBe(payload.followed_id);
    expect(response.body.data.follower_id).toBe(payload.follower_id);
  });
});

describe("[GET] /follow", () => {
  it("should return all follows when authorized", async () => {
    const response = await followHelper.getAll();

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
  });
});

describe("[GET] /follow/:id", () => {
  it("should return a follow by id", async () => {
    const created = await followHelper.create(
      followHelper.generateFollowPayload()
    );
    const id = created.body.data._id;
    const response = await followHelper.getOne(id);

    expect(response.status).toBe(200);
    expect(response.body.data._id).toBe(id);
  });
});

describe("[PUT] /follow/:id", () => {
  it("should update a follow by id", async () => {
    const created = await followHelper.create(
      followHelper.generateFollowPayload()
    );
    const id = created.body.data._id;
    const payload = {
      follower_id: generateMongodbId(),
      followed_id: generateMongodbId(),
    };
    const response = await followHelper.update(id, {
      follower_id: payload.follower_id,
      followed_id: payload.followed_id,
    });
    expect(response.status).toBe(200);
    expect(response.body.data.followed_id).toBe(payload.followed_id);
    expect(response.body.data.follower_id).toBe(payload.follower_id);
  });
});

describe("[DELETE] /follow/:id", () => {
  it("should delete a follow by id", async () => {
    const created = await followHelper.create(
      followHelper.generateFollowPayload()
    );
    const id = created.body.data._id;

    const response = await followHelper.delete(id);

    expect(response.status).toBe(200);
  });
});

afterAll(async () => {
  TestEnvironment.teardown();
});
