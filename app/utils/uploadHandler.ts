import type { FileUpload } from "@mjackson/form-data-parser";
import { getStorageKey, profilePictureStorage } from "./storage.server";

export const uploadHandler = async (fileUpload: FileUpload) => {
  if (
    fileUpload.fieldName === "profile_picture" &&
    fileUpload.type.startsWith("image/")
  ) {
    let storageKey = getStorageKey();
    await profilePictureStorage.set(storageKey, fileUpload);
    return storageKey;
  }
};
