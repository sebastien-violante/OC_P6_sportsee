import { userMock } from "../mock/user";

export const getUser = async() => {
    return new Promise((resolve) => {
    setTimeout(() => {
      resolve(userMock)
    }, 500)
  });
}