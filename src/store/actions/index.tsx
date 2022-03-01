import { LOGIN, LOGOUT } from './types';

export const login = (
  userId: string,
  userName: string,
  profileImage: string
) => {
  return {
    type: LOGIN,
    data: {
      isLogged: true,
      userId,
      userName,
      profileImage,
    },
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};
