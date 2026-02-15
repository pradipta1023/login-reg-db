import {
  handleAddTodo,
  handleDeleteTodos,
  handleGetTodos,
} from "./todo_controller.js";
import { handleSignIn, handleSignUp } from "./user_controller.js";

export const handleUser = async (request, { storage, storageFns }) => {
  const path = new URL(request.url).pathname;
  console.log({ method: request.method, path });

  if (path === "/reg" && request.method === "POST") {
    const userDetails = await request.json();
    return await handleSignUp(userDetails, { storage, storageFns });
  }

  if (path === "/login" && request.method === "POST") {
    const userDetails = await request.json();
    return await handleSignIn(userDetails, { storage, storageFns });
  }

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
