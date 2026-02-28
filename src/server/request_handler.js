import {
  handleAddTodo,
  handleDeleteTodos,
  handleGetTodos,
} from "./todo_controller.js";
import { handleSignIn, handleSignUp } from "./user_controller.js";
import { Hono } from "hono";
import { logger } from "hono/logger";

export const createApp = (storageConfigs) => {
  const app = new Hono();
  app.use((context, next) => {
    context.set("storage-configs", storageConfigs);
    return next();
  });
  app.use(logger());
  app.post("user/reg", handleSignUp);
  app.post("user/login", handleSignIn);
  app.post("/todo/create", handleAddTodo);
  app.post("/todo/get", handleGetTodos);
  app.post("/todo/delete", handleDeleteTodos);
  return app;
};

export const handleUser = async (request, { storage, storageFns }) => {
  const path = new URL(request.url).pathname;
  console.log({ method: request.method, path });

  if (path === "/todo/create" && request.method === "POST") {
    const todoDetails = await request.json();
    return handleAddTodo(todoDetails, { storage, storageFns });
  }

  if (path === "/todo/get" && request.method === "POST") {
    const todoDetails = await request.json();
    return handleGetTodos(todoDetails, { storage, storageFns });
  }

  if (path === "/todo/delete" && request.method === "POST") {
    const todoIds = await request.json();
    return handleDeleteTodos(todoIds, { storage, storageFns });
  }

  return new Response("Not Found", {
    headers: { "content-type": "text/plain" },
    status: 404,
  });
};
