import { profilePictureStorage } from "~/utils/storage.server";
import type { Route } from "./+types/route";

export async function loader({ params }: Route.LoaderArgs) {
  const storageKey = params.storageKey;
  const file = await profilePictureStorage.get(storageKey);

  if (!file) {
    throw new Response("User avatar not found", {
      status: 404,
    });
  }

  return new Response(file.stream(), {
    headers: {
      "Content-Type": file.type,
      "Content-Disposition": `attachment; filename=${file.name}`,
    },
  });
}
