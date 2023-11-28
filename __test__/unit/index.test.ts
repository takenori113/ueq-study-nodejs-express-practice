import { describe, test, expect } from "vitest";
import { createRequest, createResponse } from "node-mocks-http";

import { requestTime } from "../../middleware";

describe("自作ミドルウェアの実装", () => {
  test("reqのrequestTimeはnumber", async () => {
    const req = createRequest({
      method: "GET",
      url: "/example",
    });
    const res = createResponse();
    requestTime(req, res, () => {});
    expect(typeof req.requestTime).toEqual("number");
  });
});
