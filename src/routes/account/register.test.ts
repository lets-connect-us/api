import request from "supertest";

import 'module-alias/register';
import app from "../../../src/app";

describe("GET /api", () => {
    it("should return 200 OK", () => {
        return request(app).get("/register")
            .expect(200);
    });
});
