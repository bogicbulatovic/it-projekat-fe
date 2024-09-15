import { fetchClient } from "./fetchClient";

const fetchRegister = async ({
  email,
  name,
  role,
  raw_password,
  imageFile,
}) => {
  let profile_img = "";
  if (imageFile) {
    const formData = new FormData();

    formData.append("profile_img", imageFile);

    const data = await fetchClient("/upload-profile-img", {
      method: "POST",
      body: formData,
    });

    profile_img = data.filePath;
  }

  const data = await fetchClient("/register", {
    method: "POST",
    body: JSON.stringify({ email, name, role, raw_password, profile_img }),
    contentType: "application/json",
  });

  return data;
};

export { fetchRegister };
