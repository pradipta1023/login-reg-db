export const handleAddTodo = async (context) => {
  const { storage, storageFns } = context.get("storage-configs");
  const todoDetails = await context.req.parseBody();
  const response = storageFns.addTodo(storage, todoDetails);

  return response.isError
    ? context.text(response.body, 404)
    : context.json(response.body, 200);
};

export const handleGetTodos = async (context) => {
  const { storage, storageFns } = context.get("storage-configs");
  const user = await context.req.parseBody();
  const response = storageFns.getTodos(storage, user);

  return response.isError
    ? context.text(response.body, 400)
    : context.json(response.body, 200);
};

export const handleDeleteTodos = async (context) => {
  const { storage, storageFns } = context.get("storage-configs");
  const todo = await context.req.json();
  console.log({ todo });
  const response = storageFns.deleteTodos(storage, todo);

  return response.isError
    ? context.text(response.body, 400)
    : context.json(response.body, 200);
};
