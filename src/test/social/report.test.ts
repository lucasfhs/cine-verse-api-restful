import { timeStamp } from "console";
import { CrudTestHelper } from "../../utils/CrudTestHelper";
import { TestEnvironment } from "../../utils/TestEnvironment";
import { generateMongodbId } from "../../utils/mongodbIdValidator";

class ReportTestHelper extends CrudTestHelper {
  constructor() {
    super("/report");
  }
  /*
    user_id: {
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
  generateReportPayload() {
    return {
      user_id: generateMongodbId(),
      review_id: generateMongodbId(),
      reason: `Reason - ${Date.now().toLocaleString()}`,
    };
  }
}

const reportHelper = new ReportTestHelper();

beforeAll(async () => {
  await TestEnvironment.setup();
  reportHelper.setToken(TestEnvironment.getToken());
}, 10000);

describe("[POST] /report", () => {
  it("should create a new report", async () => {
    const payload = reportHelper.generateReportPayload();
    const response = await reportHelper.create(payload);
    console.log(response.body);
    expect(response.status).toBe(201);
    expect(response.body.data).toHaveProperty("_id");
    expect(response.body.data.user_id).toBe(payload.user_id);
    expect(response.body.data.review_id).toBe(payload.review_id);
  });
});

describe("[GET] /report", () => {
  it("should return all reports when authorized", async () => {
    const response = await reportHelper.getAll();

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
  });
});

describe("[GET] /report/:id", () => {
  it("should return a report by id", async () => {
    const created = await reportHelper.create(
      reportHelper.generateReportPayload()
    );
    const id = created.body.data._id;
    const response = await reportHelper.getOne(id);

    expect(response.status).toBe(200);
    expect(response.body.data._id).toBe(id);
  });
});

describe("[PUT] /report/:id", () => {
  it("should update a report by id", async () => {
    const created = await reportHelper.create(
      reportHelper.generateReportPayload()
    );
    const id = created.body.data._id;
    const payload = {
      user_id: generateMongodbId(),
      review_id: generateMongodbId(),
      reason: `Reason - ${Date.now().toLocaleString()}`,
    };
    const response = await reportHelper.update(id, {
      user_id: payload.user_id,
      review_id: payload.review_id,
      reason: `Reason - ${Date.now().toLocaleString()}`,
    });
    console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.user_id).toBe(payload.user_id);
    expect(response.body.data.review_id).toBe(payload.review_id);
  });
});

describe("[DELETE] /report/:id", () => {
  it("should delete a report by id", async () => {
    const created = await reportHelper.create(
      reportHelper.generateReportPayload()
    );
    const id = created.body.data._id;

    const response = await reportHelper.delete(id);

    expect(response.status).toBe(200);
  });
});

afterAll(async () => {
  TestEnvironment.teardown();
});
