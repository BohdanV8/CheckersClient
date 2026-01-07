import $api from "../http";

export default class AuthService {
  static async login(email, password) {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    return $api.post("/Auth/login", {email, password}, {
      withCredentials: true,
    });
  }
  static async registration(email, password) {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    return $api.post("/Auth/register", {email, password}, {
      withCredentials: true, // Додано для включення облікових даних
    });
  }
  static async logout() {
    return $api.post("/Auth/logout");
  }
}
