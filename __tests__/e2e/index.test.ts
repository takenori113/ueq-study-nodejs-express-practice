import { test, expect } from "@playwright/test";
import { ChildProcessWithoutNullStreams, spawn } from "child_process";

import { todoList } from "../../todoList";

let serverProcess: ChildProcessWithoutNullStreams;

test.beforeAll("setup", () => {
  serverProcess = spawn("node", ["./index.js"]);
});

test.afterAll("teardown", () => {
  serverProcess.kill("SIGINT");
});

test.describe("expressでサーバーを実装", async () => {
  test("GETリクエストでデータが全件取得できる", async ({ page }) => {
    const response = await page.goto("/todo");
    const data = await response?.json();
    await expect(data).toEqual(todoList);
  });
  test("GETリクエストでID指定したデータが取得できる", async ({ page }) => {
    const response = await page.goto("/todo/1");
    const data = await response?.json();
    await expect(data).toEqual(todoList[0]);
  });
  test("GETリクエストでID指定したデータが見つからない場合は404エラーに", async ({
    page,
  }) => {
    const response = await page.goto("/todo/100");
    await expect(response?.status()).toEqual(404);
  });
  test("GETリクエストでタイトルの部分一致検索でデータが取得できる", async ({
    page,
  }) => {
    const response = await page.goto("/todo?title=プレゼン");
    const data = await response?.json();
    await expect(data).toEqual([todoList[1]]);
  });
  test("POSTリクエストで送ったJSONデータがそのまま返ってくる", async ({
    page,
  }) => {
    const request = {
      id: 3,
      title: "食事の予約",
      completed: false,
      createdAt: "2023-11-25T18:45:00Z",
    };
    const response = await page.request.post("/todo", { data: request });
    const data = await response?.json();
    await expect(data).toEqual(request);
  });
});
