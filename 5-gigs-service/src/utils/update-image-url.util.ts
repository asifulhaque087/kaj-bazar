import { uploads } from "@fvoid/shared-lib";

export const updateImage = async (
  oldImage: string,
  newImage: string
): Promise<string> => {
  if (oldImage === newImage) return newImage;

  const uploadResult = await uploads(newImage);
  return uploadResult?.secure_url;
};
