export const handleSignUp = (details, { storage, storageFns }) => {
  const id = storageFns.signUp(storage, details);
  return new Response(JSON.stringify({ id }), {
    headers: {
      "content-type": "application/json",
    },
    status: 200,
  });
};

export const handleSignIn = (details, { storage, storageFns }) => {
  const user = storageFns.signIn(storage, details);
  if (!user) {
    return new Response("User not found", {
      headers: {
        "content-type": "text/plain",
      },
      status: 404,
    });
  }

  return new Response(JSON.stringify(user), {
    headers: {
      "content-type": "application/json",
    },
    status: 200,
  });
};
