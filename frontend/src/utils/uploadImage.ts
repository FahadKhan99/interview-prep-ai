import { API_PATHS } from "./apiPaths";
import api from "./axiosInstance";

export const uploadImage = async (imageFile: File) => {
  const formData = new FormData();

  // Append image to formdata
  formData.append("image", imageFile);

  try {
    const res = await api.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    console.log("Error uploading image: ", error);
    throw error;
  }
};
