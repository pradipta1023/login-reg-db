import { DatabaseSync } from "node:sqlite";
import { describe, it } from "node:test";
import {
  addTodo,
  deleteTodos,
  getTodos,
  init,
  signIn,
  signUp,
} from "../../src/db/db.js";
import { assertEquals } from "@std/assert";

describe("Testing db", () => {
  const db = new DatabaseSync(":memory:");
  it("init function should create tables for me", () => {
    init(db);
    const actual = db.prepare(
      `SELECT name FROM sqlite_master WHERE type = 'table' AND name != 'sqlite_sequence'`,
    ).all().length;
    assertEquals(actual, 2);
  });

  it("signUp function should return the id it gets after pushing data to db", () => {
    const actual = signUp(db, { name: "Dummy", password: "dummy1234" });
    assertEquals(actual, 1);
  });

  it("signIn function should return user object if found", () => {
    const user = signIn(db, { id: 1, password: "dummy1234" });
    assertEquals(user.body, {
      user_id: 1,
      name: "Dummy",
      password: "dummy1234",
    });
  });

  it("signIn function should return Invalid password if password doesn't match", () => {
    const user = signIn(db, { id: 1, password: "dummy123" });
    assertEquals(user.body, "Invalid password");
  });

  it("signIn function should return invalid user id id doesn't match", () => {
    const user = signIn(db, { id: 7, password: "dummy123" });
    assertEquals(user.body, "Invalid user id");
  });

  it("addTodo function should return todo_id and todo name after adding todo", () => {
    const response = addTodo(db, {
      user_id: 1,
      name: "dummyTodo",
      description: "aaa",
    });
    assertEquals(response.body, {
      "todo id": 1,
      name: "dummyTodo",
    });
    assertEquals(response.isError, false);
  });

  it("addTodo function should return todo_id and todo name after adding todo", () => {
    const response = addTodo(db, {
      user_id: 1,
      name: "dummyTodo",
      description: "aaa",
    });
    assertEquals(response.body, {
      "todo id": 2,
      name: "dummyTodo",
    });
    assertEquals(response.isError, false);
  });

  it("addTodo function should return not valid user if there is no todo against that user", () => {
    const response = addTodo(db, {
      user_id: 5,
      name: "dummyTodo",
      description: "aaa",
    });
    assertEquals(response.body, "5 is not a valid user id");
    assertEquals(response.isError, true);
  });

  it("getTodo function should take user id and return all the todos related to that user id", () => {
    const response = getTodos(db, { user_id: 1 });
    assertEquals(response.body, [
      {
        has_done: 0,
        name: "dummyTodo",
        description: "aaa",
        todo_id: 1,
        user_id: 1,
      },
      {
        has_done: 0,
        name: "dummyTodo",
        description: "aaa",
        todo_id: 2,
        user_id: 1,
      },
    ]);
  });

  it("getTodo function should take user_id and return user_id not found if user_id is not present", () => {
    const response = getTodos(db, { user_id: 5 });
    assertEquals(response, { isError: true, body: "No todos found" });
  });

  it("deleteTodo function should take user_id and todo_id as arguments and will delete that todo", () => {
    const response = deleteTodos(db, { user_id: 1, idsToDelete: [1, 2] });
    assertEquals(response.body, [
      {
        has_done: 0,
        name: "dummyTodo",
        description: "aaa",
        todo_id: 1,
        user_id: 1,
      },
      {
        has_done: 0,
        name: "dummyTodo",
        description: "aaa",
        todo_id: 2,
        user_id: 1,
      },
    ]);
  });

  it("deleteTodo function should take user_id and todo_id as input and will return isError true if anyone of both not found", () => {
    const response = deleteTodos(db, { user_id: 1, idsToDelete: [1] });
    assertEquals(response.isError, true);
    assertEquals(response.body, "Invalid user id or todo id");
  });
});
