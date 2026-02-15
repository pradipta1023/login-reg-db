export const handleAddTodo = (todoDetails, { storage, storageFns }) => {
  const response = storageFns.addTodo(storage, todoDetails);
  if (response.isError) {
    return new Response(response.body, {
      headers: {
        "content-type": "text/plain",
      },
      status: 404,
    });
  }

  return new Response(JSON.stringify(response.body), {
    headers: {
      "content-type": "application/json",
    },
    status: 200,
  });
};

export const handleGetTodos = (todoDetails, { storage, storageFns }) => {
  const response = storageFns.getTodos(storage, todoDetails);
  if (response.isError) {
    return new Response(response.body, {
      headers: {
        "content-type": "text/plain",
      },
      status: 404,
    });
  }

  return new Response(JSON.stringify(response.body), {
    headers: {
      "content-type": "application/json",
    },
    status: 200,
  });
};

export const handleDeleteTodos = (todoDetails, { storage, storageFns }) => {
  const response = storageFns.deleteTodos(storage, todoDetails);
  if (response.isError) {
    return new Response(response.body, {
      headers: {
        "content-type": "text/plain",
      },
      status: 404,
    });
  }

  return new Response(JSON.stringify(response.body), {
    headers: {
      "content-type": "application/json",
    },
    status: 200,
  });
};
