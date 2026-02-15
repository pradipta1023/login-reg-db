import { detailsForSignIn, detailsForSignUp } from "../UI/user_ui.js";
import {
  addTodo,
  addUser,
  deleteTodos,
  getTodos,
  login,
} from "../../client/request.js";
import { checkbox, input, select } from "@inquirer/prompts";
import { deepEqual } from "node:assert";

export const userSignUp = async () => {
  const userDetails = await detailsForSignUp();
  const response = await addUser(userDetails);
  console.log(response.body);
};

const userSignIn = async () => {
  const userDetails = await detailsForSignIn();
  const response = await login(userDetails);
  return response;
};

const getTodoDetails = async () => {
  const name = await input({ message: "Enter todo name: ", required: true });
  const description = await input({
    message: "Enter description",
    required: true,
  });
  return { name, description };
};

const addNewTodo = async (user_id) => {
  const todoDetails = await getTodoDetails();
  todoDetails.user_id = user_id;
  const response = await addTodo(todoDetails);
  return response;
};

const getAllTodos = async (user_id) => {
  const response = await getTodos({ user_id });
  return response;
};

const deleteTodoChoices = async (user_id) => {
  const response = await getAllTodos(user_id);

  if (typeof response.body !== "object") return [];

  const choices = response.body.map((todo) => ({
    name: todo.name,
    value: todo.todo_id,
  }));

  choices.push({ name: "Back", value: -1 });
  return choices;
};

const deleteTodosWithIds = async (idsToDelete, user_id) => {
  if (idsToDelete[0] === -1) return `Returning to previous menu`;
  const response = await deleteTodos({ idsToDelete, user_id });
  return response;
};

const deleteExistingTodos = async (user_id) => {
  const deleteChoices = await deleteTodoChoices(user_id);

  if (deleteChoices.length === 0) return `No todos to delete`;

  const deletingIds = await checkbox({
    message: "Select todos to delete",
    choices: deleteChoices,
    required: true,
    pageSize: deleteChoices.length,
  });

  if (deletingIds.includes(-1) && deletingIds.length !== 1) {
    return `Can't select back and todo at the same time`;
  }

  return await deleteTodosWithIds(deletingIds, user_id);
};

const handleTodoRequests = async ({ user_id }) => {
  let toRun = true;
  while (toRun) {
    const command = await select({
      message: "Select your operation",
      choices: [
        {
          name: "Add todo",
          value: addNewTodo,
          description: "Add a new todo",
        },
        {
          name: "Get todos",
          value: getAllTodos,
          description: "Get all available todos",
        },
        {
          name: "Delete todo",
          value: deleteExistingTodos,
          description: "Delete existing todos",
        },
        {
          name: "Back",
          value: () => toRun = false && "Returning to previous menu",
          description: "Back to previous menu",
        },
      ],
    });
    console.log(await command(user_id));
  }
};

export const existingAccount = async () => {
  const response = await userSignIn();

  if (response.status === 200) {
    await handleTodoRequests(response.body);
  }
};
