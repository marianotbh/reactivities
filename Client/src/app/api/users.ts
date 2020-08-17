import { GET, POST } from ".";
import { User, UserFormValue } from "../models/User";

export function getCurrentUser() {
  return GET<User>("/users");
}

export function login(body: UserFormValue) {
  return POST<User>("/users/login", body);
}

export function register(body: UserFormValue) {
  return POST<User>("/users/register", body);
}
