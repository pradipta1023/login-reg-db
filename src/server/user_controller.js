export const handleSignUp = async (context) => {
  const { storageFns, storage } = context.get("storage-configs");
  const details = await context.req.parseBody();
  const id = storageFns.signUp(storage, details);

  return context.json({ id }, 201);
};

export const handleSignIn = async (context) => {
  const { storageFns, storage } = context.get("storage-configs");
  const details = await context.req.parseBody();
  const response = storageFns.signIn(storage, details);

  return response.isError
    ? context.text(response.body, 404)
    : context.json(response.body, 200);
};
