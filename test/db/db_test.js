import { DatabaseSync } from "node:sqlite";
import { describe, it } from "node:test";
import { init, signIn, signUp } from "../../src/db/db.js";
import { assertEquals } from "@std/assert";

describe("Testing db", () => {
  const db = new DatabaseSync(":memory:");
  it("init function should create tables for me", () => {
    init(db);
    const actual = db.prepare(
      `SELECT name FROM sqlite_master WHERE type = 'table' AND name != 'sqlite_sequence'`,
    ).all().length;

    assertEquals(actual, 1);
  });

  it("signUp function should return the id it gets after pushing data to db", () => {
    const actual = signUp(db, { name: "Dummy", password: "dummy1234" });
    assertEquals(actual, 1);
  });

  it("signIn function should return user object if found", () => {
    const user = signIn(db, { id: 1, password: "dummy1234" });
    assertEquals(user, { id: 1, name: "Dummy", password: "dummy1234" });
  });

  it("signIn function should return undefined if password or id doesn't match", () => {
    const user = signIn(db, { id: 1, password: "dummy123" });
    assertEquals(user, undefined);
  });
});
