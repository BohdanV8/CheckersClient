import $api from "../http";

export default class AuthService {
  static async login(email, password) {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    return $api.post("/Auth/login", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });
  }
  static async registration(email, password, bio) {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("bio", bio);
    return $api.post("/Auth/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true, // Додано для включення облікових даних
    });
  }
  static async logout() {
    return $api.post("/Auth/logout");
  }
}
