import { handleSignIn, handleSignUp } from "./userController.js";

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

  return new Response("Not Found", {
    headers: { "content-type": "text/plain" },
    status: 404,
  });
};
