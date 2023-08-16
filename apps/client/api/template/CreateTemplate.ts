import { BACKEND_URL } from "../NetworkHelper";

const createContentType = async (
  name: string,
  handle: string,
  collectionHandle?: string
) => {
  const response = await fetch(`${BACKEND_URL}/template/createTemplate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: { title: name, handle: handle, collection: collectionHandle },
    }),
  });
  return await response.json();
};
