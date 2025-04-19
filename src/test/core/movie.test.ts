import { timeStamp } from "console";
import { CrudTestHelper } from "../utils/CrudTestHelper";
import { TestEnvironment } from "../utils/TestEnvironment";

class MovieTestHelper extends CrudTestHelper {
  constructor() {
    super("/movie");
  }

  generateMoviePayload() {
    const timestamp = Date.now();
    /*
        title: String,
        description: String,
        year: Number,
        genre: [String],
        average_rating: { type: Number, default: 0 },
        tmdb_id: String,
        actors: [{ type: Schema.Types.ObjectId, ref: "Actor" }],
        directors: [{ type: Schema.Types.ObjectId, ref: "Director" }],
    /*/
    return {
      title: `Test Movie${timestamp}`,
      description: `Test Description : ${timestamp}`,
      year: Math.floor(Math.random() * 10 + 2000),
      genre: ["Test Genre"],
      average_rating: Math.floor((Math.random() * 10) % 6),
      tmdb_id: `test_id-${timeStamp}`,
      actors: [`test_id-${timestamp}`],
      directors: [`test_id-${timestamp}`],
    };
  }
}

const movieHelper = new MovieTestHelper();

beforeAll(async () => {
  await TestEnvironment.setup();
  movieHelper.setToken(TestEnvironment.getToken());
}, 10000);

describe("[POST] /movie", () => {
  it("should create a new movie", async () => {
    const payload = movieHelper.generateMoviePayload();
    const response = await movieHelper.create(payload);
    console.log(response.body);
    expect(response.status).toBe(201);
    expect(response.body.data).toHaveProperty("_id");
    expect(response.body.data.title).toBe(payload.title);
  });
});

describe("[GET] /movie", () => {
  it("should return all movies when authorized", async () => {
    const response = await movieHelper.getAll();

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
  });
});

describe("[GET] /movie/:id", () => {
  it("should return a movie by id", async () => {
    const created = await movieHelper.create(
      movieHelper.generateMoviePayload()
    );
    const id = created.body.data._id;
    const response = await movieHelper.getOne(id);

    expect(response.status).toBe(200);
    expect(response.body.data._id).toBe(id);
  });
});

describe("[PUT] /movie/:id", () => {
  it("should update a movie by id", async () => {
    const created = await movieHelper.create(
      movieHelper.generateMoviePayload()
    );
    const id = created.body.data._id;
    const title = `Updated Name${Date.now().toLocaleString()}`;
    const response = await movieHelper.update(id, {
      title,
    });

    expect(response.status).toBe(200);
    expect(response.body.data.title).toBe(title);
  });
});

describe("[DELETE] /movie/:id", () => {
  it("should delete a movie by id", async () => {
    const created = await movieHelper.create(
      movieHelper.generateMoviePayload()
    );
    const id = created.body.data._id;

    const response = await movieHelper.delete(id);

    expect(response.status).toBe(200);
  });
});

afterAll(async () => {
  TestEnvironment.teardown();
});
