import request from "supertest";
import app from "../app";

export abstract class CrudTestHelper {
  protected token: string = "";
  protected endpoint: string = "";

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  setToken(token: string) {
    this.token = token;
  }

  protected getHeaders() {
    return {
      Authorization: `Bearer ${this.token}`,
    };
  }

  async create(payload: any) {
    return request(app)
      .post(this.endpoint)
      .set(this.getHeaders())
      .send(payload);
  }

  async getAll() {
    return request(app).get(this.endpoint).set(this.getHeaders());
  }
  async getOne(id: string) {
    return request(app).get(`${this.endpoint}/${id}`).set(this.getHeaders());
  }
  async update(id: string, payload: any) {
    return request(app)
      .put(`${this.endpoint}/${id}`)
      .set(this.getHeaders())
      .send(payload);
  }

  async delete(id: string) {
    return request(app).delete(`${this.endpoint}/${id}`).set(this.getHeaders());
  }
}
