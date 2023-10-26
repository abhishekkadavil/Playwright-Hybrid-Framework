import { expect } from "chai";
import supertest from "supertest";
const request = supertest("https://gorest.co.in/public/v2");

const TOKEN =
  "b0aef0021b39d875cfba3e9f192aac861c77a871c224d0ec76d467b43049061a";

describe("Users", () => {
  it("GET ", async () => {
    const res = await request
      .get("/users/628210")
      .set("Authorization", `Bearer ${TOKEN}`)
      .set("Accept", "application/json");

    console.log(res.body);
    console.log(res.statusCode);
    console.log(res.headers);

    expect(res.status).to.eq(204);
    // expect(res.body.data).not.to.be.empty;
    expect(res.body.data[0].id).to.eq(3);
    expect(res.body.status).to.eq("active");
  });

  it("GET2 ", async () => {
    const res = await request
      .get("/users")
      .set("Authorization", `Bearer ${TOKEN}`)
      .set("Accept", "application/json");

    console.log(res.body);
    console.log(res.statusCode);
    console.log(res.headers);

    expect(res.status).to.eq(200);
  });

  it.only("POST ", async () => {
    const reqBody = {
      email: `allasani-${Math.floor(Math.random() * 999)}@15ced.com`,
      name: "Allasani Peddana",
      gender: "female",
      status: "active",
    };

    const res = await request
      .post("/users")
      .set("Authorization", `Bearer ${TOKEN}`)
      .send(reqBody);
    console.log(res.body);
    expect(res.body).not.to.be.empty;
  });

  it("PUT ", async () => {
    const reqBody = {
      status: "inactive",
    };

    const res = await request
      .put("/users/5339432")
      .set("Authorization", `Bearer ${TOKEN}`)
      .send(reqBody);
    console.log(res.body);
    expect(res.body).not.to.be.empty;
  });

  it("DELETE ", async () => {
    const res = await request
      .delete("/users/5339432")
      .set("Authorization", `Bearer ${TOKEN}`);
    console.log(res.body);
    console.log(res.statusCode);
    console.log(res.headers);
    expect(res.status).to.eq(204);
  });
});