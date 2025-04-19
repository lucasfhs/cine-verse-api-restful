import { timeStamp } from "console";
import { CrudTestHelper } from "../utils/CrudTestHelper";
import { TestEnvironment } from "../utils/TestEnvironment";
import { generateMongodbId } from "../../utils/mongodbIdValidator";

class MessageTestHelper extends CrudTestHelper {
  constructor() {
    super("/message");
  }
  /*
    sender_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: String,
*/
  generateMessagePayload() {
    return {
      sender_id: generateMongodbId(),
      receiver_id: generateMongodbId(),
      content: `Content - ${Date.now().toLocaleString()}`,
    };
  }
}

const messageHelper = new MessageTestHelper();

beforeAll(async () => {
  await TestEnvironment.setup();
  messageHelper.setToken(TestEnvironment.getToken());
}, 10000);

describe("[POST] /message", () => {
  it("should create a new message", async () => {
    const payload = messageHelper.generateMessagePayload();
    const response = await messageHelper.create(payload);
    console.log(response.body);
    expect(response.status).toBe(201);
    expect(response.body.data).toHaveProperty("_id");
    expect(response.body.data.sender_id).toBe(payload.sender_id);
    expect(response.body.data.receiver_id).toBe(payload.receiver_id);
  });
});

describe("[GET] /message", () => {
  it("should return all messages when authorized", async () => {
    const response = await messageHelper.getAll();

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
  });
});

describe("[GET] /message/:id", () => {
  it("should return a message by id", async () => {
    const created = await messageHelper.create(
      messageHelper.generateMessagePayload()
    );
    const id = created.body.data._id;
    const response = await messageHelper.getOne(id);

    expect(response.status).toBe(200);
    expect(response.body.data._id).toBe(id);
  });
});

describe("[PUT] /message/:id", () => {
  it("should update a message by id", async () => {
    const created = await messageHelper.create(
      messageHelper.generateMessagePayload()
    );
    const id = created.body.data._id;
    const payload = {
      sender_id: generateMongodbId(),
      receiver_id: generateMongodbId(),
      content: `Content - ${Date.now().toLocaleString()}`,
    };
    const response = await messageHelper.update(id, {
      sender_id: payload.sender_id,
      receiver_id: payload.receiver_id,
      content: `Content - ${Date.now().toLocaleString()}`,
    });
    console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.sender_id).toBe(payload.sender_id);
    expect(response.body.data.receiver_id).toBe(payload.receiver_id);
  });
});

describe("[DELETE] /message/:id", () => {
  it("should delete a message by id", async () => {
    const created = await messageHelper.create(
      messageHelper.generateMessagePayload()
    );
    const id = created.body.data._id;

    const response = await messageHelper.delete(id);

    expect(response.status).toBe(200);
  });
});

afterAll(async () => {
  TestEnvironment.teardown();
});
