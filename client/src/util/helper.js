import { uploadPicture } from 'api/posts';

export const uploadImg = async (image) => {
  const formData = new FormData();
  formData.append('picture', image);
  formData.append('picturePath', image.name);

  const { picturePath } = await uploadPicture(formData);
  return 'http://localhost:5000/assets/' + picturePath;
};
