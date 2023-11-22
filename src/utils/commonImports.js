import supertest from "supertest";
import config from "./config.js";
const request = supertest(config.baseAPIUrl);

export default request;