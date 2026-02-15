export const addUser = async (details) => {
  const response = await fetch("http://localhost:8000/reg", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(details),
  });

  const jsonResponse = await response.json();
  return { body: jsonResponse, status: response.status };
};

export const login = async (details) => {
  const response = await fetch("http://localhost:8000/login", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(details),
  });

  if (response.status === 200) {
    return { body: await response.json(), status: response.status };
  }

  return { body: await response.text(), status: response.status };
};

export const addTodo = async (details) => {
  const response = await fetch("http://localhost:8000/todo/create", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(details),
  });

  if (response.status === 200) {
    return { body: await response.json(), status: response.status };
  }

  return { body: await response.text(), status: response.status };
};

export const getTodos = async (details) => {
  const response = await fetch("http://localhost:8000/todo/get", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(details),
  });

  if (response.status === 200) {
    return { body: await response.json(), status: response.status };
  }

  return { body: await response.text(), status: response.status };
};

export const deleteTodos = async (details) => {
  const response = await fetch("http://localhost:8000/todo/delete", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(details),
  });

  if (response.status === 200) {
    return { body: await response.json(), status: response.status };
  }

  return { body: await response.text(), status: response.status };
};
