export type User = {
  userName: string;
  displayName: string;
  token: string;
  image?: string;
};

export type UserFormValue = {
  email: string;
  password: string;
  displayName?: string;
  userName?: string;
};
