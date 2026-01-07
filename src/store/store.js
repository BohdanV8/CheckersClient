import { makeAutoObservable } from "mobx";
import AuthService from "../services/AuthService";
import axios from "axios";
import { API_URL } from "../http";

export default class Store {
  user = {};
  isAuth = false;
  isLoading = false;
  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool) {
    this.isAuth = bool;
  }

  setUser(user) {
    this.user = user;
  }

  setLoading(bool){
    this.isLoading = bool;
  }

  async login(email, password) {
    try {
      const response = await AuthService.login(email, password);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      console.log(e);
    }
  }

  async registration(
    email,
    password
  ) {
    try {
      const response = await AuthService.registration(
        email,
        password,
      );
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      console.log(e);
    }
  }

  async logout() {
    try {
      await AuthService.logout();
      this.setAuth(false);
      this.setUser({});
    } catch (e) {
      console.log(e);
    }
  }

  async checkAuth() {
    this.setLoading(true)
    try {
      const response = await axios.post(`${API_URL}/Auth/refresh`, {withCredentials: true})
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch(e) {
      console.log(e)
    }
    finally {
      this.setLoading(false)
    }
  }
}