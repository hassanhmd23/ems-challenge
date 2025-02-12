import { LocalFileStorage } from "@mjackson/file-storage/local";
import { v4 as uuidv4 } from "uuid";

export const profilePictureStorage = new LocalFileStorage(
  "./uploads/profile-pictures"
);

export function getStorageKey() {
  return uuidv4();
}
