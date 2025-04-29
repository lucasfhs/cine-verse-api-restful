import { CrudTestHelper } from "../../utils/CrudTestHelper";
import { TestEnvironment } from "../../utils/TestEnvironment";

class ActorTestHelper extends CrudTestHelper {
  constructor() {
    super("/actor");
  }

  generateActorPayload() {
    const timestamp = Date.now();
    return {
      name: `Test Actor${timestamp}`,
      birthdate: timestamp,
      nationality: "Brazil",
    };
  }
}

const actorHelper = new ActorTestHelper();

beforeAll(async () => {
  await TestEnvironment.setup();
  actorHelper.setToken(TestEnvironment.getToken());
}, 10000);

describe("[POST] /actor", () => {
  it("should create a new actor", async () => {
    const payload = actorHelper.generateActorPayload();
    const response = await actorHelper.create(payload);

    expect(response.status).toBe(201);
    expect(response.body.data).toHaveProperty("_id");
    expect(response.body.data.name).toBe(payload.name);
    expect(response.body.data.nationality).toBe(payload.nationality);
  });
});

describe("[GET] /actor", () => {
  it("should return all actors when authorized", async () => {
    const response = await actorHelper.getAll();

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
  });
});

describe("[GET] /actor/:id", () => {
  it("should return an actor by id", async () => {
    const created = await actorHelper.create(
      actorHelper.generateActorPayload()
    );
    const id = created.body.data._id;
    const response = await actorHelper.getOne(id);

    expect(response.status).toBe(200);
    expect(response.body.data._id).toBe(id);
  });
});

describe("[PUT] /actor/:id", () => {
  it("should update an actor by id", async () => {
    const created = await actorHelper.create(
      actorHelper.generateActorPayload()
    );
    const id = created.body.data._id;

    const response = await actorHelper.update(id, {
      name: "Updated Name",
    });

    expect(response.status).toBe(200);
    expect(response.body.data.name).toBe("Updated Name");
  });
});

describe("[DELETE] /actor/:id", () => {
  it("should delete an actor by id", async () => {
    const created = await actorHelper.create(
      actorHelper.generateActorPayload()
    );
    const id = created.body.data._id;

    const response = await actorHelper.delete(id);

    expect(response.status).toBe(200);
  });
});

afterAll(async () => {
  await TestEnvironment.teardown();
});
